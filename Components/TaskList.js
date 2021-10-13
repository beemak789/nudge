import {
  StyleSheet,
  FlatList,
  SafeAreaView,
  Text,
  ListViewBase,
  Button,
  View,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import {
  _createTask,
  _fetchAllTasks,
  _updateCompleteStatus,
} from '../store/task';
import { _fetchPlaces } from '../store/places';
import { useDispatch, useSelector } from 'react-redux';

const taskList = (props) => {
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.task);
  const { location } = useSelector((state) => state.location);

  useEffect(() => {
    dispatch(_fetchAllTasks());
  }, [dispatch]);

  if (!tasks.length) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Button
        onPress={() => {
          dispatch(_fetchPlaces());
        }}
        title="places url"
      />

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View key={item.name}>
            <Text style={styles.item}>
              {item.name}, {item.priority} PRIORITY
            </Text>
            <Button
              style={styles.completedButton}
              title="Completed"
              onPress={() => {
                dispatch(_updateCompleteStatus(item));
              }}
            ></Button>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default taskList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: 20,
  },
  completedButton: {
    marginRight: 10,
    borderColor: '#2e64e5',
    borderWidth: 2,
    borderRadius: 3,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginHorizontal: 5,
  },
  item: {
    fontSize: 20,
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
