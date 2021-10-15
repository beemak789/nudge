import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import { connect } from "react-redux";
import { firebase } from "../config/firebase";
import { getDatabase } from "firebase/database";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from "react-redux"
import { logInUser } from "../store/user"

const LogIn = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch()
  const onSubmit = () => {
    dispatch(logInUser(email, password))
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContent}>
        <Image
          style={styles.nudgie}
          source={require('../public/nudgie2.png')}
        />
        <Text style={styles.title}>nudge</Text>
      </View>

      <View style={styles.box}>
        <TextInput
          style={styles.item}
          placeholder="Email"
          placeholderTextColor="#003f5c"
          autoCapitalize="none"
          onChangeText={(email) => setEmail(email)}
        />
      </View>

      <View style={styles.box}>
        <TextInput
          style={styles.item}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          autoCapitalize="none"
          onChangeText={(password) => setPassword(password)}
        />
      </View>


      <TouchableOpacity onPress={onSubmit} style={styles.button}>
        <Text style={styles.loginText}>LOG IN</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity>
        <Text style={styles.forgot_button}>Forgot Password?</Text>
      </TouchableOpacity> */}

      <Text style= {{marginTop: 20}}>New User?</Text>
      <TouchableOpacity
        onPress={() => props.navigation.navigate("Sign Up")}
        style={styles.button}
      >
        <Text style={styles.loginText}>Sign Up!</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};


export default LogIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    // justifyContent: "center",
  },

  inputView: {
    backgroundColor: "#dde5b6",
    borderRadius: 30,
    width: "70%",
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
    justifyContent: "space-between",
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
    width: "90%",
  },
  button: {
    justifyContent: 'center',
    width: 200,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderColor: "transparent",
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
    color: "white",
    fontWeight: "700",
    fontSize: 18,
    textAlign: 'center',
  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
});
