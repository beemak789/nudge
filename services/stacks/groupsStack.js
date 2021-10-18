import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// components
import GroupsList from '../../Components/GroupsList';
import AddGroup from '../../Components/AddGroup';
import SingleGroup from '../../Components/SingleGroup';
import GroupChat from '../../Components/GroupChat';
import SingleGroupList from '../../Components/SingleGroupList';
import AddGroupTask from '../../Components/AddGroupTask';
const Stack = createNativeStackNavigator();

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
      <Stack.Screen name="Add Group Task" component={AddGroupTask} />
      <Stack.Screen name="Single Group List" component={SingleGroupList} />
      <Stack.Screen
        name="Group Chat"
        component={GroupChat}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default groupsStack;
