import {
  StyleSheet,
  FlatList,
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';

import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  _deleteTask,
  _fetchAllTasks,
  _updateCompleteStatus,
} from '../store/task';
import { useDispatch } from 'react-redux';

const NoTasks = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(_fetchAllTasks());
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 1, alignItems: "center", justifyContent:"center"}}>
      <Image
            style={styles.nudgie}
            source={require('../public/nudgie2.png')}
          />
        <Text style={styles.noTasksText}>You don't have any tasks...</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={(props) => {
            navigation.navigate('Add Task');
          }}
        >

          <Text style={styles.buttonText}>Add a Task!</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default NoTasks;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: 20,
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
    fontSize: 18,
    padding: 5,
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
