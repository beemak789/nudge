import React, { useState, useEffect} from 'react';

import {
  StyleSheet,
  Text,
  SafeAreaView,
  Button,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  FlatList
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { _createTask } from '../store/task';
import { firebase } from '../config/firebase';
import { Icon } from 'react-native-elements'
import { _deleteFriend, _fetchSingleFriendInfo, _fetchUserFriends } from '../store/user';

// _______SEND NOTIFICATION ________
async function sendPushNotification(toExpoToken, from) {
  if(toExpoToken){
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


const FriendsList = (props) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch( _fetchUserFriends(user.id))
  }, [dispatch])

  return (
    <SafeAreaView style={styles.container}>
      <View style = {{alignItems: "flex-end", marginRight: 20, marginTop: 20}}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            props.navigation.navigate("Add Friend");
          }}
        >
        <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
      <View style= {{margin: 20,
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1}}>
      <Image source={require('../public/nudgie2.png')} style={styles.nudgie} />
      <Text style={styles.title}>Your Nudgies</Text>
      {(user.friends.length < 1) ? <Text>No friends</Text>:
        (user.friends[0].id) ? (
        <FlatList
          data={user.friends}
          keyExtractor={(item) => item.id}
          renderItem= {( { item } ) => (
            <View style={styles.box}>

              <TouchableOpacity
                onPress={async () => {
                  await sendPushNotification(item.token, user.fullName)
                }}>
              <Icon style={{marginLeft: 5}}color="black" type="ionicon" name="notifications-outline" size={20} />
              </TouchableOpacity>
              <Text style={styles.item}>{item.fullName}</Text>
              <TouchableOpacity
                onPress={() => {
                  dispatch(_deleteFriend(user.id, item.id))}
                }>
                <Icon style={{marginRight: 5}}color="black" type="ionicon" name="trash-outline" size={22} />
              </TouchableOpacity>
            </View>
          )}>
          </FlatList>) : (<Text>Loading...</Text>)
      }
      </View>
    </SafeAreaView>
  );
};
export default FriendsList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    // alignItems: 'center',
    // justifyContent: 'center',
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
    borderColor: "transparent",
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
    justifyContent: "space-between",
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



