import {
  StyleSheet,
  FlatList,
  SafeAreaView,
  Text,
  Button,
  View,
  TouchableOpacity,
  View,
  Image,
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
  const { coords } = useSelector((state) => state.location);
  console.log('cooooords,', coords);

  useEffect(() => {
    dispatch(_fetchAllTasks());
  }, [dispatch]);


  if (!tasks.length) {
    return (
      <View>
        <Text>You do not have any tasks...</Text>
      </View>
    );
  }

  const priorityStyle = (priority) => {
    let color;
    if (priority === 'high') {
      color = '#bb3e03';
    } else if (priority === 'medium') {
      color = '#f4a261';
    } else {
      color = '#8FC0A9';
    }

    return {
      marginLeft: 'auto',
      marginBottom: 'auto',
      backgroundColor: color,
      width: 25,
      height: 25,
      borderRadius: 4,
      shadowColor: 'black',
      shadowOpacity: 0.1,
    };
  };


  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          dispatch(_fetchPlaces());
        }}
      >
        <Image
          style={styles.nudgie}
          source={require('../public/nudgie2.png')}
        />
        <Text style={styles.buttonText}>Complete a Task!</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          props.navigation.navigate('Places List');
        }}
      >
        <Text style={styles.buttonText}>Click me!</Text>
      </TouchableOpacity>
      <View style={styles.body}>
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.box}>
              <Image
                style={styles.image}
                source={require('../public/nudgie2.png')}
              />
              <View style={styles.info}>
                <Text style={styles.item}>{item.name}</Text>
              </View>
              <View style={priorityStyle(item.priority)}></View>
              <Button
              style={styles.completedButton}
              title="Completed"
              onPress={() => {
                dispatch(_updateCompleteStatus(item));
              }}
            ></Button>
            </View>
          )}
        ></FlatList>
      </View>

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
  body: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    margin: 15,
    backgroundColor: '#FAF3DD',
  },
  box: {
    display: 'flex',
    width: '95%',
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
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginLeft: 15,
    padding: 5,
  },
  item: {
    padding: 10,
    fontSize: 18,
    alignSelf: 'center',
    textAlign: 'center',
  },
  priority: {
    marginLeft: 'auto',
    marginBottom: 'auto',
    backgroundColor: 'red',
    width: 25,
    height: 25,
    borderRadius: 4,
    shadowColor: 'black',
    shadowOpacity: 0.1,
  },
  button: {
    backgroundColor: '#EBF6EF',
    padding: 5,
    borderRadius: 25,
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: '#FFFFFF',
    margin: 5,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 1,
      width: -2,
    },
    elevation: 2,
  },
  buttonText: {
    color: '#4a7c59',
    fontWeight: '700',
    fontSize: 22,
  },
  nudgie: {
    width: 50,
    height: 50,
    backgroundColor: 'transparent',
    margin: 5,
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
