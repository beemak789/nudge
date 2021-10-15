import React from 'react';
// import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from '../../Components/Profile';
import EditProfile from '../../Components/EditProfile';

const Stack = createNativeStackNavigator();

export default function ProfileStack(props) {
  return (
    <Stack.Navigator initialRouteName={'My Profile'}>
      <Stack.Screen
        name="My Profile"
        options={{
          headerShown: false,
        }}
      >
        {(props) => <Profile {...props} />}
      </Stack.Screen>
      <Stack.Screen name="Edit Profile" component={EditProfile} />
    </Stack.Navigator>
  );
}
