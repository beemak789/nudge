import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  Button,
  TextInput,
  ProgressViewIOSComponent,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { SelectMultipleButton, SelectMultipleGroupButton } from 'react-native-selectmultiple-button';
import { useDispatch } from 'react-redux';
import { GOOGLE_PLACES_API, GOOGLE_MAPS_API } from '@env';
import { _createTask } from '../store/task';

const AddTask = (props) => {
  const [text, onChangeText] = useState('');
  const [priority, setPriority] = useState();
  const [category, addCategory] = useState([]);
  const dispatch = useDispatch();
  const getPlacesUrl = (lat, long, radius, type, apiKey) => {
    const baseUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?`;
    const location = `location=${lat},${long}&radius=${radius}`;
    const typeData = `&types=${type}`;
    const api = `&key=${apiKey}`;
    console.log(`${baseUrl}${location}${typeData}${api}`);
  };

  //https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=37.785834,-122.406417&radius=500
  const getPlaces = () => {
    const lat = '37.785834';
    const long = '-122.406417';
    const placeType = 'restaurant';
    const url = getPlacesUrl(lat, long, 500, placeType, GOOGLE_PLACES_API);
    // fetch(url)
    //   .then(res => res.json())
    //   .then(console.log(res))
  };
  const onSubmit = () => {
    dispatch(_createTask({
      name: text,
      priority: priority[0],
      category
    }))
    props.navigation.navigate('Tasks List', {
      screen: 'Task List',
    });
    onChangeText('')
  };
  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        onChangeText={onChangeText}
        value={text}
        placeholder="item name"
      />
      <Text>Where can we find this item?</Text>
      <SelectMultipleGroupButton
        containerViewStyle={{
          justifyContent: 'flex-start',
        }}
        highLightStyle={{
          borderColor: 'gray',
          backgroundColor: 'transparent',
          textColor: 'gray',
          borderTintColor: 'black',
          backgroundTintColor: 'blue',
          textTintColor: 'white',
        }}
        onSelectedValuesChange={(selectedValues) => addCategory(selectedValues)}
        group={[
          { value: 'grocery' },
          { value: 'pharmacy' },
          { value: 'bookstore' },
        ]}
      />
      <Text>Select Priority</Text>
      <SelectMultipleGroupButton
        containerViewStyle={{
          justifyContent: 'flex-start',
        }}
        highLightStyle={{
          borderColor: 'gray',
          backgroundColor: 'transparent',
          textColor: 'gray',
          borderTintColor: 'black',
          backgroundTintColor: 'blue',
          textTintColor: 'white',
        }}
        onSelectedValuesChange={(selectedValues) => setPriority(selectedValues)}
        multiple={false}
        group={[
          { value: 'high' },
          { value: 'medium' },
          { value: 'low' },
        ]}
      />
      <Button onPress={onSubmit} title="save" />
      <Button
        onPress={() => {
          getPlaces();
        }}
        title="places url"
      />

    </SafeAreaView>
  );
};

export default AddTask;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
