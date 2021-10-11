import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// components
import TaskList from "../Components/TaskList";
import Screen2 from "../Components/Screen2";


const Stack = createNativeStackNavigator();

// these are the imbedded stack navigators within each logged in tab in Main.js. These don't have to be stacks, we can also embed drawers or another tab within the top tab navigator (ex: imbedded tab on your instagram profile page, one tab is your photos and the other tab is your tagged photos)

export const Screens1Navigator = (props) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: "#709775",
        },
        headerTintColor: "white",
        headerBackTitle: "Back",
      }}
    >
      <Stack.Screen
        name="Task List"
        component={TaskList}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
};

export const Screens2Navigator = (props) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: "#709775",
        },
        headerTintColor: "white",
        headerBackTitle: "Back",
      }}
    >
      <Stack.Screen
        name="Screen 2"
        component={Screen2}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
};

