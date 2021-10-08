import React, { useState, useEffect } from "react";
import { StyleSheet, Text, SafeAreaView } from "react-native";
import { getTasks } from '../queries/tasks';


const Screen2 = (props) => {

  useEffect(() => {
    // getTasks();
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <Text>This is screen 2</Text>
    </SafeAreaView>
  );
};

export default Screen2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
