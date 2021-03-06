import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { _createTask } from '../store/task';
import { firebase } from '../config/firebase';
import { Icon } from 'react-native-elements';
import { _addPendingFriend } from '../store/user';
import { DismissKeyboard } from '../services/dismissKeyboard';

const AddFriend = (props) => {
  const [text, onChangeText] = useState('');
  const [friends, friendsList] = useState();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const numFriends = user.friends.length || 0;

  const onChangeSearch = async () => {
    friendsList();
    const lowerText = text.toLowerCase();
    const query = await firebase
      .firestore()
      .collection('users')
      .where('email', '==', lowerText)
      .get()
      .then((snapshot) => {
        if (snapshot.doc === undefined) {
          friendsList({ error: 'No one by this email' });
        }
        snapshot.forEach((doc) => {
          friendsList(doc.data());
        });
      });
  };

  const sendFriendRequest = async () => {
    for (let i = 0; i < numFriends; i++) {
      if (user.friends[i].id === friends.id) {
        friendsList({ error: 'This person is already your friend' });
        return;
      }
      if (user.friendRequests[i] === friends.id) {
        friendsList({
          error: 'You have a friend request out to this person already',
        });
        return;
      }
    }
    dispatch(_addPendingFriend(user.id, friends.id));
    friendsList();
    onChangeText('');
  };
  return (
    <DismissKeyboard>
      <SafeAreaView style={styles.container}>
        <View style={{ alignItems: 'flex-start', marginLeft: 20, marginTop: 20 }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              props.navigation.navigate('Friends List');
            }}
          >
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
        </View>
        <View style={{ margin: 20, alignItems: 'center', flex: 1 }}>
          <Image
            source={require('../public/nudgie2.png')}
            style={styles.nudgie}
          />
          <View style={{ marginBottom: 30 }}>
            <Text style={styles.title}>Add Friend</Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <TextInput
                style={styles.email}
                onChangeText={(value) => {
                  friendsList('');
                  onChangeText(value);
                }}
                value={text}
                placeholder="search by email"
              />
              <TouchableOpacity onPress={onChangeSearch} style={styles.search}>
                <Icon
                  color="black"
                  type="ionicon"
                  name="search-outline"
                  size={20}
                />
              </TouchableOpacity>
            </View>
          </View>
          {friends ? (
            !friends.error ? (
              <TouchableOpacity onPress={sendFriendRequest}>
                <View style={styles.box}>
                  <Text style={styles.item}>{friends.fullName}</Text>
                  <Icon
                    style={{ marginRight: 10 }}
                    color="black"
                    type="ionicon"
                    name="person-add-outline"
                    size={20}
                  />
                </View>
              </TouchableOpacity>
            ) : (
              <Text>{friends.error}</Text>
            )
          ) : (
            <View />
          )}
        </View>
      </SafeAreaView>
    </DismissKeyboard>
  );
};
export default AddFriend;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    margin: 5,
  },
  nudgie: {
    height: 150,
    width: 150,
    borderRadius: 24,
  },
  search: {
    margin: 5,
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 20,
    borderColor: 'transparent',
    borderWidth: 1,
    backgroundColor: '#83CA9E',
  },
  email: {
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
    width: 250,
    margin: 10,
    borderRadius: 10,
    backgroundColor: '#83CA9E',
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
