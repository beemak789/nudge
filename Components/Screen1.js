import {
  StyleSheet,
  Text,
  SafeAreaView,
  Button,
  TouchableOpacity,
} from 'react-native';
import { firebase } from '../config/firebase';
import React, { useState, useEffect } from 'react';
import { createTask } from '../queries/tasks';

async function sendPushNotification(expoPushToken) {
  console.log('in send push', expoPushToken);
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Nudge for Toothpaste',
    body: 'You are close to a Target, do you still need toothpaste?',
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

const Screen1 = (props) => {
  const _createTask = () => {
    try {
      console.log('crerate task called');
      const data = {
        name: 'TACOS',
        priority: 'HIGH',
        category: 'GROCERIES',
      };
      console.log('this is data', data);

      firebase
        .firestore()
        .collection('tasks')
        .doc(firebase.auth().currentUser.uid)
        .collection('userTasks')
        .doc()
        .set(data);
      console.log('end of create Task');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>This is Screen 1</Text>
      <Button
        title="Press to Send Notification"
        onPress={async () => {
          await sendPushNotification(
            'ExponentPushToken[HUGDheOPfKBBF_iDUs2ETG]'
          );
          console.log('sent');
        }}
      />

      <TouchableOpacity onPress={_createTask}>
        <Text>Create Task</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Screen1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
