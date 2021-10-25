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
      <View style={styles.userButtonWrapper}>
        <TouchableOpacity onPress={() => navigate('Edit Profile')}>
          <View style={styles.logoutButton}>
            <Text style={styles.logoutText}>Edit Profile</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => dispatch(logOutUser(reset))}>
          <View style={styles.logoutButton}>
            <Text style={styles.logoutText}>Logout</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ display: 'flex', alignItems: 'center' }}>
        <View style={styles.imageContent}>
          <Image
            style={styles.nudgie}
            source={require('../public/nudgie2.png')}
          />
        </View>
        <View>
          <Text style={styles.title}>Profile</Text>
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
                trackColor={{ true: '#F59DBF' }}
              />
            </View>

            <View style={switchStyles.singleSwitch}>
              <Text style={switchStyles.switchText}>Location</Text>
              <Switch
                onValueChange={toggleLocation}
                value={locationToggle}
                trackColor={{ true: '#F59DBF' }}
              />
            </View>
            <View>
              <Text style={styles.badges}>Badges</Text>

              <View
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                }}
              >
                <View style={styles.badgeNudgie}>
                  <Image
                    style={styles.nudgie}
                    source={require('../public/nudgie2.png')}
                  />
                </View>
                <View
                  style={{
                    position: 'absolute',
                    width: 38,
                    height: 38,
                    borderRadius: 20,
                    marginLeft: 72,
                    backgroundColor: '#83CA9E',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text
                    style={{
                      fontSize: 15,
                      color: 'black',
                      fontWeight: 'bold',
                      textAlign: 'center',
                    }}
                  >
                    {+badgeCount || 0}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const buttonStyle = {
  justifyContent: 'center',
  paddingVertical: '8%',
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
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  buttonContainer: {
    alignItems: 'flex-end',
    marginRight: 20,
    marginTop: 0,
  },
  imageContent: {
    width: '100%',
    aspectRatio: 10 / 4,
  },

  nudgie: {
    width: '90%',
    height: '90%',
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  badgeNudgie: {
    width: '100%',
    aspectRatio: 1,
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
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    margin: 5,
  },
  userButtonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 2,
    paddingHorizontal: 20,
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
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logoutButton: {
    justifyContent: 'center',
    width: 120,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 20,
    borderColor: 'transparent',
    borderWidth: 1,
    elevation: 3,
    backgroundColor: '#83CA9E',
    shadowColor: '#000000',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 2,
    },
    marginTop: 10,
  },
  button: {
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderColor: 'transparent',
    borderWidth: 1,
    elevation: 3,
    backgroundColor: 'white',

    marginTop: 10,
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
    marginBottom: 5,
    alignItems: 'center',
    flexDirection: 'row',
  },
});

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
