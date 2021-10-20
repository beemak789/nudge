import {
  StyleSheet,
  FlatList,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {
  _deleteTask,
  _fetchAllTasks,
  _updateCompleteStatus,
} from '../store/task';
import { Icon } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { LeftSwipeActions, RightSwipeActions } from '../services/Swipeable';
import { _fetchPlaces } from '../store/places';

const Stateless = (props) => {
  const dispatch = useDispatch();

  const updateCompleteStatus = (item) => {
    dispatch(_updateCompleteStatus(item));
  };
  const deleteTask = (itemId) => {
    dispatch(_deleteTask(itemId));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <View
          style={{
            alignItems: 'flex-start',
            marginRight: 20,
            marginTop: 'auto',
            padding: 5,
          }}
        >
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              props.navigation.toggleDrawer();
            }}
          >
            <Icon
              color="black"
              type="ionicon"
              name="filter-outline"
              size={20}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            alignItems: 'flex-end',
            marginLeft: 'auto',
            marginTop: 'auto',
            padding: 10,
          }}
        >
          <Text style={{ fontSize: 22 }}>{props.title}</Text>
        </View>
      </View>

      <View style={styles.body}>
        <FlatList
          data={props.list}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Swipeable
              renderLeftActions={LeftSwipeActions}
              renderRightActions={RightSwipeActions}
              onSwipeableRightOpen={() => deleteTask(item.id)}
              onSwipeableLeftOpen={() => updateCompleteStatus(item)}
            >
              <TouchableOpacity
                style={styles[`box${item.priority}`]}
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
              </TouchableOpacity>
            </Swipeable>
          )}
        ></FlatList>
      </View>
    </SafeAreaView>
  );
};

export default Stateless;

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
  boxhigh: {
    alignSelf: 'center',
    display: 'flex',
    width: '95%',
    borderRadius: 10,
    backgroundColor: '#588669',
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
