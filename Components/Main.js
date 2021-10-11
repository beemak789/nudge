import React, { useState, useEffect, useRef } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { LogBox } from "react-native";
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { useDispatch, useSelector } from "react-redux"

LogBox.ignoreLogs(["Inline function"]);
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
import LogOut from "./LogOut";

import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import { setBackgroundLocation } from "../store/location";
import { setUser, setExpoPushToken } from "../store/user";

const Tab = createBottomTabNavigator();
const LOCATION_TASK_NAME = "background-location-task";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    return token;
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

const Main = () => {
  const [loading, setLoading] = useState(true);
  // const [user, setUser] = useState({});
  // const [location, setLocation] = useState(null);
  // const [expoPushToken, setExpoPushToken] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);


  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const user = useSelector( (state) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => {
      dispatch(setExpoPushToken(token))
    });
    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

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
            dispatch(setUser(userData));
          })
          .catch((error) => {
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    });
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      console.log("status in main", status);
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      // setLocation(location);
      dispatch(setBackgroundLocation(location))
      let backPerm = await Location.requestBackgroundPermissionsAsync();
      console.log("backPerm", backPerm);

      if (backPerm.status === "granted") {
        await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
          accuracy: Location.Accuracy.Balanced,
        });
      }
    })();
  }, []);

  TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
    if (error) {
      // Error occurred - check `error.message` for more details.
      return;
    }
    if (data) {
      const { locations } = data;
      dispatch(setBackgroundLocation(locations))
      // do something with the locations captured in the background
      console.log("locations in task manager", locations);
    }
  });

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <Tab.Navigator
      initialRouteName="Screens 1"
      screenOptions={{
        activeTintColor: '#6ede8a',
        itemStyle: { marginVertical: 10 },
        inactiveTintColor: '#dde5b6',
        style: {
          backgroundColor: '#00818A',
        },
      }}
    >
      {!user.id ? (
        <>
          <Tab.Screen
            name="Log In">
              {props => <LogIn {...props} />}
            </Tab.Screen>
          <Tab.Screen
            name="Sign Up">
              {props => <SignUp {...props} />}
            </Tab.Screen>
        </>
      ) : (
        <>
          <Tab.Screen name="Tasks List">
            {(props) => <Screens1Navigator {...props} />}
          </Tab.Screen>
          <Tab.Screen name="Screens 2">
            {props => <Screens2Navigator {...props} />}
          </Tab.Screen>
          <Tab.Screen name="Screens 3">
            {props => <Screens3Navigator {...props} />}
          </Tab.Screen>
          <Tab.Screen name="Log Out">
            {props => <LogOut {...props} />}
          </Tab.Screen>
        </>
      )}
    </Tab.Navigator>
  );
};

export default Main;

