import React, { useState, useEffect, useRef } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { Text, View } from 'react-native';
import { firebase } from '../config/firebase';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';

// redux
import { useDispatch } from 'react-redux';
import {
  checkLocation,
  enableLocation,
  disableLocation,
} from '../store/location';

import {
  setUser,
  _setExpoPushToken,
  _fetchUserFriends,
} from '../store/user';
import { notificationsPrompt } from '../services/notifications';
import TabStack from '../services/stacks/tabStack';

const Stack = createNativeStackNavigator();

const LOCATION_TASK_NAME = 'background-location-task';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

async function registerForPushNotificationsAsync() {
  try {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
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
  } catch(err) {
    console.log(err)
  }
}

const Main = () => {
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      dispatch(_setExpoPushToken(token));
    });
    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    // if (user.allowNotifications === 'ON') {
    //   notificationsPrompt(dispatch, notificationListener, setNotification);
    // }

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
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
          .then(async (document) => {
            const userData = document.data() || {};
            setLoading(false);
            await _fetchUserFriends(user.uid);
            dispatch(setUser(userData));
          })
          .catch((error) => {
            setLoading(false);
          });
        if (user.token) {
          dispatch(_setExpoPushToken(user));
        }
      } else {
        setLoading(false);
      }
    });
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        disableLocation();
        setErrorMsg('Permission to access location was denied');
        return;
      }
      enableLocation();
      let location = await Location.getCurrentPositionAsync({});

      dispatch(
        checkLocation(
          location,
          location.coords.latitude,
          location.coords.longitude
        )
      );
      let backPerm = await Location.requestBackgroundPermissionsAsync();
      console.log('backPerm', backPerm);

      if (backPerm.status === 'granted') {
        await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
          distanceInterval: 5,
          accuracy: Location.Accuracy.Balanced,
        });
      }
    })();
  }, []);

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      dispatch(_setExpoPushToken(token));
    });
    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
    if (error) {
      // Error occurred - check `error.message` for more details.
      return;
    }
    if (data) {
      const { locations } = data;

      dispatch(
        checkLocation(
          locations[0],
          locations[0].coords.latitude,
          locations[0].coords.longitude
        )
      );

      // do something with the locations captured in the background
      // console.log('locations in task manager', locations);
    }
  });

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <TabStack />
  );
};

export default Main;
