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
          style={styles.avatar}
          source={{
            uri:
              "https://i.fbcd.co/products/resized/resized-750-500/f2177c99d17188c13fa062882305de8a3a836804c7037e8c43f5bfa28f227bf8.jpg",
          }}
        />
        <Text style={styles.headerText}>Name of App</Text>
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email"
          placeholderTextColor="#003f5c"
          autoCapitalize="none"
          onChangeText={(email) => setEmail(email)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          autoCapitalize="none"
          onChangeText={(password) => setPassword(password)}
        />
      </View>

      <TouchableOpacity>
        <Text style={styles.forgot_button}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onSubmit} style={styles.loginBtn}>
        <Text style={styles.loginText}>LOG IN</Text>
      </TouchableOpacity>

      <Text>New User?</Text>
      <TouchableOpacity
        onPress={() => props.navigation.navigate("Sign Up")}
        style={styles.loginBtn}
      >
        <Text style={styles.loginText}>Sign Up!</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

// const mapState = state => {
//   return {

//   };
// };

// const mapDispatch = (dispatch, {newJWT}) => {
//   return {

//   };
// };

export default LogIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  inputView: {
    backgroundColor: "#dde5b6",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
  },
  imageContent: {
    padding: 10,
    alignItems: "center",
    marginBottom: 30,
  },

  avatar: {
    width: 140,
    height: 140,
  },
  headerText: {
    fontWeight: "700",
    fontSize: 40,
    alignSelf: "center",
    fontFamily: "Helvetica-Bold",
    marginTop: 30,
    color: "#264653",
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
    alignItems: "center",
  },

  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#709775",
  },
  loginText: {
    color: "white",
    fontWeight: "700",
    fontSize: 18,
  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
});
