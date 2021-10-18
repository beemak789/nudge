import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';

// Redux
import { LogBox } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/core';
import { signUpUser } from '../store/user';

LogBox.ignoreLogs(['Setting a timer']);

const SignUp = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const location = useSelector((state) => state.location);
  const dispatch = useDispatch();
  const { reset, navigate } = useNavigation();
  const onSubmit = () => {
    if (password !== confirmPassword) {
      alert("Passwords don't match.");
      return;
    }
    dispatch(signUpUser(email, password, first, last, location, reset));
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.imageContent}>
          <Image
            style={styles.nudgie}
            source={require('../public/nudgie2.png')}
          />
          <Text style={styles.title}>nudge</Text>
        </View>
        <ScrollView>
          <View style={styles.box}>
            <TextInput
              style={styles.item}
              placeholder="First Name"
              placeholderTextColor="#003f5c"
              onChangeText={(first) => setFirst(first)}
            />
          </View>

          <View style={styles.box}>
            <TextInput
              style={styles.item}
              placeholder="Last Name"
              placeholderTextColor="#003f5c"
              onChangeText={(last) => setLast(last)}
            />
          </View>

          <View style={styles.box}>
            <TextInput
              style={styles.item}
              placeholder="Email"
              autoCapitalize="none"
              placeholderTextColor="#003f5c"
              onChangeText={(email) => setEmail(email)}
            />
          </View>

          <View style={styles.box}>
            <TextInput
              style={styles.item}
              placeholder="Password"
              autoCapitalize="none"
              placeholderTextColor="#003f5c"
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}
            />
          </View>

          <View style={styles.box}>
            <TextInput
              style={styles.item}
              placeholder="Confirm Password"
              autoCapitalize="none"
              placeholderTextColor="#003f5c"
              secureTextEntry={true}
              onChangeText={(password) => setConfirmPassword(password)}
            />
          </View>
        </ScrollView>
        <TouchableOpacity onPress={onSubmit} style={styles.button}>
          <Text style={styles.loginText}>SIGN UP</Text>
        </TouchableOpacity>
        <Text style={{ marginTop: 20 }}>Existing User?</Text>
        <TouchableOpacity
          onPress={() => navigate('LogIn')}
          style={styles.button}
        >
          <Text style={styles.loginText}>Log In!</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: "center",
  },

  inputView: {
    backgroundColor: '#dde5b6',
    borderRadius: 30,
    width: '70%',
    height: 45,
    marginBottom: 20,
  },
  nudgie: {
    marginTop: 30,
    height: 150,
    width: 150,
    borderRadius: 24,
  },

  avatar: {
    width: 140,
    height: 140,
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    margin: 5,
  },

  box: {
    display: 'flex',
    justifyContent: 'space-between',
    width: 325,
    margin: 10,
    borderRadius: 10,
    backgroundColor: '#EBF6EF',
    flexDirection: 'row',
    shadowColor: 'black',
    alignItems: 'center',
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 1,
      width: -2,
    },
    elevation: 2,
  },
  item: {
    padding: 10,
    fontSize: 18,
    alignSelf: 'center',
    textAlign: 'left',
    width: '90%',
  },
  button: {
    justifyContent: 'center',
    width: 200,
    paddingVertical: 10,
    paddingHorizontal: 20,
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
    margin: 5,
  },
  loginText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 18,
    textAlign: 'center',
  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
});
