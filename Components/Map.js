import { TouchableOpacity, View, Text } from 'react-native';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import MapView, { Marker, AnimatedRegion } from 'react-native-maps';
import * as Linking from 'expo-linking';

const LONG_DELTA = 0.0922;
const LAT_DELTA = 0.0421;

const Map = (props) => {
  const { places } = useSelector((state) => state.place);

  const { coords: userLocation } = useSelector((state) => state.location);


  const generateLink = (item) => {
    const name = item.name.replace(/\s/g, '+');

    const mapsLink = `https://www.google.com/maps?saddr=My+Location&daddr=${name}`;
    Linking.openURL(mapsLink);
  };
  if (!userLocation) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <MapView
      style={{ flex: 1 }}
      region={{
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        latitudeDelta: LONG_DELTA,
        longitudeDelta: LAT_DELTA,
      }}
    >
      <Marker
        title="Me"
        coordinate={{
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
        }}
      />
      {places.map((place) => {
        return (
          <Marker
            title={`${place.name}`}
            key={place.id}
            coordinate={{
              latitude: place.marker.latitude,
              longitude: place.marker.longitude,
            }}
            pinColor={'green'}
            onPress={() => generateLink(place)}
          />
        );
      })}
    </MapView>
  );
};

export default Map;
