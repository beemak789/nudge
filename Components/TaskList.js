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
import { Icon } from 'react-native-elements';

import {
  _deleteTask,
  _bulkDeleteTasks,
  _fetchAllTasks,
  _updateCompleteStatus,
} from '../store/task';
import { useDispatch, useSelector } from 'react-redux';
import { LeftSwipeActions, RightSwipeActions } from '../services/Swipeable';
import { OptionsModal } from '../services/Modal';
import { Button } from '../services/Button';
import { _fetchPlaces } from '../store/places';
import { updateBadgeCount } from '../store/user';
import { NoPlaces } from './NoPlaces';

const taskList = (props) => {
  const dispatch = useDispatch();
  const { navigate } = useNavigation();
  const { incomplete } = useSelector((state) => state.task);
  const user = useSelector((state) => state.user);
  const badgeCount = useSelector((state) => state.user.badgeCount);
  const [modalVisible, setModalVisible] = useState(false);
  const [optionsModal, setOptionsModal] = useState(false);
  const [item, setItem] = useState({});
  const [deleteTasksModal, setDeleteTasksModal] = useState(false);
  const groupTasks = useSelector((state) => state.task.selectedGroupTasks);

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
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginLeft: 20,
          marginRight: 20,
        }}
      >
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            props.navigation.toggleDrawer();
          }}
        >
          <Icon color="black" type="ionicon" name="filter-outline" size={20} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            props.navigation.navigate('Add Task');
          }}
        >
          <Icon color="black" type="ionicon" name="pencil-outline" size={20} />
        </TouchableOpacity>
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
        {incomplete.length === 0 && <NoPlaces />}
        <View style={{ margin: 10 }}>
          <FlatList
            data={incomplete}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ListItem
                item={item}
                onRightPress={() => {
                  deleteTask(item.id);
                }}
                onSwipeFromLeft={() => {
                  updateCompleteStatus(item);
                }}
                setItem = {setItem}
                setOptionsModal = {setOptionsModal}
              />
            )}
          ></FlatList>
        </View>
        <OptionsModal isVisible={optionsModal}>
          <OptionsModal.Container>
            {deleteTasksModal ? (
              <>
                <OptionsModal.Header title="Are you sure you would like to delete all tasks?" />
                <OptionsModal.Body>
                  <Text>This action cannot be undone</Text>
                </OptionsModal.Body>

                <OptionsModal.Footer>
                  <Button
                    title="Yes"
                    onPress={() => {
                      const taskIds = incomplete.map((task) => task.id);
                      dispatch(_bulkDeleteTasks(taskIds));
                      setOptionsModal(false);
                      setDeleteTasksModal(false);
                    }}
                  />
                  <Button
                    title="Cancel"
                    onPress={() => {
                      setOptionsModal(false);
                      setDeleteTasksModal(false);
                    }}
                  />
                </OptionsModal.Footer>
              </>
            ) : (
              <>
                <OptionsModal.Header title="Please select a task action below" />

                <OptionsModal.Footer>
                  <Button
                    title="Edit task"
                    onPress={() => {
                      props.navigation.navigate('Edit Stack', {
                        item,
                      });
                      setOptionsModal(false);
                    }}
                  />
                  <Button
                    title="Send to group"
                    onPress={() => {
                      setOptionsModal(false);
                      props.navigation.navigate('Tasks To Send', {
                        incomplete,
                      });
                    }}
                  />
                  <Button
                    title="Delete all"
                    onPress={() => {
                      setDeleteTasksModal(true);
                    }}
                  />
                  <Button
                    title="Cancel"
                    onPress={() => setOptionsModal(false)}
                  />
                </OptionsModal.Footer>
              </>
            )}
          </OptionsModal.Container>
        </OptionsModal>
      </View>
    </SafeAreaView>
  );
};

export default taskList;

// individual list items
const ListItem = ({ onSwipeFromLeft, onRightPress, item, setItem, setOptionsModal }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation()

  return (
    <Swipeable
      renderLeftActions={LeftSwipeActions}
      onSwipeableLeftOpen={onSwipeFromLeft}
      renderRightActions={() => <RightSwipeActions onPress={onRightPress} />}
    >
      <TouchableOpacity
        style={styles[`box${item.priority}`]}
        onPress={() => {
          dispatch(_fetchPlaces(item));
          navigation.navigate('Places Stack');
        }}
        onLongPress={() => {
          setItem(item);
          setOptionsModal(true);
        }}
      >
        <View style={styles.info}>
          <Text style={styles.item}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'space-evenly',
    // padding: 20,
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
  body: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  image: {
    width: 80,
    height: 80,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    margin: 15,
    backgroundColor: '#FAF3DD',
  },
  boxhigh: {
    alignSelf: 'center',
    display: 'flex',
    width: '95%',
    borderRadius: 10,
    backgroundColor: '#F59DBF',
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
  boxmedium: {
    alignSelf: 'center',
    display: 'flex',
    width: '95%',
    borderRadius: 10,
    backgroundColor: '#83CA9E',
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
  boxlow: {
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
