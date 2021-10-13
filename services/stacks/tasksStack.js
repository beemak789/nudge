import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// components
import TaskList from '../../Components/TaskList';
import AddTask from '../../Components/AddTask';

const Stack = createNativeStackNavigator();

const tasksStack = (props) => {
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
        name="Add Task"
        component={AddTask}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default tasksStack;
