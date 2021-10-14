import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// components
import FriendsList from '../../Components/FriendsList';
import AddFriend from '../../Components/AddFriend';

const Stack = createNativeStackNavigator();

const friendsStack = (props) => {
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
        name="Friends List"
        component={FriendsList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Add Friend"
        component={AddFriend}
      />
    </Stack.Navigator>
  );
};

export default friendsStack;
