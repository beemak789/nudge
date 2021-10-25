import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserGroups, _setGroups, selectGroup } from '../store/group';
import { _sendTasksToGroup } from '../store/task';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';

const windowWidth = Number(Dimensions.get('window').width);

const SendToGroup = (props) => {
  const dispatch = useDispatch();
  const { groups } = useSelector((state) => state.groups);
  const navigation = useNavigation();
  const user = useSelector((state) => state.user);
  const tasks = [...props.route.params.tasksToSend];
  const taskIds = [...props.route.params.selectedTasks];
  const [groupId, addGroupId] = useState('');

  useEffect(() => {
    dispatch(fetchUserGroups(user));
  }, [dispatch]);

  const sendToGroup = async () => {
    if (!groupId.trim()) {
      alert('Please select a group!');
      return;
    } else {
      await dispatch(selectGroup(groupId));
      await dispatch(_sendTasksToGroup(groupId, tasks, taskIds));
      navigation.navigate('Groups Stack', { screen: 'Single Group Stack' });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <View
          style={{
            marginRight: 'auto',
            marginLeft: 10,
          }}
        >
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Icon color="black" type="antdesign" name="back" size={18} />
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => sendToGroup()}>
            <Icon color="black" type="feather" name="send" size={18} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.imageContent}>
        <Image
          source={require('../public/nudgie2.png')}
          style={styles.nudgie}
        />
      </View>

      {!groups.length ? (
        <Text style={{display: "flex", flexDirection: "column", justifyContent:"center", alignItems:"center", marginHorizontal: 20, textAlign: "center", fontWeight: "bold", fontSize: 16}}>You have no groups to send this task to!</Text>
      ) : (
        <>
          <Text style={styles.title}>Select Group:</Text>
          <View>
            <FlatList
              contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}
              data={groups}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      if (groupId === item.id) {
                        addGroupId('');
                      } else {
                        addGroupId(item.id);
                      }
                    }}
                  >
                    <View
                      style={
                        groupId === item.id
                          ? styles.selectedBox
                          : styles.unselectedBox
                      }
                    >
                      <View style={styles.info}>
                        <Text style={styles.item}>{item.name}</Text>
                        <Text style={styles.memberNumber}>
                          {item.members.length} members
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              }}
            ></FlatList>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default SendToGroup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    alignItems: 'flex-end',
    marginRight: 10,
  },
  imageContent: {
    width: '100%',
    aspectRatio: 10 / 4,
  },

  nudgie: {
    width: '90%',
    height: '90%',
    resizeMode: 'contain',
    alignSelf: 'center',
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

  box: {
    display: 'flex',
    width: windowWidth * 0.9,
    alignItems: 'baseline',
    marginBottom: 5,
    marginTop: 5,
    borderRadius: 10,
    backgroundColor: '#EBF6EF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 1,
      width: -2,
    },
    elevation: 2,
  },
  selectedBox: {
    display: 'flex',
    width: windowWidth * 0.9,
    alignItems: 'baseline',
    marginBottom: 5,
    marginTop: 5,
    borderRadius: 10,
    backgroundColor: '#83CA9E',
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 1,
      width: -2,
    },
    elevation: 2,
  },
  unselectedBox: {
    display: 'flex',
    width: windowWidth * 0.9,
    alignItems: 'baseline',
    marginBottom: 5,
    marginTop: 5,
    color: 'gray',
    borderRadius: 10,
    backgroundColor: '#EBF6EF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 1,
      width: -2,
    },
    elevation: 2,
  },
  info: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
  },
  item: {
    padding: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  memberNumber: {
    padding: 10,
    fontSize: 12,
  },
  body: {
    width: '100%',
    flex: 1,
    marginTop: 20,
  },
  image: {
    width: 80,
    height: 80,
    borderColor: '#FFFFFF',
    margin: 15,
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
  title: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    margin: 5,
  },
});
