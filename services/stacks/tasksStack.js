import React from 'react';
import { useSelector } from 'react-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

// components
import NoTasks from '../../Components/NoTasks';
import TaskList from '../../Components/TaskList';
import AddTask from '../../Components/AddTask';
import EditTask from '../../Components/EditTask';
import CompletedList from '../../Components/CompletedList';

const Stack = createNativeStackNavigator();

const CategoriesStack = (props) => {
  return (
    <Tab.Navigator
      screenOptions={{
        activeTintColor: 'white',
        itemStyle: { marginVertical: 10 },
        inactiveTintColor: 'white',
        headerShown: false,
        // style: { position: 'relative', top: 100 },
      }}
    >
      <Tab.Screen name="Task List" component={TaskList} {...props} />
      <Tab.Screen name="Completed List" component={CompletedList} {...props} />
    </Tab.Navigator>
  );
};

const tasksStack = (props) => {
  const { tasks } = useSelector((state) => state.task);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: 'white',
          height: 10,
        },
        headerTintColor: 'white',
        headerBackTitle: '',
        headerShadowVisible: false,
      }}
    >
      {!tasks.length ? (
        <Stack.Screen
          name="No Tasks"
          component={NoTasks}
          options={{ headerShown: false }}
        />
      ) : (
        <Stack.Screen name="Categories Stack">
          {(props) => <CategoriesStack {...props} />}
        </Stack.Screen>
      )}

      <Stack.Screen
        name="Add Task"
        component={AddTask}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Edit Stack"
        component={EditTask}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default tasksStack;
