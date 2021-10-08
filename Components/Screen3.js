import React, { useState, useEffect } from "react";
import { StyleSheet, Text, SafeAreaView } from "react-native";

const Screen3 = (props) => {

  useEffect(() => {
    // updateTask()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <Text>This is screen 3</Text>
    </SafeAreaView>
  );
};

export default Screen3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
