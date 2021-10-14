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
          activeTintColor: 'white',
          itemStyle: { marginVertical: 10 },
          inactiveTintColor: 'white',
          headerShown: false,
          style: {position: 'relative', top: 100}
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
          backgroundColor: 'white',
        },
        headerTintColor: 'white',
        headerBackTitle: '',
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
