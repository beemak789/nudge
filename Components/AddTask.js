import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  Button,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { _createTask } from '../store/task';


const AddTask = (props) => {
  const [text, onChangeText] = useState('');
  const [priority, setPriority] = useState('high');
  const [category, addCategory] = useState([]);
  const dispatch = useDispatch();

  const types = ['grocery', 'pharmacy', 'bookstore'];
  const priorityTypes = ['high', 'medium', 'low']

  const onSubmit = () => {
    dispatch(
      _createTask({
        name: text,
        priority,
        category,
      })
    );
    props.navigation.navigate('Tasks List', {
      screen: 'Task List',
    });
    onChangeText('');
    addCategory([]);
    setPriority('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{marginBottom: 30}}>
      <TextInput
        style = {styles.itemName}
        onChangeText={onChangeText}
        value={text}
        placeholder="item name"
      />
      </View>
      <Text>Where can we find this item?</Text>
      <View style={{flexDirection: "row", margin: 3}}>
      {types.map((type) => {
        return <TouchableOpacity
          key = {type}
          style = {(category.includes(type) ? styles.selected : styles.notSelected)}
          onPress={() => {
            if (category.includes(type)) {
              //do not highlight
              const filteredCategories = category.filter(
                (removeType) => removeType !== type
              );
              addCategory(filteredCategories);
            } else {
              //highlgiht
              addCategory([...category, type]);
            }
          }}
          ><Text>{type}</Text></TouchableOpacity>
      })}
      </View>
      <Text>Select Priority</Text>
      <View style={{flexDirection: "row", margin: 3}}>
      {priorityTypes.map((level) => {
        return <TouchableOpacity
          key = {level}
          style = {(priority === level) ? styles.selected : styles.notSelected}
          onPress={() => {
            if (priority !== level) {
              //do not highlight
              setPriority(level)
            }
          }}
          ><Text>{level}</Text></TouchableOpacity>
      })}
      </View>
      <Button onPress={onSubmit} title="save" />
      <Button
        onPress={() => {
          getPlaces();
        }}
        title="places url"
      />
    </SafeAreaView>
  );
}
export default AddTask;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemName: {
    fontSize: 20,
  },
  selected:{
    backgroundColor: "gray",
    borderWidth:1,
    borderColor:'rgba(0,0,0,0.2)',
    alignItems:'center',
    justifyContent:'center',
    borderRadius: 4,
    height: 30,
    width: 100,
    margin: 2,
  },
  notSelected:{
    backgroundColor: "transparent",
    borderWidth:1,
    borderColor:'rgba(0,0,0,0.2)',
    alignItems:'center',
    justifyContent:'center',
    borderRadius: 4,
    height: 30,
    width: 100,
    margin: 2,
  }
});
