import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// components
import PlacesList from '../../Components/PlacesList';

const Stack = createNativeStackNavigator();

const placesStack = (props) => {
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
        name="Places List"
        component={PlacesList}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default placesStack;
