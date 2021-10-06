import React, { useState } from "react";
import { StyleSheet, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { firebase } from "../config/firebase";

const Screen1 = (props) => {
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
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
