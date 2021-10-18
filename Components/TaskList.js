import {
  StyleSheet,
  FlatList,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  Alert,
  Image,
} from 'react-native';

import React, { useEffect, useState, useRef } from 'react';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import ConfettiCannon from 'react-native-confetti-cannon';
import { useNavigation } from '@react-navigation/core';

import {
  _deleteTask,
  _fetchAllTasks,
  _updateCompleteStatus,
} from '../store/task';
import { useDispatch, useSelector } from 'react-redux';
import { LeftSwipeActions, RightSwipeActions } from '../services/Swipeable';
import { priorityStyle } from '../services/PriorityStyle';
import { _fetchPlaces } from '../store/places';
import { updateBadgeCount } from '../store/user';

const taskList = (props) => {
  const dispatch = useDispatch();
  const { incomplete } = useSelector((state) => state.task);
  const { navigate } = useNavigation();
  const user = useSelector((state) => state.user);
  const badgeCount = useSelector((state) => state.user.badgeCount);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    dispatch(_fetchAllTasks());
  }, []);

  const updateCompleteStatus = (item) => {
    dispatch(_updateCompleteStatus(item, setModalVisible));
  };
  const deleteTask = (itemId) => {
    dispatch(_deleteTask(itemId));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginLeft: 'auto', padding: 5 }}>
        <AntDesign.Button
          name="pluscircle"
          size={30}
          color="#83CA9E"
          backgroundColor="transparent"
          onPress={() => {
            navigate('Add Task');
          }}
        />
      </View>
      {/* COMPLETED TASKS MODAL********** */}
      <Modal animationType="slide" visible={modalVisible} transparent={true}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <MaterialIcons
              style={styles.iconToCloseModal}
              name="close"
              size={24}
              onPress={() => setModalVisible(false)}
            />
            <ConfettiCannon
              count={200}
              origin={{ x: -10, y: 0 }}
              fadeOut={true}
              fallSpeed={2000}
            />
            <Text style={styles.modalText}>
              Nice job, {user.fullName}! You have completed your tasks for the
              day!
            </Text>

            <Text style={styles.modalText}>Tap on me for your badge!</Text>

            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
                dispatch(updateBadgeCount(user));
              }}
            >
              <Image
                style={styles.badgeIcon}
                source={{
                  uri: 'https://i.ebayimg.com/images/g/TP0AAOxydlFS54H~/s-l400.jpg',
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* COMPLETED TASKS MODAL */}

      <View style={styles.body}>
        <FlatList
          data={incomplete}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Swipeable
              renderLeftActions={LeftSwipeActions}
              renderRightActions={RightSwipeActions}
              onSwipeableRightOpen={() => deleteTask(item.id)}
              onSwipeableLeftOpen={() => updateCompleteStatus(item)}
            >
              <TouchableOpacity
                style={styles.box}
                onPress={() => {
                  dispatch(_fetchPlaces(item));
                  props.navigation.navigate('Places Stack');
                }}
                onLongPress={() => {
                  props.navigation.navigate('Edit Stack', {
                    item,
                  });
                }}
              >
                <View style={styles.info}>
                  <Text style={styles.item}>{item.name}</Text>
                </View>
                <View style={priorityStyle(item.priority)}></View>
              </TouchableOpacity>
            </Swipeable>
          )}
        ></FlatList>
      </View>
    </SafeAreaView>
  );
};

export default taskList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: 20,
  },
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  modalContainer: {
    height: '40%',
    width: '80%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 30,
    elevation: 20,
    borderRadius: 20,
  },
  modalText: {
    fontSize: 15,
    marginTop: 20,
    color: 'black',
    fontWeight: 'bold',
    justifyContent: 'center',
  },
  iconToCloseModal: {
    marginLeft: 230,
  },
  badgeIcon: {
    justifyContent: 'center',
    margin: 'auto',
    height: 100,
    width: 100,
    borderRadius: 24,
    marginTop: 20,
    marginLeft: 80,
  },
  item: {
    fontSize: 20,
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    margin: 15,
    backgroundColor: '#FAF3DD',
  },
  box: {
    alignSelf: 'center',
    display: 'flex',
    width: '95%',
    borderRadius: 10,
    backgroundColor: '#EBF6EF',
    flexDirection: 'row',
    shadowColor: 'black',
    alignItems: 'center',
    shadowOpacity: 0.2,
    marginBottom: 10,
    shadowOffset: {
      height: 1,
      width: -2,
    },
    elevation: 2,
  },
  info: {
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 5,
  },
  item: {
    padding: 10,
    fontSize: 18,
    alignSelf: 'center',
    textAlign: 'center',
  },
  priority: {
    marginLeft: 'auto',
    marginBottom: 'auto',
    display: 'flex',
    alignSelf: 'center',
    backgroundColor: 'red',
    width: 25,
    height: 25,
    borderRadius: 4,
    shadowColor: 'black',
    shadowOpacity: 0.1,
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
});
