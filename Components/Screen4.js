import React, { useState } from "react";
import { StyleSheet, Text, SafeAreaView } from "react-native";

const Screen4 = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>This is screen 4</Text>
    </SafeAreaView>
  );
};

export default Screen4;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
