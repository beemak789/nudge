import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { selectGroup, fetchUserGroups } from '../store/group';
import { useNavigation } from '@react-navigation/core';

const SingleGroup = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(fetchUserGroups(user));
  }, [dispatch]);

  return (
    <View style={styles.box}>
      <View style={styles.info}>
        <TouchableOpacity
          onPress={async () => {
            await dispatch(selectGroup(props.group.id));
            navigation.navigate('Single Group Stack');
          }}
        >
          <Text style={styles.buttonText}>{props.group.name}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SingleGroup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  completedButton: {
    marginRight: 10,
    borderColor: '#2e64e5',
    borderWidth: 2,
    borderRadius: 3,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginHorizontal: 5,
    alignContent: 'flex-end',
  },
  item: {
    fontSize: 20,
  },
  box: {
    display: 'flex',
    width: 250,
    alignItems: 'baseline',
    margin: 20,
    borderRadius: 10,
    backgroundColor: '#EBF6EF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 1,
      width: -2,
    },
    elevation: 2,
  },
  info: {
    marginLeft: 10,
    padding: 5,
  },
  item: {
    padding: 10,
    fontSize: 18,
    alignSelf: 'center',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#EBF6EF',
    padding: 5,
    borderRadius: 25,
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: '#FFFFFF',
    margin: 5,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 1,
      width: -2,
    },
    elevation: 2,
  },
  buttonText: {
    color: '#4a7c59',
    fontWeight: '700',
    fontSize: 22,
  },
  nudgie: {
    width: 50,
    height: 50,
    backgroundColor: 'transparent',
    margin: 5,
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    margin: 5,
  },
});
