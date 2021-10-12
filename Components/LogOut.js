import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, SafeAreaView, Button } from 'react-native';
import { GOOGLE_PLACES_API, GOOGLE_MAPS_API } from '@env';
import { data, LoopTimer, loopThroughArray } from '../data';
import axios from 'axios';

const Screen2 = (props) => {
  const [display, setDisplay] = useState('');
  return (
    <SafeAreaView style={styles.container}>
      <Button
        onPress={() => {
          //loop through data and make call to db with location, return stores
          loopThroughArray(
            data,
            async function (arrayElement) {
              console.log(
                'LONGITUDE& LAT',
                arrayElement.longitude,
                arrayElement.latitude
              );
              try {
                const response = await axios.get(
                  `http://192.168.86.32:8080/api/stores/${arrayElement.longitude}/${arrayElement.latitude}/`
                );
                console.log('DATA', response.data);
              } catch (error) {
                console.log(error);
              }
            },
            60000
          );
        }}
        title="button"
      >
        hi
      </Button>
    </SafeAreaView>
  );
};

export default Screen2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
