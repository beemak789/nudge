import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  FlatList,
  SafeAreaView,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Modal,
} from 'react-native';
import { Text, Divider } from 'react-native-elements';
import * as Linking from 'expo-linking';

import { useDispatch, useSelector } from 'react-redux';
import { _deleteTask, _updateCompleteStatus } from '../store/task';
import { _fetchPlaces, clearPlaces, _setOptimize } from '../store/places';

import { ReviewStars } from '../services/StarRating';
import { Icon } from 'react-native-elements';
import { NoPlaces } from './NoPlaces';

const PlacesList = (props) => {
  const dispatch = useDispatch();
  const { places } = useSelector((state) => state.place);
  const { incomplete, currTask = {} } = useSelector((state) => state.task);
  const location = useSelector((state) => state.location);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (!currTask.id) {
      dispatch(clearPlaces());
    }
  }, [currTask.id]);

  if (!places.length && currTask.id) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const generateLink = (item) => {
    const name = item.name.replace(/\s/g, '+');

    const mapsLink = `https://www.google.com/maps?saddr=My+Location&daddr=${name}`;
    Linking.openURL(mapsLink);
  };

  const returnDistance = (item) => {
    const currLat = location.coords.latitude;
    const currLng = location.coords.longitude;
    const storeLat = item.marker.latitude;
    const storeLng = item.marker.longitude;

    function deg2rad(deg) {
      return deg * (Math.PI / 180);
    }

    function getDistance(lat1, lon1, lat2, lon2) {
      var R = 6371; // Radius of the earth in km
      var dLat = deg2rad(lat2 - lat1); // deg2rad above
      var dLon = deg2rad(lon2 - lon1);
      var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) *
          Math.cos(deg2rad(lat2)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var d = R * c * 1000; // Distance in m
      return d;
    }

    const distance =
      getDistance(currLat, currLng, storeLat, storeLng) * 0.000621;
    return distance.toFixed(2);
  };

  return (
    <SafeAreaView style={styles.container}>
      {incomplete.length === 0 && (
        <>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              marginLeft: 20,
              marginRight: 20,
            }}
          >
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                props.navigation.navigate('Add Task');
              }}
            >
              <Icon
                color="black"
                type="ionicon"
                name="pencil-outline"
                size={20}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.body}>
            <NoPlaces />
          </View>
        </>
      )}
      {!places.length && incomplete.length > 0 && (
        <TouchableOpacity
          style={styles.optimizeSmall}
          onPress={() => {
            dispatch(
              _setOptimize(incomplete, {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              })
            );
            props.navigation.navigate('Optimized Places');
          }}
        >
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Optimize</Text>
            <Icon
              color="black"
              type="ionicon"
              name="shuffle-outline"
              size={24}
            />
          </View>
        </TouchableOpacity>
      )}

      {places.length > 0 && (
        <View style={styles.body}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: 10,
              justifyContent: 'space-evenly',
            }}
          >
            <Text style={{ fontSize: 16 }}>
              Stores near you that may carry:
            </Text>
            <View>
              <View
                style={{
                  borderWidth: 1,
                  borderRadius: 4,
                  borderColor: 'transparent',
                  alignSelf: 'center',
                  backgroundColor: '#83CA9E',
                  marginTop: 10,
                }}
              >
                <Text style={styles.item}>{currTask.name}</Text>
              </View>
            </View>
          </View>

          <FlatList
            data={places}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{ margin: 5, marginBottom: 0 }}
                onPress={() => {
                  Alert.alert(
                    'Map Alert',
                    'Would you like to be taken to Google Maps?',
                    [
                      {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                      },
                      { text: 'OK', onPress: () => generateLink(item) },
                    ]
                  );
                }}
              >
                <View style={{ borderWidth: 1, borderColor: 'transparent' }}>
                  <View style={styles.rowDirection}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        justifyContent: 'flex-start',
                      }}
                    >
                      {item.name}
                    </Text>
                    <Text syle={{ justifyContent: 'center' }}>
                      {item.marker && location.coords
                        ? `${returnDistance(item)} miles`
                        : null}
                    </Text>
                  </View>
                  <View style={styles.rowDirection}>
                    {item.rating ? (
                      <View>
                        <View style={styles.startReviewsContainer}>
                          <ReviewStars stars={item.rating} />
                          <Text style={styles.rating}>
                            {item.rating.toFixed(1)}
                          </Text>
                        </View>
                        <View>
                          <Text>{item.vicinity}</Text>
                        </View>
                      </View>
                    ) : null}
                  </View>
                  <Divider orientation="horizontal" />
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id.toString()}
          />
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <TouchableOpacity
              style={styles.newTask}
              onPress={() => {
                dispatch(
                  _setOptimize(incomplete, {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                  })
                );
                props.navigation.navigate('Optimized Places');
              }}
            >
              <View style={{ display: 'flex', flexDirection: 'row' }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                  Optimize
                </Text>
                <Icon
                  color="black"
                  type="ionicon"
                  name="shuffle-outline"
                  size={24}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() => {
                setModalVisible(true);
              }}
            >
              <Icon color="black" type="ionicon" name="help-circle-outline" />
            </TouchableOpacity>
          </View>
          <Modal animationType="none" visible={modalVisible} transparent={true}>
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <View
                style={{
                  width: 200,
                  height: 160,
                  backgroundColor: 'white',
                  display: 'flex',
                  flexDirection: 'column',
                  borderColor: '#F59DBF',
                  borderRadius: 10,
                  borderWidth: 2,
                }}
              >
                <View style={{ alignSelf: 'flex-end' }}>
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible(false);
                    }}
                  >
                    <Icon
                      color="#F59DBF"
                      type="ionicon"
                      name="close-circle-outline"
                    />
                  </TouchableOpacity>
                </View>
                <Text style={{ margin: 5, textAlign: 'left' }}>
                  Optimize will give you a list of places prioritized by: {'\n'}
                  - location, {'\n'}- rating, and {'\n'}- # of tasks that may be
                  completed there.{' '}
                </Text>
              </View>
            </View>
          </Modal>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  body: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  rowDirection: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 5,
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
    marginLeft: 5,
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
    padding: 5,
    fontSize: 18,
    alignSelf: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    maxWidth: 125,
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
  newTask: {
    flex: 9,
    borderColor: 'transparent',
    borderWidth: 1,
    borderRadius: 25,
    margin: 10,
    padding: 5,
    backgroundColor: '#F59DBF',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 1,
      width: -2,
    },
    elevation: 2,
  },
  optimizeSmall: {
    borderColor: 'transparent',
    borderWidth: 1,
    borderRadius: 25,
    margin: 10,
    padding: 5,
    backgroundColor: '#F59DBF',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 1,
      width: -2,
    },
    elevation: 2,
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
});

export default PlacesList;
