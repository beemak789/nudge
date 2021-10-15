import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  Button,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  View,
  Image,
  FlatList,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { _createTask } from '../store/task';
import { firebase } from '../config/firebase';
import { Icon } from 'react-native-elements';
import { _addFriend } from '../store/user';


const chats = [
  { message: 'hello!', timestamp: '1', from: 'me' },
  { message: 'how are you', timestamp: '2', from: 'friend' },
  { message: 'need anything?', timestamp: '3', from: 'me'  },
  { message: 'yes bread', timestamp: '4', from: 'friend'},
];

const GroupChat = (props) => {
  const [text, onChangeText] = useState('');
  const [friends, friendsList] = useState();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const tasklistRef = useRef(null)

  const onChangeSearch = async () => {
    friendsList();
    const lowerText = text.toLowerCase();
    const query = await firebase
      .firestore()
      .collection('users')
      .where('email', '==', lowerText)
      .get()
      .then((snapshot) => {
        if (snapshot.doc === undefined) {
          friendsList({ error: 'No one by this email' });
        }
        snapshot.forEach((doc) => {
          friendsList(doc.data());
        });
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ alignItems: 'right', marginLeft: 20, marginTop: 20 }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            props.navigation.navigate('Group List');
          }}
        >
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
      </View>
      <KeyboardAvoidingView style={{ alignItems: 'center'}} behavior="position">
        <View style={{ marginBottom: 30, display: "flex", flexDirection: "column" }}>
          <View style={{width: 350}}>
            <Text style={styles.title}>Chat</Text>
            <FlatList
              ref = {tasklistRef}
              data={chats}
              keyExtractor={(item) => item.timestamp}
              renderItem={( {item} ) => (
                <View>
                <Text style = {styles[`${item.from}text`]}>{item.from}</Text>
                <View style={styles[item.from]}>
                  <Text style = {styles.chatMessage}>{item.message}</Text>
                </View>
                </View>
              )}
              onContentSizeChange={() => tasklistRef.current.scrollToEnd() }
              onLayout={() => tasklistRef.current.scrollToEnd() }
              ></FlatList>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'flex-end',
              justifyContent: "flex-end",
            }}
            >
            <TextInput
              style={styles.message}
              onChangeText={(value) => {
                friendsList('');
                onChangeText(value);
              }}
              value={text}
              placeholder=""
            />
            <TouchableOpacity onPress={onChangeSearch} style={styles.send}>
              <Icon
                color="black"
                type="ionicon"
                name="paper-plane-outline"
                size={20}
              />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default GroupChat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    margin: 5,
  },
  nudgie: {
    height: 150,
    width: 150,
    borderRadius: 24,
  },
  send: {
    margin: 5,
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 20,
    borderColor: 'transparent',
    borderWidth: 1,
    backgroundColor: '#83CA9E',
  },
  message: {
    fontSize: 20,
    borderWidth: 1,
    textAlign: 'center',
    borderColor: 'transparent',
    borderRadius: 4,
    margin: 5,
    padding: 10,
    width: 290,
    backgroundColor: '#EBF6EF',
    shadowColor: '#000000',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    shadowOffset: {
      height: 3,
      width: 3,
    },
  },
  button: {
    justifyContent: 'center',
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
    marginTop: 10,
  },
  me: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: 200,
    margin: 5,
    borderRadius: 10,
    backgroundColor: '#83CA9E',
    flexDirection: 'row',
    alignSelf: "flex-end",
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 1,
      width: -2,
    },
    elevation: 2,
  },
  friend: {
    display: 'flex',
    justifyContent: 'flex-start',
    width: 200,
    margin: 5,
    borderRadius: 10,
    backgroundColor: '#EBF6EF',
    alignSelf: "flex-start",
    flexDirection: 'row',
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 1,
      width: -2,
    },
    elevation: 2,
  },
  chatMessage: {
    padding: 10,
    fontSize: 18,
    alignSelf: 'center',
    textAlign: 'center',
  },
  metext: {
    fontSize: 12,
    textAlign:"right",
    marginRight: 5,
  },
  friendtext: {
    fontSize: 12,
    textAlign:"left",
    marginRight: 5,
  }
});
