import React, { useState, useEffect, useRef } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { Text, View, ActivityIndicator, LogBox } from 'react-native';
import { firebase } from '../config/firebase';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import { Icon } from 'react-native-elements';
LogBox.ignoreAllLogs();
// components
import LogIn from './LogIn';
import SignUp from './SignUp';

// stacks
import TasksStack from '../services/stacks/tasksStack';
import PlacesStack from '../services/stacks/placesStack';
import FriendsStack from '../services/stacks/friendsStack';
import GroupsStack from '../services/stacks/groupsStack';
import ProfileStack from '../services/stacks/profileStack';

// redux
import { useDispatch, useSelector } from 'react-redux';
import {
  checkLocation,
  enableLocation,
  disableLocation,
} from '../store/location';

import {
  setUser,
  setExpoPushToken,
  _setExpoPushToken,
  _fetchUserFriends,
} from '../store/user';

const Tab = createBottomTabNavigator();
const LOCATION_TASK_NAME = 'background-location-task';

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
    const {
      status: existingStatus,
    } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    return token;
  } else {
    // alert('Must use physical device for Push Notifications');
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
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      dispatch(setExpoPushToken(token));
    });
    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {
        setNotification(notification);
      }
    );

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log(response);
      }
    );

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

      let location = await Location.getCurrentPositionAsync({});
      enableLocation();
      dispatch(
        checkLocation(
          location,
          location.coords.latitude,
          location.coords.longitude
        )
      );
      let backPerm = await Location.requestBackgroundPermissionsAsync();

      if (backPerm.status === 'granted') {
        await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
          distanceInterval: 5,
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
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const tabBarListeners = ({ navigation, route }) => ({
    tabPress: () => navigation.navigate(route.name),
  });

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        itemStyle: { marginVertical: 10 },
        style: {
          backgroundColor: '#00818A',
        },
        headerShown: false,
      }}
    >
      {!user.id ? (
        <>
          <Tab.Screen
            name="Log In"
            options={{
              tabBarIcon: ({ color, focused }) => (
                <Icon
                  style={{ marginRight: 10 }}
                  focused={focused}
                  color={color}
                  type="feather"
                  name="log-in"
                  size={25}
                />
              ),
              tabBarActiveTintColor: '#F59DBF',
              tabBarInactiveTintColor: '#83CA9E',
            }}
          >
            {(props) => <LogIn {...props} />}
          </Tab.Screen>
          <Tab.Screen
            name="Sign Up"
            options={{
              tabBarIcon: ({ color, focused }) => (
                <Icon
                  style={{ marginRight: 10 }}
                  focused={focused}
                  color={color}
                  type="antdesign"
                  name="adduser"
                  size={25}
                />
              ),
              tabBarActiveTintColor: '#F59DBF',
              tabBarInactiveTintColor: '#83CA9E',
            }}
          >
            {(props) => <SignUp {...props} />}
          </Tab.Screen>
        </>
      ) : (
        <>
          <Tab.Screen
            name="Tasks Stack"
            listeners={tabBarListeners}
            options={{
              tabBarIcon: ({ color, focused }) => (
                <Icon
                  style={{ marginRight: 10 }}
                  type="ionicon"
                  name="list-outline"
                  size={25}
                  focused={focused}
                  color={color}
                />
              ),
              tabBarActiveTintColor: '#F59DBF',
              tabBarInactiveTintColor: '#83CA9E',
            }}
          >
            {(props) => <TasksStack {...props} />}
          </Tab.Screen>
          <Tab.Screen
            name="Places Stack"
            options={{
              tabBarIcon: ({ color, focused }) => (
                <Icon
                  style={{ marginRight: 10 }}
                  type="ionicon"
                  name="location-outline"
                  size={25}
                  focused={focused}
                  color={color}
                />
              ),
              tabBarActiveTintColor: '#F59DBF',
              tabBarInactiveTintColor: '#83CA9E',
            }}
          >
            {(props) => <PlacesStack {...props} />}
          </Tab.Screen>
          <Tab.Screen
            name="Friends Stack"
            options={{
              tabBarIcon: ({ color, focused }) => (
                <Icon
                  style={{ marginRight: 10 }}
                  type="ionicon"
                  name="people-outline"
                  size={25}
                  focused={focused}
                  color={color}
                />
              ),
              tabBarActiveTintColor: '#F59DBF',
              tabBarInactiveTintColor: '#83CA9E',
            }}
          >
            {(props) => <FriendsStack {...props} />}
          </Tab.Screen>
          <Tab.Screen
            name="Groups Stack"
            options={{
              tabBarIcon: ({ color, focused }) => (
                <Icon
                  style={{ marginRight: 10 }}
                  type="ionicon"
                  name="chatbox-outline"
                  size={25}
                  focused={focused}
                  color={color}
                />
              ),
              tabBarActiveTintColor: '#F59DBF',
              tabBarInactiveTintColor: '#83CA9E',
            }}
          >
            {(props) => <GroupsStack {...props} />}
          </Tab.Screen>

          <Tab.Screen
            name="Profile Stack"
            options={{
              tabBarIcon: ({ color, focused }) => (
                <Icon
                  style={{ marginRight: 10 }}
                  type="ionicon"
                  name="person-circle-outline"
                  size={25}
                  focused={focused}
                  color={color}
                />
              ),
              tabBarActiveTintColor: '#F59DBF',
              tabBarInactiveTintColor: '#83CA9E',
            }}
          >
            {(props) => <ProfileStack {...props} />}
          </Tab.Screen>
        </>
      )}
    </Tab.Navigator>
  );
};

export default Main;
