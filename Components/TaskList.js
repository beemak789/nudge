import {
  StyleSheet,
  FlatList,
  SafeAreaView,
  Text,
  ListViewBase,
} from 'react-native';
import { firebase } from '../config/firebase';
import React, { useState, useEffect } from 'react';
import { _createTask, _fetchAllTasks } from '../store/task';
import { useDispatch, useSelector } from 'react-redux';

const taskList = (props) => {
  const dispatch = useDispatch()
  const { tasks } = useSelector(state => state.task)

  useEffect(() => {
         dispatch(_fetchAllTasks())
      }, [dispatch])

  return (
    <SafeAreaView style={styles.container}>

      <FlatList data = {tasks} renderItem = {({item}) =>
      <Text
        style={styles.item}>{item.name}, {item.priority} PRIORITY
      </Text>}>
      </FlatList>

    </SafeAreaView>
  );
};

export default taskList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

//PUT NOTIFICATION STUFF DOWN HERE SINCE WE'LL WANT TO USE IN ANOTHER SCREEN

//_______SEND NOTIFICATION ________
//async function sendPushNotification(expoPushToken) {
//   const message = {
//     to: expoPushToken,
//     sound: 'default',
//     title: 'Nudge for Toothpaste',
//     body: 'You are close to a Target, do you still need toothpaste?',
//     data: { someData: 'goes here' },
//   };

//   await fetch('https://exp.host/--/api/v2/push/send', {
//     method: 'POST',
//     headers: {
//       Accept: 'application/json',
//       'Accept-encoding': 'gzip, deflate',
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(message),
//   });
// }

//_______BUTTON ________
// <Button
// title="Press to Send Notification"
// onPress={async () => {
//   await sendPushNotification(
//     'ExponentPushToken[HUGDheOPfKBBF_iDUs2ETG]'
//   );
//   console.log('sent');
// }}
// />
