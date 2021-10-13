import React from 'react';
import { StyleSheet, Text, SafeAreaView, View } from 'react-native';

const FriendsList = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>This is Friends List</Text>
      </View>
    </SafeAreaView>
  );
};

export default FriendsList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
