import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

// components
import GroupsList from '../../Components/GroupsList';
import AddGroup from '../../Components/AddGroup';
import AddGroupTask from '../../Components/AddGroupTask';
import SingleGroup from '../../Components/SingleGroup';
import GroupChat from '../../Components/GroupChat';
import SingleGroupList from '../../Components/SingleGroupList';
import SingleGroupSettings from '../../Components/SingleGroupSettings';
const Stack = createNativeStackNavigator();

const SingleGroupStack = (props) => {
  return (
    <Tab.Navigator
      initialRouteName="Single Group List"
      screenOptions={{
        activeTintColor: 'white',
        itemStyle: { marginVertical: 10 },
        inactiveTintColor: 'white',
        headerShown: false,
        // style: { position: 'relative', top: 100 },
      }}
    >
      <Tab.Screen
        name="Single Group List"
        component={SingleGroupList}
        {...props}
      />

      <Tab.Screen
        name="Group Chat"
        component={GroupChat}
        options={{ headerShown: false }}
        {...props}
      />

      <Tab.Screen
        name="Group Settings"
        component={SingleGroupSettings}
        {...props}
      />
    </Tab.Navigator>
  );
};

const groupsStack = (props) => {
  return (
    <Stack.Navigator
      initialRouteName="Group List"
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
        name="Group List"
        component={GroupsList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Add Group"
        component={AddGroup}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Single Group" component={SingleGroup} />

      <Stack.Screen name="Single Group Stack">
        {(props) => <SingleGroupStack {...props} />}
      </Stack.Screen>
      <Stack.Screen name="Add Group Task" component={AddGroupTask} />
    </Stack.Navigator>
  );
};

export default groupsStack;
