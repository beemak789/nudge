import { TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import MapView, { Marker, AnimatedRegion } from 'react-native-maps';
import * as Location from 'expo-location';


const LATITUDE = 40.678178;
const LONGITUDE = -73.944158;
const LONG_DELTA = 0.0922;
const LAT_DELTA = 0.0421;

const initialRegion = {
  latitude: LATITUDE,
  longitude: LONGITUDE,
  latitudeDelta: LONG_DELTA,
  longitudeDelta: LAT_DELTA,
};

const Map = (props) => {
  const [location, setLocation] = useState(initialRegion);
  const [errorMsg, setErrorMsg] = useState(null);
  const { places } = useSelector((state) => state.place);


  // const generateLink = (item) => {
  //   const name = item.name.replace(/\s/g, '+');

  //   const mapsLink = `https://www.google.com/maps?saddr=My+Location&daddr=${name}`;
  //   Linking.openURL(mapsLink);
  // };

  const getInitialPosition = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
        return;
      }

      const gps = await Location.getCurrentPositionAsync({});

      setLocation({
        ...location,
        latitude: gps.coords.latitude,
        longitude: gps.coords.longitude,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getInitialPosition();
  }, []);

  return (
    <MapView style={{ flex: 1 }} initialRegion={location}>
      <Marker
        coordinate={{
          latitude: location.latitude,
          longitude: location.longitude,
        }}
      />
      {places.map((place) => {
        return (

          <Marker
            key={place.id}
            coordinate={{
              latitude: place.marker.latitude,
              longitude: place.marker.longitude,
            }}
            pinColor={"green"}
            // onPress={() => generateLink(item)}
          />

        );
      })}
    </MapView>
  );
};

export default Map;
