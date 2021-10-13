import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Button,
  View,
  ScrollView,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../store/user';
import { firebase } from '../config/firebase';
import { logOutUser } from '../store/user';

export default function Profile (props) {
  const user = useSelector((state) => state.user);
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const { navigation } = props;
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Image
        style={styles.userImage}
        source={{
          uri: 'https://i.pinimg.com/564x/cc/6b/9e/cc6b9e32841ff7e0914eee93da71057c.jpg',
        }}
      />
      <View style={styles.userButtonWrapper}>
        <Button
          style={styles.editButton}
          onPress={() => navigation.navigate('Edit Profile')}
          title="Edit Profile"
        />
        <Button
          title="Logout"
          style={styles.logoutButton}
          onPress={() =>  dispatch(logOutUser())}
        />
      </View>

      <Text style={styles.username}>Name: {user.fullName || ""}</Text>
      <Text style={styles.useremail}>Email: {user.email || ""}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  userImage: {
    marginTop: 40,
    height: 150,
    width: 150,
    borderRadius: 75,
  },
  username: {
    fontSize: 20,
    marginBottom: 20,
  },
  useremail: {
    fontSize: 20,
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
