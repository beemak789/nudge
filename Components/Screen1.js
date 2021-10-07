import React, { useState } from "react";
import { StyleSheet, Text, SafeAreaView, Button } from "react-native";
import { firebase } from "../config/firebase";

const Screen1 = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>This is Screen 1</Text>
      <Button
        title="Press to Send Notification"
        onPress={async () => {
          console.log('button presed', props)
          // await props.sendPushNotification(props.expoPushToken);
        }}
      />
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
