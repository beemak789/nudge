import React, { useState, useEffect } from "react";
import { StyleSheet, Text, SafeAreaView, Button } from "react-native";
import { GOOGLE_PLACES_API, GOOGLE_MAPS_API } from '@env';

const Screen2 = (props) => {

  const getPlacesUrl = (lat, long, radius, type, apiKey) => {
    const baseUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?`;
    const location = `location=${lat},${long}&radius=${radius}`;
    const typeData = `&types=${type}`;
    const api = `&key=${apiKey}`;
    console.log(`${baseUrl}${location}${typeData}${api}`);
  }

  const getPlaces = () => {
    const lat = '37.785834'
    const long = '-122.406417'
    const placeType = 'restaurant'
    const url = getPlacesUrl(lat, long, 500, placeType, GOOGLE_PLACES_API);
    // fetch(url)
    //   .then(res => res.json())
    //   .then(console.log(res))
  }

  return (
    <SafeAreaView style={styles.container}>
      <Button onPress={()=> {getPlaces()}} title='button'>hi</Button>
    </SafeAreaView>
  );
};

export default Screen2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});


