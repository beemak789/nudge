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
import {
  SelectMultipleButton,
  SelectMultipleGroupButton,
} from 'react-native-selectmultiple-button';
import { useDispatch } from 'react-redux';
import { _createTask } from '../store/task';

const AddTask = (props) => {
  const [text, onChangeText] = useState('');
  const [priority, setPriority] = useState();
  const [category, addCategory] = useState([]);
  const dispatch = useDispatch();

  const onSubmit = () => {
    dispatch(
      _createTask({
        name: text,
        priority: priority[0],
        category,
      })
    );
    props.navigation.navigate('Tasks List', {
      screen: 'Task List',
    });
    onChangeText('');
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
        group={[{ value: 'high' }, { value: 'medium' }, { value: 'low' }]}
      />
      <Button onPress={onSubmit} title="save" />
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
