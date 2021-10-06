import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";

// Redux
import { connect } from "react-redux";

const SignUp = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");

  const onSubmit = () => {
    console.log("email, password, first, last", email, password, first, last);
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
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="First Name"
          placeholderTextColor="#003f5c"
          onChangeText={(first) => setFirst(first)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Last Name"
          placeholderTextColor="#003f5c"
          onChangeText={(last) => setLast(last)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email"
          autoCapitalize="none"
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          autoCapitalize="none"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>

      <Text>upload an image</Text>

      <TouchableOpacity onPress={onSubmit} style={styles.loginBtn}>
        <Text style={styles.loginText}>SIGN UP</Text>
      </TouchableOpacity>
      <Text>Existing User?</Text>
      <TouchableOpacity
        onPress={() => props.navigation.navigate("Log In")}
        style={styles.loginBtn}
      >
        <Text style={styles.loginText}>Log In!</Text>
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
//
//   };
// };

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    marginBottom: 40,
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
