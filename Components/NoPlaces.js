import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { _deleteTask, _updateCompleteStatus } from '../store/task';
import { _fetchPlaces } from '../store/places';
import { Icon } from 'react-native-elements';

export const NoPlaces = (props) => {
  const dispatch = useDispatch();
  const { places, status } = useSelector((state) => state.place);
  const { currTask, incomplete } = useSelector((state) => state.task);

  return (
    <SafeAreaView style={styles.container2}>
      <View
        style={{
          margin: 20,
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
        }}
      >
        <Image
          style={styles.nudgie}
          source={require('../public/nudgie2.png')}
        />
        <Text style={{fontWeight: "bold", fontSize: 16, textAlign:"center"}}>Welcome to Nudge! {"\n"} Add a task to get started.</Text>
      </View>
    </SafeAreaView>
  );
};

export const Shuffle = (props) => {
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={styles.container2}>
      <TouchableOpacity
        style={styles.newTask}
        onPress={() => dispatch(_fetchPlaces())}
      >
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>New Task</Text>
          <Icon color="black" type="ionicon" name="shuffle-outline" size={24} />
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container2: {
    flex: 1,
    justifyContent: 'center',
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
  newTask: {
    borderColor: 'transparent',
    borderWidth: 1,
    borderRadius: 25,
    margin: 10,
    padding: 5,
    backgroundColor: '#EBF6EF',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 1,
      width: -2,
    },
    elevation: 2,
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
