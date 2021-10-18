import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import * as TaskManager from "expo-task-manager";
import * as Location from "expo-location";

const LOCATION_TASK_NAME = "background-location-task";

const requestPermissions = async () => {
  const { status } = await Location.requestBackgroundPermissionsAsync();
  console.log("status", status);
  if (status === "granted") {
    await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
      accuracy: Location.Accuracy.Balanced,
    });
  }
};

// I don't think we actually need the below because we're using useEffect??
// const PermissionsButton = () => (
//   <TouchableOpacity style={styles.button} onPress={requestPermissions}>
//     <Text style={styles.text}>Enable background location</Text>
//   </TouchableOpacity>
// );

TaskManager.defineTask(LOCATION_TASK_NAME, (loc) => {
  const error = loc.error;
  const data = loc.data;
  if (error) {
    // Error occurred - check `error.message` for more details.
    return;
  }
  if (data) {
    const { locations } = data;
    // do something with the locations captured in the background
    console.log("locations in task manager", locations);
  }
});

export default PermissionsButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#709775",
    marginTop: 15,
    paddingVertical: 15,
    borderRadius: 25,
    width: "80%",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontWeight: "700",
    fontSize: 18,
  },
});
