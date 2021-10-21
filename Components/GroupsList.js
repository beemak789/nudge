import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchUserGroups,
  selectGroup,
  _setGroups,
  clearGroups,
} from '../store/group';
import SingleGroup from './SingleGroup';
import AddGroup from './AddGroup';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';

const GroupsList = (props) => {
  const dispatch = useDispatch();
  const { groups } = useSelector((state) => state.groups);
  const navigation = useNavigation();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUserGroups(user));
  }, [dispatch]);

  if (!groups.length) {
    return <AddGroup navigation={navigation} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            props.navigation.navigate('Add Group');
          }}
        >
          <Icon color="black" type="ionicon" name="people-outline" size={18} />
        </TouchableOpacity>
      </View>
      <View
        style={styles.imageContent}
      >
        <Image
          source={require('../public/nudgie2.png')}
          style={styles.nudgie}
        />
      </View>
      <Text style={styles.title}>Groups</Text>

      <View>
        <FlatList
          contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}
          data={groups}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <SingleGroup group={item} />}
        ></FlatList>
      </View>
    </SafeAreaView>
  );
};

export default GroupsList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    alignItems: 'flex-end',
    marginRight: 20,
    marginTop: 0
  },
  imageContent: {
    width: '100%',
    aspectRatio: 10 / 4,
  },

  nudgie: {
    width: '90%',
    height: '90%',
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  completedButton: {
    marginRight: 10,
    borderColor: '#2e64e5',
    borderWidth: 2,
    borderRadius: 3,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginHorizontal: 5,
  },
  item: {
    fontSize: 20,
  },
  body: {
    width: '100%',
    flex: 1,
    marginTop: 20,
  },
  image: {
    width: 80,
    height: 80,
    borderColor: '#FFFFFF',
    margin: 15,
  },
  button: {
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderColor: 'transparent',
    borderWidth: 1,
    elevation: 3,
    backgroundColor: '#83CA9E',
    shadowColor: '#000000',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 2,
    },
    marginTop: 10,
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    margin: 5,
  },
});
