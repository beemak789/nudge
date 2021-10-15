import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  Image,
  Button,
  FlatList,
} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { useSelector, useDispatch } from 'react-redux';
import { selectGroup } from '../store/group';
import { Icon } from 'react-native-elements'
import { LeftSwipeActions, RightSwipeActions } from '../services/Swipeable';

// _______SEND NOTIFICATION ________NOT TESTED
// async function sendPushNotification(group, from) {
//   console.log(group)
//   group.members.forEach(async (member) => {
//     const message = {
//       to: member.token,
//       sound: 'default',
//       title: `Nudge from ${from}`,
//       body: `${from} is at the grocery store! Do you need anything?`,
//       data: { someData: 'goes here' },
//     };

//     await fetch('https://exp.host/--/api/v2/push/send', {
//       method: 'POST',
//       headers: {
//         Accept: 'application/json',
//         'Accept-encoding': 'gzip, deflate',
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(message),
//     });
//   })
// }

const SingleGroup = (props) => {
  const dispatch = useDispatch();
  const group = useSelector((state) => state.selectedGroup);
  const user = useSelector((state) => state.user);
  return (
    <Swipeable
      renderRightActions={RightSwipeActions}
      onSwipeableRightOpen={() => deleteGroup(props.group.id)}
    >
      <View style={styles.box}>
      <Icon style={{marginLeft: 5, marginRight: 50}} color="black" type="ionicon" name="notifications-outline" size={20} />
        {/* <Image
                style={styles.image}
                source={require('../public/nudgie2.png')}
              /> */}
      <View style={styles.info}>
        <TouchableOpacity
          onPress={() => {
            dispatch(selectGroup(props.group.id));
            props.navigation.navigate('Group List');
          }}
        >
          <Text style={styles.buttonText}>{props.group.name}</Text>
        </TouchableOpacity>

      </View>
      <Icon style={{marginRight: 5, marginLeft: 50}}color="black" type="ionicon" name="trash-outline" size={22} />
        {/* <Button
                style={styles.completedButton}
                title="Send Alert"
                onPress={() => {
                // await sendPushNotification(props.group.id, user.fullName)
                console.log('pressed sent')
            }}>
              </Button> */}
      </View>
    </Swipeable>
  );
};

export default SingleGroup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'space-evenly',
    // padding: 20,
  },
  completedButton: {
    marginRight: 10,
    borderColor: '#2e64e5',
    borderWidth: 2,
    borderRadius: 3,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginHorizontal: 5,
    alignContent: 'flex-end',
  },
  item: {
    fontSize: 20,
  },
  box: {
    display: 'flex',
    // width: 250,
    alignItems: "baseline",
    margin: 10,
    borderRadius: 10,
    backgroundColor: '#EBF6EF',
    flexDirection: 'row',
    justifyContent:"space-between",
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 1,
      width: -2,
    },
    elevation: 2,
  },
  info: {
    marginLeft: 15,
    padding: 5,
  },
  item: {
    padding: 10,
    fontSize: 18,
    alignSelf: 'center',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#EBF6EF',
    padding: 5,
    borderRadius: 25,
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: '#FFFFFF',
    margin: 5,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 1,
      width: -2,
    },
    elevation: 2,
  },
  buttonText: {
    color: '#4a7c59',
    fontWeight: '700',
    fontSize: 22,
  },
  nudgie: {
    width: 50,
    height: 50,
    backgroundColor: 'transparent',
    margin: 5,
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    margin: 5,
  },
});
