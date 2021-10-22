import React, { useState, useEffect } from 'react';
import { GOOGLE_PLACES_API } from '@env';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
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
import {
  _deleteFriend,
  _fetchSingleFriendInfo,
  _fetchUserFriends,
} from '../store/user';

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

  // _______SEND NOTIFICATION _______
  async function sendPushNotification(members, from) {
    if (!search.trim()) {
      alert('Please specify a location!');
      return;
    }

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
      <View style={{ display: 'flex' }}>
        <GooglePlacesAutocomplete
          placeholder="Search"
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            setSearch(data.description);
          }}
          onFail={(error) => console.error(error)}
          query={{
            key: GOOGLE_PLACES_API,
            language: 'en',
          }}
          styles={autoComplete}
        ></GooglePlacesAutocomplete>
      </View>
      <View
        style={{
          marginLeft: 'auto',
          height: 45,
          width: '20%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'flex-end',
        }}
      >
        <Icon
          style={{ margin: 5 }}
          color="black"
          type="ionicon"
          name="notifications-outline"
          size={20}
          onPress={async () => {
            await sendPushNotification(selectedGroup.members, user.fullName);
          }}
        />
      </View>
      <View style={styles.body}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate('Add Group Task')}
            style={styles.deleteButton}
          >
            <Text style={{ fontWeight: 'bold', color: 'black' }}>
              {' '}
              + Add a Task
            </Text>
          </TouchableOpacity>
        </View>

        {tasks.length < 1 ? (
          <View
            style={{ display: 'flex', flexDirection: 'column', marginTop: 75 }}
          >
            <Image
              style={styles.nudgie}
              source={require('../public/nudgie2.png')}
            />
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                margin: 5,
                textAlign: 'center',
              }}
            >
              Add a task to get started!
            </Text>
          </View>
        ) : tasks[0].id ? (
          <FlatList
            data={tasks}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Swipeable
                renderRightActions={RightSwipeActions}
                onSwipeableRightOpen={() => deleteTask(item.id)}
              >
                <View style={styles.box}>
                  <View style={styles.info}>
                    <Text style={styles.item}>{item.name}</Text>
                  </View>
                  <Text style={styles.addedBy}>added by {item.userName}</Text>
                </View>
              </Swipeable>
            )}
          ></FlatList>
        ) : (
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              margin: 5,
            }}
          >
            Loading...
          </Text>
        )}
      </View>
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
    height: 100,
    width: 100,
    borderRadius: 24,
    alignSelf: 'center',
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    margin: 5,
  },
  body: {
    padding: 10,
    zIndex: -1,
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
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
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
    margin: 10,
    marginTop: 0,
  },
  info: {
    padding: 5,
    fontSize: 18,
  },
  item: {
    padding: 10,
    fontSize: 18,
    textAlign: 'left',
  },
  addedBy: {
    padding: 5,
    fontSize: 12,
    textAlign: 'left',
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
});

const autoComplete = StyleSheet.create({
  textInputContainer: {
    backgroundColor: 'rgba(0,0,0,0)',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    zIndex: 999,
    width: '80%',
    margin: 5,
  },
  textInput: {
    marginLeft: 0,
    marginRight: 0,
    height: 45,
    color: '#5d5d5d',
    fontSize: 16,
    borderBottomWidth: 2,
    borderColor: 'green',
    borderBottomColor: '#F59DBF',
    zIndex: 999,
  },
  predefinedPlacesDescription: {
    color: '#1faadb',
  },
  listView: {
    top: 45.5,
    zIndex: 10,
    position: 'absolute',
    color: 'black',
    backgroundColor: 'white',
    width: '89%',
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'blue',
  },
  description: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    fontSize: 14,
    maxWidth: '89%',
  },
});
