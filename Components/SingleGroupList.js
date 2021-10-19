import React, { useState, useEffect } from 'react';
import { GOOGLE_PLACES_API } from '@env';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  Button,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/core';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchGroupTasks,
  _createTask,
  _deleteGroupTask,
  _updateGroupCompleteStatus,
} from '../store/task';
import { _fetchGroupMembers } from '../store/group';
import { firebase } from '../config/firebase';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { LeftSwipeActions, RightSwipeActions } from '../services/Swipeable';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { priorityStyle } from '../services/PriorityStyle';
import {
  _deleteFriend,
  _fetchSingleFriendInfo,
  _fetchUserFriends,
} from '../store/user';
import { deleteGroup } from '../store/group';
import { deleteUserGroup } from '../store/user';

// // _______SEND NOTIFICATION ________
// async function sendPushNotification(toExpoToken, from) {
//   if (toExpoToken) {
//     const message = {
//       to: toExpoToken,
//       sound: 'default',
//       title: `Nudge from ${from}`,
//       body: `${from} is at the grocery store! Do you need anything?`,
//       data: { someData: 'goes here' },
//     };

//     await fetch('https://exp.host/--/api/v2/push/send', {
//       method: 'POST',
//       headers: {
//         Accept: 'application/json',
//         'Accept-encoding': 'gzip, deflate',
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(message),
//     });
//   }
// }

const SingleGroupList = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const user = useSelector((state) => state.user);
  const selectedGroup = useSelector((state) => state.groups.selectedGroup);
  const tasks = useSelector((state) => state.task.selectedGroupTasks);
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(fetchGroupTasks(selectedGroup.id));
  }, [dispatch]);

  useEffect(() => {
    dispatch(_fetchGroupMembers(selectedGroup.group.members));
  }, [dispatch]);

  const _deleteGroup = async () => {
    await dispatch(deleteUserGroup(selectedGroup.id));
    await dispatch(deleteGroup(selectedGroup.id, selectedGroup.group.members));
    navigation.navigate('Group List');
  };

  // _______SEND NOTIFICATION _______
  async function sendPushNotification(members, from) {
    members.forEach(async (member) => {
      //get token from id function
      if (member.allowNotifications === true) {
        const message = {
          to: member.token,
          sound: 'default',
          title: `Nudge from ${from}`,
          body: `${from} is at ${search}! Do you need anything?`,
          data: { someData: 'goes here' },
        };

        await fetch('https://exp.host/--/api/v2/push/send', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(message),
        });
      }
    });
  }

  const updateCompleteStatus = (item) => {
    dispatch(_updateGroupCompleteStatus(item, selectedGroup.id));
  };
  const deleteTask = (itemId) => {
    dispatch(_deleteGroupTask(itemId, selectedGroup.id));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.search}>
        <Icon
          style={{ marginLeft: 5, marginRight: 50 }}
          color="black"
          type="ionicon"
          name="notifications-outline"
          size={20}
          onPress={async () => {
            await sendPushNotification(selectedGroup.members, user.fullName);
          }}
        />
        <GooglePlacesAutocomplete
          placeholder="Search"
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            console.log(data, details);
            setSearch(data.description);
          }}
          onFail={(error) => console.error(error)}
          query={{
            key: GOOGLE_PLACES_API,
            language: 'en',
          }}
        />
        <View style={{ marginLeft: 'auto', padding: 5 }}>
          <AntDesign.Button
            name="pluscircle"
            size={30}
            color="#83CA9E"
            backgroundColor="transparent"
            onPress={() => {
              navigation.navigate('Add Group Task');
            }}
          />
        </View>
      </View>

      <View style={styles.body}>
        <Text style={styles.title}>{selectedGroup.group.name} Tasks</Text>
        {!tasks ? (
          <Text>No tasks yet, add one!</Text>
        ) : tasks[0].id ? (
          <FlatList
            data={tasks}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Swipeable
                renderLeftActions={LeftSwipeActions}
                renderRightActions={RightSwipeActions}
                onSwipeableRightOpen={() => deleteTask(item.id)}
                onSwipeableLeftOpen={() => updateCompleteStatus(item)}
              >
                <View style={styles.box}>
                  <View style={styles.info}>
                    <Text style={styles.item}>{item.name}</Text>
                    <Text style={styles.addedBy}>added by {item.userName}</Text>
                  </View>
                  <View style={priorityStyle(item.priority)}></View>
                </View>
              </Swipeable>
            )}
          ></FlatList>
        ) : (
          <Text>Loading...</Text>
        )}
      </View>
      <TouchableOpacity
        onPress={() => {
          _deleteGroup();
        }}
      >
        <View style={styles.deleteButton}>
          <Icon
            style={{ marginRight: 5 }}
            color="black"
            type="ionicon"
            name="trash-outline"
            size={22}
          />
          <Text style={styles.deleteText}>Delete Group</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
export default SingleGroupList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  search: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 3,
  },
  nudgie: {
    height: 150,
    width: 150,
    borderRadius: 24,
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    margin: 5,
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
    zIndex: 2,
  },
  save: {
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 45,
    borderRadius: 20,
    borderColor: 'transparent',
    borderWidth: 1,
    elevation: 3,
    backgroundColor: '#83CA9E',
    shadowColor: '#000000',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 2,
    },
    marginTop: 10,
  },
  button: {
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderColor: 'transparent',
    borderWidth: 1,
    elevation: 3,
    backgroundColor: '#83CA9E',
    shadowColor: '#000000',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 2,
    },
    marginTop: 10,
  },
  box: {
    display: 'flex',
    justifyContent: 'space-between',
    width: 325,
    margin: 10,
    borderRadius: 10,
    backgroundColor: '#EBF6EF',
    flexDirection: 'row',
    shadowColor: 'black',
    alignItems: 'center',
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 1,
      width: -2,
    },
    elevation: 2,
  },
  info: {
    padding: 5,
    fontSize: 18,
  },
  item: {
    padding: 5,
    fontSize: 18,
    // alignSelf: 'center',
    textAlign: 'left',
  },
  addedBy: {
    padding: 5,
    fontSize: 12,
    // alignSelf: 'flex-end',
    textAlign: 'left'
  },
  deleteButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 20,
    borderColor: 'transparent',
    borderWidth: 1,
    elevation: 3,
    backgroundColor: '#83CA9E',
    shadowColor: '#000000',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 2,
    },
    margin: 10,
  },
  deleteText: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
