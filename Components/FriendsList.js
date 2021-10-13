import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  Button,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { _createTask } from '../store/task';
import { firebase } from '../config/firebase';

const AddTask = (props) => {
  const [text, onChangeText] = useState('');
  const [friends, friendsList] = useState();
  const user = useSelector((state) => state.user);

  const onChangeSearch = async () => {
    friendsList([]);
    const lowerText = text.toLowerCase();
    const query = await firebase
      .firestore()
      .collection('users')
      .where('email', '==', lowerText)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          friendsList(doc.data());
        });
      });
  };

  const addToFriends = async () => {
    console.log('add');
    await firebase
      .firestore()
      .collection('users')
      .doc(user.id)
      .update({ friends: firebase.firestore.FieldValue.arrayUnion(friends) });
  };
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          margin: 20,
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
        }}
      >
        <Image source={require('../public/nudgie.png')} style={styles.nudgie} />
        <View style={{ marginBottom: 30 }}>
          <Text style={styles.title}>Add Friend</Text>
          <TextInput
            style={styles.itemName}
            onChangeText={(value) => {
              friendsList('');
              onChangeText(value);
            }}
            value={text}
            placeholder="enter your friend's email"
          />
        </View>
        {friends ? (
          <TouchableOpacity onPress={addToFriends}>
            <Text>{friends.fullName}</Text>
          </TouchableOpacity>
        ) : (
          <View />
        )}
      </View>
      <Button title="search" onPress={onChangeSearch}>
        <Text>Search</Text>
      </Button>
    </SafeAreaView>
  );
};
export default AddTask;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemName: {
    fontSize: 20,
    borderWidth: 1,
    textAlign: 'center',
    borderColor: 'transparent',
    borderRadius: 4,
    margin: 5,
    padding: 10,
    width: 250,
    backgroundColor: '#EBF6EF',
    shadowColor: '#000000',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    shadowOffset: {
      height: 3,
      width: 3,
    },
  },
  selected: {
    backgroundColor: '#83CA9E',
    borderWidth: 1,
    borderColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    height: 90,
    width: 80,
    margin: 5,
    shadowColor: '#000000',
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 2,
    },
  },
  notSelected: {
    backgroundColor: '#EBF6EF',
    color: 'gray',
    borderWidth: 1,
    borderColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    height: 90,
    width: 80,
    margin: 5,
    shadowColor: '#000000',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 2,
    },
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
  selectedText: {
    color: 'black',
    fontWeight: 'bold',
  },
  notSelectedText: {
    color: 'gray',
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
  storeIcon: {
    width: 50,
    height: 50,
    backgroundColor: 'transparent',
    marginBottom: 5,
  },
  notSelectedPriority: {
    backgroundColor: '#EBF6EF',
    color: 'gray',
    borderWidth: 1,
    borderColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    height: 30,
    width: 100,
    margin: 5,
    shadowColor: '#000000',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 2,
    },
  },
});
