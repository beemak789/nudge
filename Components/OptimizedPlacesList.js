import React from 'react';
import {
  StyleSheet,
  FlatList,
  SafeAreaView,
  View,
  TouchableOpacity,
} from 'react-native';
import { Text, Divider } from 'react-native-elements';
import * as Linking from 'expo-linking';
import MapView, { Marker } from 'react-native-maps';
import { useSelector } from 'react-redux';
import { _deleteTask, _updateCompleteStatus } from '../store/task';
import { _fetchPlaces, _setOptimize } from '../store/places';
import { ReviewStars } from '../services/StarRating';

const LONG_DELTA = 0.0922;
const LAT_DELTA = 0.0421;

const PlacesList = (props) => {
  const { optimize } = useSelector((state) => state.place);
  const location = useSelector((state) => state.location);

  const generateLink = (item) => {
    let url = `${location.coords.latitude},${location.coords.longitude}`;
    for (let i = 0; i < optimize.length; i++) {
      url += `/${optimize[i].marker.latitude},${optimize[i].marker.longitude}`;
    }
    const name = item.name.replace(/\s/g, '+');

    const mapsLink = `https://www.google.com/maps/dir/${url}`;
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
      <View
        style={{
          marginRight: 'auto',
          marginLeft: 10,
        }}
      >
        <TouchableOpacity
          style={styles.save}
          onPress={() => {
            props.navigation.navigate('Display Places Stack', {
              screen: 'Places List',
            });
          }}
        >
          <Text style={styles.saveText}>Back</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Optimized Places</Text>
      <View style={styles.body}>
        <FlatList
          data={optimize}
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
      </View>
      <MapView
        style={{ flex: 1, margin: 15 }}
        region={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: LONG_DELTA,
          longitudeDelta: LAT_DELTA,
        }}
      >
        <Marker
          title="Me"
          coordinate={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }}
        />
        {optimize.map((place) => {
          return (
            <Marker
              title={`${place.name}`}
              key={place.id}
              coordinate={{
                latitude: place.marker.latitude,
                longitude: place.marker.longitude,
              }}
              pinColor={'green'}
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
                    { text: 'OK', onPress: () => generateLink(place) },
                  ]
                );
              }}
            />
          );
        })}
      </MapView>
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
  save: {
    justifyContent: 'center',
    width: 80,
    paddingVertical: 10,
    paddingHorizontal: 10,
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
  saveText: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  title: {
    marginTop: 10,
    fontSize: 20,
    textAlign: 'center',
  },
});

export default PlacesList;
