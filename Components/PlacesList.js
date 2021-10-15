import React from 'react';
import {
  StyleSheet,
  FlatList,
  SafeAreaView,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { ListItem, Text, Avatar, Divider } from 'react-native-elements';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import * as Linking from 'expo-linking';

import { useDispatch, useSelector } from 'react-redux';
import { _deleteTask, _updateCompleteStatus } from '../store/task';
import { _fetchPlaces, clearPlaces } from '../store/places';

import { ReviewStars } from '../services/StarRating';
import { priorityStyle } from '../services/PriorityStyle';
import { LeftSwipeActions, RightSwipeActions } from '../services/Swipeable';

const PlacesList = (props) => {
  const dispatch = useDispatch();
  const { places, status } = useSelector((state) => state.place);
  const { currTask, tasks } = useSelector((state) => state.task);

  const updateCompleteStatus = (item) => {
    dispatch(_updateCompleteStatus(item));
    dispatch(clearPlaces());
  };
  const deleteTask = (itemId) => {
    dispatch(_deleteTask(itemId));
    dispatch(clearPlaces());
  };

  if (!tasks.length) {
    return (
      <SafeAreaView style={styles.container2}>
        <View>
          <Text>You have no tasks!</Text>
        </View>
      </SafeAreaView>
    );
  } else if (!places.length && !currTask.id) {
    return (
      <SafeAreaView style={styles.container2}>
        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => dispatch(_fetchPlaces())}
          >
            <Image
              style={styles.nudgie}
              source={require('../public/nudgie2.png')}
            />
            <Text style={styles.buttonText}>Press to complete a task!</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  } else if (!places.length && status.length && currTask.id) {
    return (
      <SafeAreaView style={styles.container2}>
        <View>
          <Text>{status}</Text>
          <Swipeable
            renderLeftActions={LeftSwipeActions}
            renderRightActions={RightSwipeActions}
            onSwipeableRightOpen={() => deleteTask(currTask.id)}
            onSwipeableLeftOpen={() => updateCompleteStatus(currTask)}
          >
            <View style={styles.box}>
              <View style={styles.info}>
                <Text style={styles.item}>{currTask.name}</Text>
              </View>
              <View style={priorityStyle(currTask.priority)}></View>
            </View>
          </Swipeable>
          <TouchableOpacity
            style={styles.button}
            onPress={() => dispatch(_fetchPlaces())}
          >
            <Image
              style={styles.nudgie}
              source={require('../public/nudgie2.png')}
            />

            <Text style={styles.buttonText}>Complete a different task?</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const generateLink = (item) => {
    const name = item.name.replace(/\s/g, '+');

    const mapsLink = `https://www.google.com/maps?saddr=My+Location&daddr=${name}`;
    Linking.openURL(mapsLink);
  };

  const getImage = (lat, long) => {
    //   return `http://www.panoramio.com/map/get_panoramas.php?set=public&from=0&to=20&minx=${lat}&miny=${long}&maxx=${lat}&maxy=${long}&size=medium&mapfilter=true`;
  };
  return (
    <SafeAreaView style={styles.container2}>
      {places.length <= 0 && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" />
        </View>
      )}
      {places.length > 0 && (
        <>
          <TouchableOpacity
            style={styles.button}
            onPress={() => dispatch(_fetchPlaces())}
          >
            <Image
              style={styles.nudgie}
              source={require('../public/nudgie2.png')}
            />
            <Text style={styles.buttonText}>
              Press to complete another task!
            </Text>
          </TouchableOpacity>
          <Swipeable
            renderLeftActions={LeftSwipeActions}
            renderRightActions={RightSwipeActions}
            onSwipeableRightOpen={() => deleteTask(currTask.id)}
            onSwipeableLeftOpen={() => updateCompleteStatus(currTask)}
          >
            <View style={styles.box}>
              <View style={styles.info}>
                <Text style={styles.item}>{currTask.name}</Text>
              </View>
              <View style={priorityStyle(currTask.priority)}></View>
            </View>
          </Swipeable>
          <FlatList
            data={places}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => generateLink(item)}>
                <ListItem chevron={{ color: '#e90000', size: 30 }}>
                  <Avatar
                    title={item.name}
                    rounded={false}
                    size={'large'}
                    source={
                      item.marker && {
                        uri: getImage(
                          item.marker.latitude,
                          item.marker.longitude
                        ),
                      }
                    }
                    containerStyle={{ marginLeft: 20 }}
                  />
                  <ListItem.Content>
                    <ListItem.Title>
                      <View style={styles.rowDirection}>
                        <Text>{item.name}</Text>
                        <Text>distance</Text>
                      </View>
                    </ListItem.Title>
                    <ListItem.Subtitle>
                      {item.rating && (
                        <View>
                          <View style={styles.startReviewsContainer}>
                            <ReviewStars stars={item.rating} />
                            <Text style={styles.rarting}>
                              {item.rating.toFixed(1)}
                            </Text>
                          </View>
                          <View>
                            <Text>{item.vicinity}</Text>
                          </View>
                        </View>
                      )}
                    </ListItem.Subtitle>
                  </ListItem.Content>
                </ListItem>
                <Divider orientation="horizontal" />
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  container2: {
    flex: 1,
    justifyContent: 'center',
  },
  menuTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#575757',
    marginLeft: 20,
    marginTop: 10,
  },
  mapView: {
    flex: 1,
    justifyContent: 'center',
  },
  restaurantList: {
    flex: 1,
    justifyContent: 'center',
  },
  chevron: {
    color: '#e90000',
  },
  rowDirection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  startReviewsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  rating: {
    marginLeft: 'auto',
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
    shadowOffset: {
      height: 1,
      width: -2,
    },
    elevation: 2,
  },
  info: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
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
  noTasksText: {
    fontWeight: '700',
    fontSize: 20,
  },
});

export default PlacesList;
