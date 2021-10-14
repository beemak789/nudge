import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { firebase } from '../config/firebase';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Button,
  View,
  ScrollView,
  TextInput,
} from 'react-native';
import { fetchUpdatedUser } from '../store/user';
import { TouchableHighlight } from 'react-native-gesture-handler';

const EditProfile = (props) => {
  const { user } = useSelector((state) => state.user);

  const [userData, setUserData] = useState({
    email: user.email || '',
    fullName: user.fullName || '',
    id: user.id || '',
  });

  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Image
        style={styles.userImage}
        source={require('../public/nudgie.png')}
      />

      <View style={styles.username}>
        <Text style={styles.nameLabel}>Name</Text>
        <TextInput
          placeholder="Full Name"
          placeholderTextColor="#666666"
          autoCorrect={false}
          multiline={true}
          value={userData.fullName}
          onChangeText={(txt) => setUserData({ ...userData, fullName: txt })}
        />
      </View>

      <View style={styles.useremail}>
        <Text style={styles.emailLabel}>Email</Text>
        <TextInput
          placeholder="Email"
          placeholderTextColor="#666666"
          autoCorrect={false}
          value={userData.email}
          onChangeText={(txt) => setUserData({ ...userData, email: txt })}
        />
      </View>

      <TouchableOpacity
        style={styles.updateUserButton}
        onPress={() => dispatch(fetchUpdatedUser(userData))}
      >
        <Text style={styles.updateText}>Update</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontSize: 50,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  userImage: {
    height: 120,
    width: 120,
    borderRadius: 24,
    marginTop: 50,
  },
  updateUserButton: {
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 45,
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
  username: {
    display: 'flex',
    padding: 15,
    width: '95%',
    marginTop: 10,
    borderRadius: 10,
    flexDirection: 'row',
    shadowColor: 'black',
    justifyContent: 'space-between',
  },
  useremail: {
    display: 'flex',
    padding: 15,
    width: '95%',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nameLabel: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  emailLabel: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  updateText: {
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold',
  },
});

export default EditProfile;
