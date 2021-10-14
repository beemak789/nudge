import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// components
import GroupsList from '../../Components/GroupsList';
import AddGroup from '../../Components/AddGroup'
const Stack = createNativeStackNavigator();

const groupsStack = (props) => {
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
        name="Group List"
        component={GroupsList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Add Group"
        component={AddGroup}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default groupsStack;
