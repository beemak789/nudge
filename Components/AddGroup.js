import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  Button,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  ButtonGroup,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { createGroup } from '../store/group';
import { firebase } from '../config/firebase';

const AddGroup = (props) => {
  const user = useSelector((state) => state.user)
  const [text, onChangeText] = useState('');
  const [members, setMembers] = useState([user]);
  const dispatch = useDispatch();

  const onSubmit = (members) => {
    dispatch(
      createGroup({
        name: text,
        members
      })
    );
    onChangeText('');
    setMembers([user]);
    props.navigation.navigate('Group List', {
      screen: 'Group List',
    });
  };
  const friends = useSelector((state) => state.user.friends)

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
        <Image source={require('../public/nudgie2.png')} style={styles.nudgie} />
        <View style={{ marginBottom: 10 }}>
          <Text style={styles.title}>New Group</Text>
          <TextInput
            style={styles.itemName}
            onChangeText={onChangeText}
            value={text}
            placeholder="enter group name"
          />
        </View>
        <View>
          <Text style={{ marginBottom: 10 }}>Select friends to add them to group</Text>
          <View style={{ height: 20 }}></View>
          <Text
            style={{
              fontSize: 20,
              textAlign: 'left',
              fontWeight: 'bold',
              marginTop: 10,
            }}
          >
            Select Friends
          </Text>
          <View
            style={{ height: 50 }}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
          >
            {friends.map((friend) => {
              return (
                <TouchableOpacity
                  key={friend.email}
                  style={
                    members.includes(friend)
                      ? styles.selected
                      : styles.notSelected
                  }
                  onPress={() => {
                    if (members.includes(friend)) {
                      //do not highlight
                      const filteredCategories = members.filter(
                        (removeType) => removeType !== friend
                      );
                      setMembers(filteredCategories);
                    } else {
                      //highlgiht
                      setMembers([...members, friend]);
                    }
                  }}
                >
                  <Text
                    style={
                      members.includes(friend)
                        ? styles.selectedText
                        : styles.notSelectedText
                    }
                  >
                    {friend.fullName}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        <TouchableOpacity style={styles.save} onPress={() => onSubmit(members)} title="save">
          <Text style={{ color: 'black', fontWeight: 'bold' }}>Save</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default AddGroup;

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
