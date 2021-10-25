import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import { useSelector, useDispatch } from 'react-redux';
import { _fetchGroupMembers, deleteGroup, leaveGroup } from '../store/group';
import { deleteUserGroup } from '../store/user';
import { useIsFocused } from '@react-navigation/native';

export default function SingleGroupSettings(props) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const user = useSelector((state) => state.user);
  const selectedGroup = useSelector((state) => state.groups.selectedGroup);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      dispatch(_fetchGroupMembers(selectedGroup.group.members));
    }
  }, [props, isFocused]);

  const _deleteGroup = async () => {
    await dispatch(deleteUserGroup(selectedGroup.id));
    await dispatch(deleteGroup(selectedGroup.id, selectedGroup.group.members));
    navigation.navigate('Group List');
  };

  const _leaveGroup = async () => {
    await dispatch(deleteUserGroup(selectedGroup.id));
    await dispatch(leaveGroup(selectedGroup.id));
    navigation.navigate('Group List');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          margin: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          flex: 1,
        }}
      >
        <Text style={styles.subtitle}>Members</Text>

        <FlatList
          data={selectedGroup.members}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.box}>
              <Text style={styles.item}>{item.fullName}</Text>
              <TouchableOpacity
                onPress={() => {
                  console.log('trashcan clicked');
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
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Groups Stack', {
                screen: 'Edit Group',
              });
            }}
          >
            <View style={styles.deleteButton}>
              <AntDesign name="setting" size={22} color="black" />
              <Text style={styles.deleteText}>Edit</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              _leaveGroup();
            }}
          >
            <View style={styles.leaveButton}>
              <FontAwesome5 name="door-open" size={22} color="black" />
              <Text style={styles.deleteText}>Leave</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              _deleteGroup();
            }}
          >
            <View style={styles.deleteButton}>
              <Icon
                color="black"
                type="ionicon"
                name="trash-outline"
                size={21}
              />
              <Text style={styles.deleteText}>Delete</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

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
  subtitle: {
    fontSize: 20,
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
  leaveButton: {
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
    backgroundColor: '#F59DBF',
    shadowColor: '#000000',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 2,
    },
    margin: 10,
  },
  deleteText: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
