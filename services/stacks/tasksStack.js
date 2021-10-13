import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

// components
import TaskList from '../../Components/TaskList';
import AddTask from '../../Components/AddTask';
import CompletedList from '../../Components/CompletedList';
import { updateTask } from '../../store/task';

const Stack = createNativeStackNavigator();

const CategoriesStack = (props) => {
  return (
    <SafeAreaProvider>
      <Tab.Navigator
        screenOptions={{
          activeTintColor: '#6ede8a',
          itemStyle: { marginVertical: 10 },
          inactiveTintColor: '#dde5b6',
          style: {
            backgroundColor: '#00818A',
          },
          headerShown: true,
        }}
      >
        <Tab.Screen name="Task List" component={TaskList} {...props} />
        <Tab.Screen
          name="Completed List"
          component={CompletedList}
          {...props}
        />
      </Tab.Navigator>
    </SafeAreaProvider>
  );
};

const tasksStack = (props) => {
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
