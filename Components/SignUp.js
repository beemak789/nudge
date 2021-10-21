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
import { DismissKeyboard } from '../services/dismissKeyboard';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/core';
import { signUpUser } from '../store/user';

LogBox.ignoreLogs(['Setting a timer']);

//Documentation for use Navigation - can "go back"
//https://reactnavigation.org/docs/use-navigation/

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

    if (!first) {
      alert('Please provide a first name.');
      return;
    }

    if (!last) {
      alert('Please provide a last name.');
      return;
    }

    dispatch(signUpUser(email, password, first, last, location, reset));
  };

  return (
    <DismissKeyboard>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView>
            <View style={styles.imageContent}>
              <Image
                style={styles.nudgie}
                source={require('../public/nudgie2.png')}
              />
            </View>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>nudge</Text>
            </View>

            <View style={styles.inputs}>
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
                  secureTextEntry={false}
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
            </View>

            <View style={styles.buttons}>
              <TouchableOpacity onPress={onSubmit} style={styles.button}>
                <Text style={styles.loginText}>SIGN UP</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigate('Log In')}
                style={styles.button}
              >
                <Text style={styles.loginText}>Log In!</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </DismissKeyboard>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContent: {
    alignItems: 'center',
    width: '100%',
    aspectRatio: 10 / 4,
  },

  nudgie: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  titleContainer: {
    width: '100%',
    aspectRatio: 10 / 1,
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  inputs: {
    alignContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    aspectRatio: 10 / 7,
  },
  box: {
    borderRadius: 10,
    width: '90%',
    marginTop: '2%',
    marginBottom: '2%',
    aspectRatio: 10 / 1.1,
    backgroundColor: '#EBF6EF',
    flexDirection: 'row',
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 1,
      width: -2,
    },
    elevation: 2,
  },
  item: {
    padding: '2%',
    fontSize: 18,
    textAlign: 'left',
    width: '90%',
  },
  buttons: {
    alignItems: 'center',
    width: '100%',
    aspectRatio: 10 / 3,
    margin: '2%',
  },
  button: {
    justifyContent: 'center',
    padding: '2%',
    width: '40%',
    borderRadius: 20,
    borderColor: 'transparent',
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
});
