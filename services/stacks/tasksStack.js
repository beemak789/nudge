import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

// components
import TaskList from '../../Components/TaskList';
import AddTask from '../../Components/AddTask';
import CompletedList from '../../Components/CompletedList';

const Stack = createNativeStackNavigator();

const CategoriesStack = (props) => {
  return (
    <Tab.Navigator
      screenOptions={{
        activeTintColor: '#6ede8a',
        itemStyle: { marginVertical: 10 },
        inactiveTintColor: '#dde5b6',
        style: {
          backgroundColor: '#00818A',
          position: 'absolute',
          top: 500,
        },
        headerShown: false,
      }}
    >
      <Tab.Screen name="Task List" component={TaskList} {...props} />
      <Tab.Screen name="Completed List" component={CompletedList} {...props} />
    </Tab.Navigator>
  );
};

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
      <Stack.Screen name="Categories Stack">
        {(props) => <CategoriesStack {...props} />}
      </Stack.Screen>

      <Stack.Screen
        name="Add Task"
        component={AddTask}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default tasksStack;
