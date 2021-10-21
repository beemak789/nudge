import React, { useEffect, useState } from 'react';

import {
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  View,
  Image,
  FlatList,
  Alert
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { createGroup } from '../store/group';
import { Icon } from 'react-native-elements';
import {
  _addFriend,
  _deleteFriend,
  _fetchSingleFriendInfo,
  _fetchUserFriends,
  _fetchUserPendingFriends,
} from '../store/user';
import { useNavigation } from '@react-navigation/core';

const FriendsList = (props) => {
  const user = useSelector((state) => state.user);
  const numFriends = user.friends.length || 0;
  const numPendingFriends = user.pendingFriends.length || 0;
  const dispatch = useDispatch();
  const navigation = useNavigation()

  useEffect(() => {
    dispatch(_fetchUserFriends(user));
    dispatch(_fetchUserPendingFriends(user));
  }, [dispatch]);


  function showConfirmDialog (userId, friendId, userName, friendName){
    return Alert.alert(
      "Create Group",
      `Would you like to create a group with ${friendName}?`,
      [
        // The "Yes" button
        {
          text: "Yes",
          onPress: async() => {
            dispatch(createGroup({
              name: `${userName} & ${friendName}`,
              members: [userId, friendId]
            })
          )

          navigation.navigate('Groups Stack', { screen: 'Single Group Stack', params: {screen: 'Tasks'} });
          },
        },
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: "No",
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ alignItems: 'flex-end', marginRight: 20, marginTop: 0 }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            props.navigation.navigate('Add Friend');
          }}
        >
          <Icon
            color="black"
            type="ionicon"
            name="person-add-outline"
            size={20}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          margin: 20,
          flex: 1
        }}
      >
        <Image
          source={require('../public/nudgie2.png')}
          style={styles.nudgie}
        />

        <Text style={styles.title}>Nudgies</Text>

        <Text style={styles.subtitle}>Pending Requests</Text>
        {numPendingFriends < 1 ? (
          <Text>None</Text>
        ) : user.pendingFriends[0].id ? (
          <FlatList
            data={user.pendingFriends}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.pendingBox}>
                <Text style={styles.pending}>{item.fullName}</Text>
                <TouchableOpacity
                  onPress={() => {
                    dispatch(_addFriend(user.id, item.id));
                  }}
                >
                  <Icon
                    style={{ marginRight: 5 }}
                    color="black"
                    type="ionicon"
                    name="people-outline"
                    size={22}
                  />
                </TouchableOpacity>
              </View>
            )}
          ></FlatList>
        ) : (
          <Text>Loading...</Text>
        )}
        {numFriends < 1 ? (
          <Text>No friends</Text>
        ) : user.friends[0].id ? (
          <>
            <Text style={styles.subtitle}>Your Friends</Text>

            <FlatList
              data={user.friends}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.box}>
                  <TouchableOpacity
                    onPress={ () => {
                      showConfirmDialog(user.id, item.id, user.fullName, item.fullName);
                    }}
                  >
                    <Icon
                      style={{ marginLeft: 5 }}
                      color="black"
                      type="ionicon"
                      name="notifications-outline"
                      size={20}
                    />
                  </TouchableOpacity>
                  <Text style={styles.item}>{item.fullName}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      dispatch(_deleteFriend(user.id, item.id));
                    }}
                  >
                    <Icon
                      style={{ marginRight: 5 }}
                      color="black"
                      type="ionicon"
                      name="trash-outline"
                      size={22}
                    />
                  </TouchableOpacity>
                </View>
              )}
            ></FlatList>
          </>
        ) : (
          <Text>Loading...</Text>
        )}
      </View>
    </SafeAreaView>
  );
};
export default FriendsList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  nudgie: {
    height: 150,
    width: 150,
    borderRadius: 24,
    alignSelf: 'center',
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    fontWeight: 'bold',
    margin: 5,
  },
  pending: {
    fontSize: 20,
    textAlign: 'center',
    margin: 5,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
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
  pendingBox: {
    display: 'flex',
    justifyContent: 'space-between',
    width: 325,
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
    borderBottomColor: '#83CA9E',
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
