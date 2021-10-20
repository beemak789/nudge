import React from 'react';
import { Text, View } from 'react-native';

export const LeftSwipeActions = (complete) => {
  return (
    <View
      style={{
        backgroundColor: "#FAF3DD",
        height: 51,
        display: "flex",
        alignItems:"center",
        justifyContent:"center",
        borderRadius: 10,
      }}
    >
      <Text
        style={{
          fontSize: 14,
          padding: 7,
          alignSelf: 'center',
          textAlign: 'center',
          paddingHorizontal: 10,
        }}
      >
        Complete
      </Text>
    </View>
  );
};

export const LeftCompleteSwipeActions = (complete) => {
  return (
    <View
      style={{
        backgroundColor: "#FAF3DD",
        height: 51,
        display: "flex",
        alignItems:"center",
        justifyContent:"center",
        borderRadius: 10,
      }}
    >
      <Text
        style={{
          fontSize: 14,
          padding: 7,
          alignSelf: 'center',
          textAlign: 'center',
          paddingHorizontal: 10,
        }}
      >
        Incomplete
      </Text>
    </View>
  );
};
export const RightSwipeActions = () => {
  return (
    <View
      style={{
        backgroundColor: "#B44647",
        height: 51,
        display: "flex",
        alignItems:"center",
        justifyContent:"center",
        borderRadius: 10,
      }}
    >
      <Text
        style={{
          fontSize: 14,
          padding: 7,
          alignSelf: 'center',
          textAlign: 'center',
          paddingHorizontal: 10,
        }}
      >
        Delete
      </Text>
    </View>
  );
};
