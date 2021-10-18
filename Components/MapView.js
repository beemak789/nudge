import { StyleSheet, Text, SafeAreaView } from 'react-native';
import React from 'react';

const MapView = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>This is MapView</Text>
    </SafeAreaView>
  );
};

export default MapView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});
