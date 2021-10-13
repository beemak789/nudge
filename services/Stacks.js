import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// components
import TaskList from '../Components/TaskList';
import PlacesList from '../Components/PlacesList';
import AddTask from '../Components/AddTask';

const Stack = createNativeStackNavigator();

// these are the imbedded stack navigators within each logged in tab in Main.js. These don't have to be stacks, we can also embed drawers or another tab within the top tab navigator (ex: imbedded tab on your instagram profile page, one tab is your photos and the other tab is your tagged photos)

export const Screens1Navigator = (props) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: '#709775',
        },
        headerTintColor: 'white',
        headerBackTitle: 'Back',
      }}
    >
      <Stack.Screen
        name="Task List"
        component={TaskList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Places List"
        component={PlacesList}
        options={{ headerShown: false }}
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
          backgroundColor: '#709775',
        },
        headerTintColor: 'white',
        headerBackTitle: 'Back',
      }}
    >
      <Stack.Screen
        name="Add Task"
        component={AddTask}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
};
