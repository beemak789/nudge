import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import { useDispatch, useSelector } from 'react-redux';
import { _deleteTask, _updateCompleteStatus } from '../store/task';
import { _fetchPlaces, clearPlaces } from '../store/places';

import { priorityStyle } from '../services/PriorityStyle';
import { LeftSwipeActions, RightSwipeActions } from '../services/Swipeable';

const NoPlaces = (props) => {
  const dispatch = useDispatch();
  const { places, status } = useSelector((state) => state.place);
  const { currTask, incomplete } = useSelector((state) => state.task);

  const updateCompleteStatus = (item) => {
    dispatch(_updateCompleteStatus(item));
    dispatch(clearPlaces());
  };
  const deleteTask = (itemId) => {
    dispatch(_deleteTask(itemId));
    dispatch(clearPlaces());
  };

  if (!incomplete.length) {
    return (
      <SafeAreaView style={styles.container2}>
        <View style= {{margin: 20,
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1}}>
          <Image
              style={styles.nudgie}
              source={require('../public/nudgie2.png')}
            />
          <Text>You have no tasks!</Text>
        </View>
      </SafeAreaView>
    );
  } else if (!places.length && status.length && currTask.id) {
    return (
      <SafeAreaView style={styles.container2}>
        <View>
          <Text>{status}</Text>
          <Swipeable
            renderLeftActions={LeftSwipeActions}
            renderRightActions={RightSwipeActions}
            onSwipeableRightOpen={() => deleteTask(currTask.id)}
            onSwipeableLeftOpen={() => updateCompleteStatus(currTask)}
          >
            <View style={styles.box}>
              <View style={styles.info}>
                <Text style={styles.item}>{currTask.name}</Text>
              </View>
              <View style={priorityStyle(currTask.priority)}></View>
            </View>
          </Swipeable>
          <TouchableOpacity
            style={styles.button}
            onPress={() => dispatch(_fetchPlaces())}
          >
            <Image
              style={styles.nudgie}
              source={require('../public/nudgie2.png')}
            />

            <Text style={styles.buttonText}>Complete a different task?</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={styles.container2}>
        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => dispatch(_fetchPlaces())}
          >
            <Image
              style={styles.nudgie}
              source={require('../public/nudgie2.png')}
            />
            <Text style={styles.buttonText}>Press to complete a task!</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  container2: {
    flex: 1,
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
    width: 100,
    height: 100,
    backgroundColor: 'transparent',
    margin: 5,
  },
  noTasksText: {
    fontWeight: '700',
    fontSize: 20,
  },
});

export default NoPlaces;
