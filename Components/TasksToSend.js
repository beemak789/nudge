import {
  StyleSheet,
  FlatList,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import {
  _deleteTask,
  _fetchAllTasks,
  _updateCompleteStatus,
} from '../store/task';
import { Icon } from 'react-native-elements';
import { _fetchPlaces } from '../store/places';

const TasksToSend = (props) => {
  const tasks = [...props.route.params.incomplete];
  const [tasksToSend, setTasksToSend] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState([]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <View
          style={{
            marginRight: 'auto',
            marginLeft: 10,
          }}
        >
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              props.navigation.navigate('Categories Stack', {
                screen: 'Task List',
              });
            }}
          >
            <Icon color="black" type="antdesign" name="back" size={18} />
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if (!tasksToSend.length) {
                alert('Please select tasks to send!');
                return;
              } else {
                props.navigation.navigate('Send To Group', {
                  tasksToSend,
                  selectedTasks,
                });
              }
            }}
          >
            <Icon color="black" type="feather" name="send" size={18} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.body}>
        <Text style={styles.title}>Select Tasks:</Text>

        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={
                selectedTasks.includes(item.id)
                  ? styles.selectedBox
                  : styles[`box${item.priority}`]
              }
              onPress={() => {
                if (selectedTasks.includes(item.id)) {
                  const filteredSelected = selectedTasks.filter(
                    (taskId) => taskId !== item.id
                  );

                  const filteredTasks = tasksToSend.filter(
                    (task) => task.id !== item.id
                  );
                  setSelectedTasks(filteredSelected);
                  setTasksToSend(filteredTasks);
                } else {
                  setSelectedTasks([...selectedTasks, item.id]);
                  setTasksToSend([...tasksToSend, item]);
                }
              }}
            >
              <View style={styles.info}>
                <Text style={styles.item}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          )}
        ></FlatList>
      </View>
    </SafeAreaView>
  );
};

export default TasksToSend;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  selectedBox: {
    alignSelf: 'center',
    display: 'flex',
    width: '95%',
    borderRadius: 10,
    backgroundColor: '#b9fbc0',
    borderWidth: 1,
    borderColor: '#deff0a',
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
  },
  buttonContainer: {
    alignItems: 'flex-end',
    marginRight: 10,
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
  title: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    margin: 5,
  },
});
