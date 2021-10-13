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
import React, { useState, useEffect } from 'react';

export const priorityStyle = (priority) => {
  let color;
  if (priority === 'high') {
    color = '#bb3e03';
  } else if (priority === 'medium') {
    color = '#f4a261';
  } else {
    color = '#8FC0A9';
  }

  return {
    marginLeft: 'auto',
    marginBottom: 'auto',
    backgroundColor: color,
    width: 25,
    height: 25,
    borderRadius: 4,
    shadowColor: 'black',
    shadowOpacity: 0.1,
  };
};

export const NoTasks = (props) => {
  console.log(props);
  return (
    <View>
      <Text style={styles.noTasksText}>You don't have any tasks...</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={(props) => {
          props.navigation.navigate('Add Task');
        }}
      >
        <Image
          style={styles.nudgie}
          source={require('../public/nudgie2.png')}
        />
        <Text style={styles.buttonText}>Add a Task!</Text>
      </TouchableOpacity>
    </View>
  );
};

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
