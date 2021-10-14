import {
  StyleSheet,
  FlatList,
  SafeAreaView,
  Text,
  Button,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, { useEffect } from 'react';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {
  _deleteTask,
  _fetchAllTasks,
  _updateIncompleteStatus,
} from '../store/task';
import { useNavigation } from '@react-navigation/native';
import { _fetchPlaces } from '../store/places';
import { useDispatch, useSelector } from 'react-redux';
import { LeftSwipeActions, RightSwipeActions } from '../services/Swipeable';
import { priorityStyle } from '../services/taskListFuncs';

const CompletedList = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { tasks } = useSelector((state) => state.task);

  const completeTasks = tasks.filter((task) => task.completed === true);

  useEffect(() => {
    dispatch(_fetchAllTasks());
  }, [dispatch]);

  if (!tasks.length) {
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <Text style={styles.noTasksText}>You don't have any tasks...</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={(props) => {
              navigation.navigate('Add Task');
            }}
          >
            <Image
              style={styles.nudgie}
              source={require('../public/nudgie2.png')}
            />
            <Text style={styles.buttonText}>Add a Task!</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const updateCompleteStatus = (item) => {
    dispatch(_updateIncompleteStatus(item));
  };
  const deleteTask = (itemId) => {
    dispatch(_deleteTask(itemId));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginLeft: 'auto', padding: 5 }}></View>
      <View style={styles.body}>
        <FlatList
          data={completeTasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Swipeable
              renderLeftActions={LeftSwipeActions}
              renderRightActions={RightSwipeActions}
              onSwipeableRightOpen={() => deleteTask(item.id)}
              onSwipeableLeftOpen={() => updateCompleteStatus(item)}
            >
              <View style={styles.box}>
                <View style={styles.info}>
                  <Text style={styles.item}>{item.name}</Text>
                </View>
                <View style={priorityStyle(item.priority)}></View>
              </View>
            </Swipeable>
          )}
        ></FlatList>
      </View>
    </SafeAreaView>
  );
};

export default CompletedList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: 20,
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
    alignSelf: 'center',
    display: 'flex',
    width: '95%',
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
  noTasksText: {
    fontWeight: '700',
    fontSize: 20,
  },
});
