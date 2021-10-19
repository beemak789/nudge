import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  Button,
  TextInput,
  TouchableOpacity,
  View,
  Image
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { createGroup } from '../store/group';
import { firebase } from '../config/firebase';
import { Icon } from 'react-native-elements';
import { _fetchUserFriends } from '../store/user';

const AddGroup = (props) => {
  const user = useSelector((state) => state.user);
  const { groups } = useSelector((state) => state.groups);
  const [text, onChangeText] = useState('');
  const [members, setMembers] = useState([user.id]);
  const dispatch = useDispatch();
  const friends = useSelector((state) => state.user.friends);

  useEffect(() => {
    dispatch(_fetchUserFriends(user));
  }, []);

  const onSubmit = () => {
    if (!text.trim()){
      alert('Please enter a group name!');
      return;
    }
    if (members.length === 1) {
      alert('Please add some group members!');
      return;
    } else {
      dispatch(
        createGroup({
          name: text,
          members,
        })
      );

      onChangeText('');
      setMembers([user.id]);

      props.navigation.navigate('Group List');
    }

  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ alignItems: 'right', marginLeft: 20, marginTop: 0 }}>
        {groups.length ? (
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              props.navigation.navigate('Group List');
            }}
          >
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
        ) : (
          <View style={{ height: 73 }}></View>
        )}
      </View>
      <View
        style={{
          flex: 1,
          alignItems: 'center'
        }}
      >
        <Image
          source={require('../public/nudgie2.png')}
          style={styles.nudgie}
        />
        <View style={{ marginBottom: 30 }}>
          <Text style={styles.title}>Create a New Group</Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <TextInput
              style={styles.newGroupName}
              onChangeText={onChangeText}
              value={text}
              placeholder="enter group name"
            />
          </View>
          <Text
            style={{
              fontSize: 20,
              textAlign: 'left',
              fontWeight: 'bold',
              marginTop: 20,
            }}
          >
            Select Friends
          </Text>
          <Text style={{ marginBottom: 10 }}>
            Select friends to add them to group
          </Text>
          <View style={{}}>
            {friends.map((friend) => {
              return (
                <TouchableOpacity
                  key={friend.id}
                  style={
                    members.includes(friend.id)
                      ? styles.selected
                      : styles.notSelected
                  }
                  onPress={() => {
                    if (members.includes(friend.id)) {
                      //do not highlight
                      const filteredCategories = members.filter(
                        (removeType) => removeType !== friend.id
                      );
                      setMembers(filteredCategories);
                    } else {
                      //highlgiht
                      setMembers([...members, friend.id]);
                    }
                  }}
                >
                  <Text
                    style={
                      members.includes(friend.id)
                        ? styles.selectedText
                        : styles.notSelectedText
                    }
                  >
                    {friend.fullName}
                  </Text>
                  <View
                    style={{
                      display: 'flex',
                      marginRight: 5,
                      alignItems: 'center',
                    }}
                  >
                    <Icon
                      color="black"
                      type="ionicon"
                      name="person-add-outline"
                      size={20}
                    />
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        <TouchableOpacity style={styles.save} onPress={onSubmit} title="save">
          <Text style={styles.saveText}>save</Text>
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
  newGroupName: {
    fontSize: 20,
    borderWidth: 1,
    textAlign: 'center',
    borderColor: 'transparent',
    borderRadius: 4,
    margin: 5,
    padding: 10,
    width: 300,
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
  },
  item: {
    padding: 10,
    fontSize: 18,
    alignSelf: 'center',
    textAlign: 'center',
  },
  selected: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: 10,
    borderRadius: 10,
    backgroundColor: '#83CA9E',
    // backgroundColor: '#EBF6EF',
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
  notSelected: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: 10,
    borderRadius: 10,
    // backgroundColor: 'black',
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
  selectedText: {
    padding: 10,
    fontSize: 18,
    alignSelf: 'center',
    textAlign: 'left',
  },
  notSelectedText: {
    padding: 10,
    fontSize: 18,
    alignSelf: 'center',
    textAlign: 'left',
  },
  saveText: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  save: {
    justifyContent: 'center',
    width: 80,
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
    marginTop: 10,
  },
});
