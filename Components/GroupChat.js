import React, { useState, useEffect, useRef } from 'react';
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
  ScrollView,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { useSelector, useDispatch } from 'react-redux';
import { _createTask } from '../store/task';
import { firebase } from '../config/firebase';
import { Icon } from 'react-native-elements';
import { _addFriend } from '../store/user';
import { _sendMessage } from '../store/chat';
import { fetchGroupChat } from '../store/chat';

import { Dimensions } from 'react-native';

const windowHeight = Number(Dimensions.get('window').height - 250);

const GroupChat = (props) => {
  const [text, onChangeText] = useState('');
  const user = useSelector((state) => state.user);
  const chats = useSelector((state) => state.chat);
  const selectedGroup = useSelector((state) => state.groups.selectedGroup);
  const dispatch = useDispatch();
  const scrollView = useRef();
  // console.log('scrollview', scrollView.current.scrollToEnd)
  const friendType = (name) => {
    return name === user.fullName ? 'me' : 'friend';
  };
  useEffect(() => {

    dispatch(fetchGroupChat(selectedGroup.id));
  }, [dispatch]);

  const onSubmit = async () => {
    dispatch(_sendMessage(selectedGroup.id, text, user.fullName));
    onChangeText('');
  };
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        style={{ padding: 10 }}
      >
        <View style={{ height: windowHeight, display: "flex", flexDirection:"column", justifyContent:"space-between" }}>
        <ScrollView
        ref={scrollView}
        onContentSizeChange={() => scrollView.current.scrollToEnd({ animated: true })}>
          {chats.map((item) => (
            <View key={item.timestamp}>
              <Text style={styles[`${friendType(item.name)}text`]}>
                {item.name}
              </Text>
              <View style={styles[friendType(item.name)]}>
                <Text style={styles.chatMessage}>{item.message}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <TextInput
            style={styles.message}
            onChangeText={onChangeText}
            value={text}
            placeholder=""
          />
          <TouchableOpacity onPress={onSubmit} style={styles.send}>
            <Icon
              color="black"
              type="ionicon"
              name="paper-plane-outline"
              size={20}
            />
          </TouchableOpacity>
        </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
export default GroupChat;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    margin: 5,
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
    textAlign: 'right',
    borderColor: 'transparent',
    borderRadius: 4,
    margin: 5,
    padding: 10,
    width: '80%',
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
    alignSelf: 'flex-end',
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
    alignSelf: 'flex-start',
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
    textAlign: 'right',
    marginRight: 5,
  },
  friendtext: {
    fontSize: 12,
    textAlign: 'left',
    marginRight: 5,
  },
});
