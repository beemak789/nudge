import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { setExpoPushToken } from '../store/user';

export async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const {
      status: existingStatus,
    } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      // set permission based on switch value
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = await status;
    }
    console.log9notificationsPrompt(dispatch, notificationListener, setNotification);
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
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

export async function unregisterForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    Notifications.removeNotificationSubscription();
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
  }

  return token;
}

//This is when user gets prompted when being notified.
export async function notificationsPrompt(
  dispatch,
  notificationListener,
  responseListener,
  setNotification
) {
  const token = await registerForPushNotificationsAsync();
  dispatch(setExpoPushToken(token));
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
}
