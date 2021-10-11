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

const EditProfile = (props) => {
  const user = useSelector((state) => state.user);

  const [userData, setUserData] = useState({
    email: user.email || "",
    fullName: user.fullName || "",
    id: user.id || ""
  });

  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <View style={styles.username}>
        <Text>Name: </Text>
        <TextInput
          placeholder="Full Name"
          placeholderTextColor="#666666"
          autoCorrect={false}
          value={userData.fullName}
          onChangeText={(txt) => setUserData({ ...userData, fullName: txt })}
        />
      </View>

      <View style={styles.useremail}>
        <Text>Email: </Text>
        <TextInput
          placeholder="Email"
          placeholderTextColor="#666666"
          autoCorrect={false}
          value={userData.email}
          onChangeText={(txt) => setUserData({ ...userData, email: txt })}
        />
      </View>

      <Button
        style={styles.updateUserButton}
        title="Update"
        onPress={() => dispatch(fetchUpdatedUser(userData))}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    fontSize: 50,
    justifyContent: "center"
  },
  updateUserButton: {
    marginRight: 10,
    borderColor: '#2e64e5',
    borderWidth: 2,
    borderRadius: 3,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginHorizontal: 5,
  },
  username: {
    marginTop: 20,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  useremail: {
    fontSize: 20,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default EditProfile;
