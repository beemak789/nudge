import React, { useState } from 'react';
import { Text, SafeAreaView, View, StyleSheet } from 'react-native';

export default function SingleGroupSettings(props) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ display: 'flex', alignItems: 'center' }}>
        <Text>This is group settings </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
