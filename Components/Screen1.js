import React, { useState } from "react";
import { StyleSheet, Text, SafeAreaView } from "react-native";

const Screen1 = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>This is screen 1</Text>
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
