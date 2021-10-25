import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { _editGroup } from '../store/group';
import { Icon } from 'react-native-elements';
import { _fetchUserFriends } from '../store/user';

const EditGroup = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const selectedGroup = useSelector((state) => state.groups.selectedGroup);
  const { groups } = useSelector((state) => state.groups);
  const [text, onChangeText] = useState(selectedGroup.group.name);
  const [members, setMembers] = useState([]);
  const [selectedMembers, setSelected] = useState([]);
  const friends = useSelector((state) => state.user.friends);

  const nonGroupFriends = friends.filter(
    (friend) => !selectedGroup.group.members.includes(friend.id)
  );

  useEffect(() => {
    dispatch(_fetchUserFriends(user));
  }, []);

  const onSubmit = () => {
    if (!text.trim()) {
      alert('Please enter a group name!');
      return;
    }

    dispatch(
      _editGroup({
        groupId: selectedGroup.id,
        name: text,
        members,
      })
    );

    onChangeText('');
    setMembers([]);

    props.navigation.navigate('Single Group Stack', {
      screen: 'Settings',
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ display:"flex", flexDirection:"row", justifyContent: "space-between", alignItems: 'right', marginLeft: 20, marginRight: 20 }}>
        <TouchableOpacity
          style={styles.save}
          onPress={() => {
            props.navigation.navigate('Single Group Stack', {
              screen: 'Settings',
            });
          }}
        >
          <Text style={styles.saveText}>Back</Text>
        </TouchableOpacity>

      <TouchableOpacity style={styles.save} onPress={onSubmit} title="save">
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
        </View>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
        }}
      >
        <Image
          source={require('../public/nudgie2.png')}
          style={styles.nudgie}
        />
        <View style={{ marginBottom: 30 }}>
          <Text style={styles.title}>Edit Group</Text>
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
              placeholder="Enter group name"
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
          <ScrollView>
            {nonGroupFriends.map((friend) => {
              return (
                <TouchableOpacity
                  key={friend.id}
                  style={
                    selectedMembers.includes(friend.id)
                      ? styles.selected
                      : styles.notSelected
                  }
                  onPress={() => {
                    if (selectedMembers.includes(friend.id)) {
                      //do not highlight
                      const filteredCategories = selectedMembers.filter(
                        (removeType) => removeType !== friend.id
                      );
                      const filteredMembers = members.filter(
                        (member) => member.id !== friend.id
                      );
                      setSelected(filteredCategories);
                      setMembers(filteredMembers);
                    } else {
                      //highlgiht
                      setSelected([...selectedMembers, friend.id]);
                      setMembers([...members, friend]);
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
          </ScrollView>
        </View>

      </View>
    </SafeAreaView>
  );
};
export default EditGroup;

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
