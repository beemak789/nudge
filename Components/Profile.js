import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  View,
  Switch,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {
  logOutUser,
  enableNotifications,
  disableNotifications,
} from '../store/user';
import { enableLocation, disableLocation } from '../store/location';
import { useNavigation } from '@react-navigation/core';

export default function Profile() {
  const user = useSelector((state) => state.user);
  const { token, badgeCount } = useSelector((state) => state.user);
  console.log("the user---->", user)
  const { navigate, reset } = useNavigation();
  const dispatch = useDispatch();
  let [notificationToggle, setNotificationToggle] = useState(() => !!token);
  let [locationToggle, setLocationToggle] = useState(false);

  const locationFn = async () => {
    if (locationToggle) {
      dispatch(disableLocation());
      setLocationToggle(false);
      return;
    } else {
      dispatch(enableLocation());
      setLocationToggle(true);
    }
  };
  useEffect(() => {
    locationFn();
  }, []);

  const toggleLocation = (toggle) => {
    if (toggle) {
      dispatch(enableLocation(user));
    } else {
      dispatch(disableLocation(user));
    }
    setLocationToggle(!locationToggle);
  };

  //toggle it from false to true
  const toggleNotification = (toggle) => {
    if (toggle) {
      dispatch(enableNotifications(user));
    } else {
      dispatch(disableNotifications(user));
    }
    setNotificationToggle(!notificationToggle);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ display: 'flex', alignItems: 'center' }}>
        <Image
          style={styles.userImage}
          source={require('../public/nudgie2.png')}
        />
        <View>
          <Text style={styles.title}>My Profile</Text>
        </View>

        <View style={userFields.fields}>
          <View style={userFields.textContainer}>
            <Text style={userFields.usernameLabel}>Username</Text>
            <Text styles={userFields.username}>{user.fullName || ''}</Text>
          </View>

          <View style={userFields.textContainer}>
            <Text style={userFields.emailLabel}>Email</Text>
            <Text styles={userFields.email}>{user.email || ''}</Text>
          </View>

          <View style={switchStyles.switchContainers}>
            <View style={switchStyles.singleSwitch}>
              <Text style={switchStyles.switchText}>Notifications</Text>
              <Switch
                onValueChange={toggleNotification}
                value={notificationToggle}
                trackColor={{ true: '#83CA9E' }}
              />
            </View>

            <View style={switchStyles.singleSwitch}>
              <Text style={switchStyles.switchText}>Location</Text>
              <Switch
                onValueChange={toggleLocation}
                value={locationToggle}
                trackColor={{ true: '#83CA9E' }}
              />
            </View>

            <View>
              <Text style={styles.badges}>Badges</Text>
            </View>

            <View
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
              }}
            >
              <View style={styles.badgeNudgie}>
                <Image
                  style={{ height: 70, width: 70, padding: 5 }}
                  source={require('../public/nudgie2.png')}
                />
              </View>
              <View
                style={{
                  position: 'absolute',
                  width: 38,
                  height: 38,
                  borderRadius: 20,
                  marginLeft: 65,
                  backgroundColor: 'green',
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    color: 'white',
                    marginLeft: 12,
                    marginTop: 10,
                    fontWeight: 'bold',
                  }}
                >
                  {+badgeCount || 0}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.userButtonWrapper}>
          <TouchableOpacity onPress={() => navigate('Edit Profile')}>
            <View style={styles.editButton}>
              <Text style={styles.editProfileText}>Edit Profile</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => dispatch(logOutUser(reset))}>
            <View style={styles.logoutButton}>
              <Text style={styles.logoutText}>Logout</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const buttonStyle = {
  justifyContent: 'center',
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 20,
  borderColor: 'transparent',
  borderWidth: 1,
  elevation: 3,
  backgroundColor: '#EBF6EF',
  shadowColor: '#000000',
  shadowOpacity: 0.3,
  shadowRadius: 2,
  shadowOffset: {
    height: 2,
    width: 2,
  },
  marginTop: 10,
};
// PAGE STYLES
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  userImage: {
    height: 150,
    width: 150,
    borderRadius: 24,
    marginTop: 73,
  },
  badgeNudgie: {
    width: 90,
    height: 90,
    borderColor: '#83CA9E',
    borderRadius: 20,
    borderWidth: 1,
    marginTop: 10,
    padding: 8,
  },
  badgeNumber: {
    margin: 'auto',
  },
  title: {
    marginTop: 20,
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    margin: 5,
  },
  userButtonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    marginBottom: 10,
    padding: 20,
  },
  editButton: {
    ...buttonStyle,
  },
  editProfileText: {
    fontSize: 18,
    color: '#4a7c59',
    fontWeight: 'bold',
  },
  logoutText: {
    fontSize: 18,
    color: '#4a7c59',
    fontWeight: 'bold',
  },
  logoutButton: {
    ...buttonStyle,
  },
  badges: {
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 10,
  },
});

// PREFERENCE STYLES
const switchStyles = StyleSheet.create({
  switchContainers: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    fontSize: 20,
    marginTop: 20,
  },
  switchText: {
    fontSize: 15,
    paddingVertical: 5,
  },
  singleSwitch: {
    justifyContent: 'space-between',
    // backgroundColor: 'gray',
    marginBottom: 5,
    alignItems: 'center',
    flexDirection: 'row',
  },
});

// USER FIELDS styles
const userFields = StyleSheet.create({
  fields: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    fontWeight: 'bold',
    fontSize: 50,
    width: 350,
    padding: 10,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  usernameLabel: {
    fontWeight: 'bold',
    fontSize: 18,
    margin: 5,
    marginLeft: 0,
  },
  emailLabel: {
    fontWeight: 'bold',
    fontSize: 18,
    margin: 5,
    marginLeft: 0,
  },
});
