import React from 'react';
import { Text, View } from 'react-native';

export const LeftSwipeActions = (complete) => {
  return (
    <View
      style={{
        backgroundColor: '#ccffbd',
        justifyContent: 'center',
        alignItems: 'flex-start',
        borderRadius: 10,
        marginLeft: 5,
      }}
    >
      <Text
        style={{
          color: '#40394a',
          paddingHorizontal: 10,
          fontWeight: '600',
          paddingHorizontal: 30,
          paddingVertical: 20,
        }}
      >
        {complete}
      </Text>
    </View>
  );
};
export const RightSwipeActions = () => {
  return (
    <View
      style={{
        backgroundColor: '#ff8303',
        justifyContent: 'center',
        alignItems: 'flex-end',
        borderRadius: 10,
        marginRight: 5,
      }}
    >
      <Text
        style={{
          color: '#1b1a17',
          paddingHorizontal: 10,
          fontWeight: '600',
          paddingHorizontal: 30,
          paddingVertical: 20,
        }}
      >
        Delete
      </Text>
    </View>
  );
};
