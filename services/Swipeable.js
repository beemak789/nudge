import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

export const LeftSwipeActions = (complete) => {
  return (
    <View
      style={{
        backgroundColor: "#EBF6EF",
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
        backgroundColor: "#83CA9E",
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
export const RightSwipeActions = ({ onPress }) => {
  return (
    <TouchableOpacity onPress = {onPress}>
    <View
      style={{
        backgroundColor: "#FF0000",
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
    </TouchableOpacity>
  );
};
