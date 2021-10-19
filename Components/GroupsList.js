import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  Image,
  Button,
  FlatList,
  KeyboardAvoidingView,
  ScrollView,
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
import { AntDesign } from '@expo/vector-icons';
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
      <View style={{ alignItems: 'flex-end', marginRight: 20, marginTop: 0 }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            props.navigation.navigate('Add Group');
          }}
        >
          <Icon color="black" type="ionicon" name="people-outline" size={20} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          marginTop: 20,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Image
          source={require('../public/nudgie2.png')}
          style={styles.nudgie}
        />
      </View>
      <Text style={styles.title}>Groups</Text>

      <View style={styles.body}>
        <FlatList
          contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}
          data={groups}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <SingleGroup group={item} />}
        ></FlatList>
      </View>
      {/* </ScrollView> */}
      {/* </KeyboardAvoidingView> */}
    </SafeAreaView>
  );
};

export default GroupsList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'space-evenly',
    // padding: 20,
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
    // borderWidth: 1,
    borderColor: '#FFFFFF',
    margin: 15,
    // backgroundColor: '#FAF3DD',
  },
  box: {
    display: 'flex',
    width: '95%',
    margin: 10,
    borderRadius: 10,
    backgroundColor: '#EBF6EF',
    flexDirection: 'row',
    shadowColor: 'black',
    alignItems: 'center',
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 1,
      width: -2,
    },
    elevation: 2,
  },
  info: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginLeft: 15,
    padding: 5,
  },
  item: {
    padding: 10,
    fontSize: 18,
    alignSelf: 'center',
    textAlign: 'center',
  },
  priority: {
    marginLeft: 'auto',
    marginBottom: 'auto',
    backgroundColor: 'red',
    width: 25,
    height: 25,
    borderRadius: 4,
    shadowColor: 'black',
    shadowOpacity: 0.1,
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
  buttonText: {
    color: '#4a7c59',
    fontWeight: '700',
    fontSize: 22,
  },
  nudgie: {
    width: 150,
    height: 150,
    borderRadius: 24,
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 5,
  },
});
