import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from './Main';
import LogIn from './LogIn'
import SignUp from './SignUp'
import { useSelector } from 'react-redux';
const Stack = createNativeStackNavigator();

const LandingPage = () => {
  const user = useSelector((state) => state.user);
  return (
    <Stack.Navigator
      initialRouteName={user.id ? 'Tabs' : 'LogIn'}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Tabs" component={Main} />
      <Stack.Screen name="LogIn" component={LogIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  )
}
//main doesn't happen until there's a user
//this way the notifications aren't running constantly in use-effect
//now that main is not the main page, it is no longer always running.

export default LandingPage
