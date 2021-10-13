import React from 'react';
import { StyleSheet, Text, SafeAreaView, View } from 'react-native';

const GroupsList = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>This is Groups List</Text>
      </View>
    </SafeAreaView>
  );
};

export default GroupsList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
