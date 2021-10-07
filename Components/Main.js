import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { loggedInDrawer, loggedOutDrawer } from '../services/TabItems';

// components
import LogIn from './LogIn';
import SignUp from './SignUp';
import {
  Screens1Navigator,
  Screens2Navigator,
  Screens3Navigator,
  Screens4Navigator,
} from '../services/Stacks';
import { Text, View } from 'react-native';
import { firebase } from '../config/firebase';

const Tab = createBottomTabNavigator();

const Main = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(false);

  useEffect(() => {
    const usersRef = firebase.firestore().collection('users');
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data() || {};
            setLoading(false);
            setUser(userData);
          })
          .catch((error) => {
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    });
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <Tab.Navigator
      initialRouteName='Screen 1'
      screenOptions={{
        activeTintColor: '#6ede8a',
        itemStyle: { marginVertical: 10 },
        inactiveTintColor: '#dde5b6',
        style: {
          backgroundColor: '#00818A',
        },
      }}
    >
      {!user
        ? loggedOutDrawer.map((tab) => (
            <Tab.Screen
              key={tab.name}
              name={tab.name}
              options={{
                // below is for rendering the icons

                // tabBarIcon: ({color, focused}) => {
                //   let iconName;

                //   if (tab.name === 'Log In') {
                //     return (
                //       <Feather
                //         name="log-in"
                //         focused={focused}
                //         size={25}
                //         color={color}
                //       />
                //     );
                //   } else if (tab.name === 'Sign Up') {
                //     return (
                //       <AntDesign
                //         name="adduser"
                //         focused={focused}
                //         size={25}
                //         color={color}
                //       />
                //     );
                //   }
                // },

                tabBarActiveTintColor: '#6ede8a',
                tabBarInactiveTintColor: '#97a97c',
              }}
              component={
                tab.name === 'Log In'
                  ? (props) => <LogIn {...props} />
                  : (props) => <SignUp {...props} />
              }
            />
          ))
        : loggedInDrawer.map((tab) => (
            <Tab.Screen
              key={tab.name}
              name={tab.name}
              options={{
                // below is for rendering the icons
                //   tabBarIcon: ({color, focused}) => {
                //     let iconName;

                //     if (tab.name === 'Screen 1') {
                //       return (
                //         <Ionicons
                //           name="person-circle-outline"
                //           focused={focused}
                //           size={25}
                //           color={color}
                //         />
                //       );
                //     } else if (tab.name === 'Screen 2') {
                //       return (
                //         <Feather
                //           name="calendar"
                //           focused={focused}
                //           size={25}
                //           color={color}
                //         />
                //       );
                //     } else if (tab.name === 'Screen 3') {
                //       <Feather
                //         name="log-out"
                //         focused={focused}
                //         size={25}
                //         color={color}
                //       />;
                //     } else {
                //       return (
                //         <Ionicons
                //           name="people-outline"
                //           focused={focused}
                //           size={25}
                //           color={color}
                //         />
                //       );
                //     }
                //   },

                tabBarActiveTintColor: '#6ede8a',
                tabBarInactiveTintColor: '#97a97c',
              }}
              component={
                tab.name === 'Screens 1'
                  ? (props) => <Screens1Navigator {...props} />
                  : tab.name === 'Screens 2'
                  ? (props) => <Screens2Navigator {...props} />
                  : tab.name === 'Screens 3'
                  ? (props) => <Screens3Navigator {...props} />
                  : (props) => <Screens4Navigator {...props} />
              }
            />
          ))}
    </Tab.Navigator>
  );
};

export default Main;
