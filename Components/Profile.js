import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Button,
  View,
  Switch,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../store/user';
import { firebase } from '../config/firebase';
import { logOutUser } from '../store/user';

export default function Profile(props) {
  const user = useSelector((state) => state.user);
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const { navigation } = props;
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((isEnabled) => !isEnabled);

  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Image
        style={styles.userImage}
        source={require('../public/nudgie.png')}
      />
      <View>
        <Text style={styles.title}>My Profile</Text>
      </View>

      <View style={styles.fields}>
        <Text style={styles.usernameField}>
          Username ---> <Text styles={styles.username}>{user.fullName || ""}</Text>
        </Text>

        <Text style={styles.emailField}>
          Email--->       <Text style={styles.email}>{user.email || ""}</Text>
        </Text>

        <View style={styles.switchContainers}>
          <Text style={styles.switchText}>Notifications</Text>
          <View style={styles.notificationSwitch}>
            <Switch
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>

          <View>
            <Text style={styles.switchText}>Location</Text>
            <Switch
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
          <Text>BADGE SYSTEM GOES HERE</Text>
        </View>
      </View>


      <View style={styles.userButtonWrapper}>
        <Button
          style={styles.editButton}
          onPress={() => navigation.navigate('Edit Profile')}
          title="Edit Profile"
        />
        <Button
          title="Logout"
          style={styles.logoutButton}
          onPress={() => dispatch(logOutUser())}
        />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  userImage: {
    height: 120,
    width: 120,
    borderRadius: 24,
    marginTop: 60,
  },
  title: {
    marginTop: 20,
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    margin: 5,
  },
  fields: {
    flex: 2,
    flexDirection: 'column',
    fontWeight: 'bold',
    fontSize: 50,
    // backgroundColor: "grey",
    width: '100%',
    marginHorizontal: 100,
    padding: 10,
  },
  usernameField: {
    marginTop: 30,
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
  },
  username: {
    marginLeft: 80,
    fontSize: 20,
  },
  emailField: {
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
  },
  email: {
    fontSize: 20,
  },
  switchContainers: {
    fontSize: 20,
  },
  notificationSwitch: {
    flex: 1,
  },
  switchText: {
    fontSize: 15,
    marginTop: 15,
  },
  userButtonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    marginTop: 20,
    marginBottom: 10,
    padding: 20,
  },
  editButton: {
    marginRight: 10,
    borderColor: '#2e64e5',
    borderWidth: 2,
    borderRadius: 3,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginHorizontal: 5,
  },
  userButtonText: {
    color: '#2e64e5',
  },
  logoutButton: {
    borderColor: '#2e64e5',
    borderWidth: 2,
    borderRadius: 3,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
  },
});
