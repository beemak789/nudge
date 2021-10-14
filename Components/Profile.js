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
import { Badge } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { logOutUser } from '../store/user';

export default function Profile(props) {
  const user = useSelector((state) => state.user);
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const { navigation } = props;
  const [isEnabled, setEnabled] = useState(false);
  const toggleSwitch = () => setEnabled((isEnabled) => !isEnabled);


  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
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
            <Switch onValueChange={toggleSwitch} value={isEnabled} />
          </View>

          <View style={switchStyles.singleSwitch}>
            <Text style={switchStyles.switchText}>Location</Text>
            <Switch onValueChange={toggleSwitch} value={isEnabled} />
          </View>

          <View>
            <Text style={styles.badges}>Badges</Text>
          </View>

          <View>
            <Badge style={styles.badgeNumber}>1</Badge>
            <Image
              style={styles.badgeNudgie}
              source={require('../public/nudgie2.png')}
            />
          </View>
        </View>
      </View>

      <View style={styles.userButtonWrapper}>
        <TouchableOpacity onPress={() => navigation.navigate('Edit Profile')}>
          <View style={styles.editButton}>
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => dispatch(logOutUser())}>
          <View style={styles.logoutButton}>
            <Text style={styles.logoutText}>Logout</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const buttonStyle = {
  marginRight: 10,
  backgroundColor: '#83CA9E',
  borderRadius: 8,
  paddingVertical: 15,
  paddingHorizontal: 12,
  marginHorizontal: 5,
  justifyContent: 'center',
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
    height: 120,
    width: 120,
    borderRadius: 24,
    marginTop: 60,
  },
  badgeNudgie: {
    height: 40,
    width: 40,
    marginTop: 10,
    marginLeft: 10,
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
    color: 'black',
    fontWeight: 'bold',
  },
  logoutText: {
    fontSize: 18,
    color: 'black',
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
    marginTop: 15,
  },
  singleSwitch: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
});

// USER FIELDS styles
const userFields = StyleSheet.create({
  fields: {
    flex: 1,
    flexDirection: 'column',
    fontWeight: 'bold',
    fontSize: 50,
    // backgroundColor: "grey",
    width: '100%',
    marginLeft: 30,
    marginRight: 30,
    padding: 10,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  usernameLabel: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
  },
  username: {
    fontSize: 20,
  },
  emailLabel: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
  },
  email: {
    fontSize: 40,
  },
});
