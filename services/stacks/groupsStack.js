import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// components
import GroupsList from '../../Components/GroupsList';

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
        name="Groups List"
        component={GroupsList}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default groupsStack;
