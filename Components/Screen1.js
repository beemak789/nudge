import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, SafeAreaView } from 'react-native';
import { createTask } from '../queries/tasks';


const Screen1 = (props) => {

  useEffect(() => {
    // createTask()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <Text>This is Screen 1</Text>
    </SafeAreaView>
  );
};

export default Screen1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
