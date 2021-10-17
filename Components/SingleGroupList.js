import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  Button,
  View,
  FlatList,
  TouchableOpacity
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/core';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGroupTasks, _createTask } from '../store/task';
import { firebase } from '../config/firebase';
import {
  _deleteFriend,
  _fetchSingleFriendInfo,
  _fetchUserFriends,
} from '../store/user';
import { deleteGroup } from '../store/group';
import { deleteUserGroup } from '../store/user'

// _______SEND NOTIFICATION ________
async function sendPushNotification(toExpoToken, from) {
  if (toExpoToken) {
    const message = {
      to: toExpoToken,
      sound: 'default',
      title: `Nudge from ${from}`,
      body: `${from} is at the grocery store! Do you need anything?`,
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
}

const SingleGroupList = (props) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const selectedGroup = useSelector((state) => state.groups.selectedGroup);
  const tasks = useSelector((state) => state.task.selectedGroupTasks);
  const navigation = useNavigation()

  useEffect(() => {
    dispatch(fetchGroupTasks(selectedGroup.id));
  }, [dispatch]);

  const _deleteGroup = async () => {
    await dispatch(deleteUserGroup(selectedGroup.id))
    await dispatch(deleteGroup(selectedGroup.id, selectedGroup.group.members))
    navigation.navigate('Group List')

  }

  // _______SEND NOTIFICATION _______
  async function sendPushNotification(members, from) {
    console.log("MEMBERS", members);
    members.forEach(async (member) => {
      const message = {
        to: member.token,
        sound: 'default',
        title: `Nudge from ${from}`,
        body: `${from} is at the grocery store! Do you need anything?`,
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
    });
  }
  return (
    <SafeAreaView style={styles.container}>
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

      <Button
        style={styles.completedButton}
        title="Alert"
        onPress={async () => {
          await sendPushNotification(selectedGroup.group.members, user.fullName);
          console.log('pressed sent');
        }}
      ></Button>
      <View>
        <Text style={styles.title}>{selectedGroup.group.name} Tasks</Text>
        {tasks.length < 1 ? (
          <Text>No tasks yet, add one!</Text>
        ) : tasks[0].id ? (
          <FlatList
            data={tasks}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.box}>
                <Text style={styles.item}>{item.name}</Text>
              </View>
            )}
          ></FlatList>
        ) : (
          <Text>Loading...</Text>
        )}
      </View>
      <TouchableOpacity
                onPress={() => {_deleteGroup()
                  console.log('USER', user)
                  console.log('selected group', selectedGroup)
                }}>
              <Icon style={{marginRight: 5}}color="black" type="ionicon" name="trash-outline" size={22} />
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
  item: {
    padding: 10,
    fontSize: 18,
    alignSelf: 'center',
    textAlign: 'center',
  },
});
