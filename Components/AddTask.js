import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  Button,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ScrollView
} from 'react-native';
import { useDispatch } from 'react-redux';
import { _createTask } from '../store/task';
import { SelectMultipleGroupButton } from 'react-native-selectmultiple-button';

const images = {
  grocery: require('../public/grocery.png'),
  bakery: require('../public/bakery.png'),
  bookstore: require('../public/bookstore.png'),
  pharmacy: require('../public/pharmacy.png'),
  other: require('../public/other.png')
}
const types = ['grocery', 'pharmacy', 'bookstore', 'bakery', 'other'];
const priorityTypes = ['high', 'medium', 'low'];

const Store = ({storeType}) => {
  <View>
    <Text>{storeType}</Text>
  </View>
}

const AddTask = (props) => {
  const [text, onChangeText] = useState('');
  const [priority, setPriority] = useState('high');
  const [category, addCategory] = useState([]);
  const dispatch = useDispatch();



  const renderItem = (item) => (
    <Store storeType={item} />
  )

  const onSubmit = () => {
    console.log(priority[0]);
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
    addCategory([]);
    setPriority('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style= {{margin: 20,
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1}}>
      <Image source={require('../public/nudgie.png')} style={styles.nudgie} />
      <View style={{ marginBottom: 30 }}>
        <Text style={styles.title}>New Task</Text>
        <TextInput
          style={styles.itemName}
          onChangeText={onChangeText}
          value={text}
          placeholder="enter item name"
        />
      </View>
      <View>
        <Text style={{ fontSize: 20, textAlign: 'left', fontWeight: "bold", marginBottom: 10 }}>
          Where can we find this item?
        </Text>
        <Text style={{marginBottom: 10}}>Select all that apply</Text>
        <View style ={{height: 100}}>
        <ScrollView style={{height: 30}} showsHorizontalScrollIndicator={false} horizontal={true}>
          {types.map((type) => {
            return (
              <TouchableOpacity
                key={type}
                style={
                  category.includes(type) ? styles.selected : styles.notSelected
                }
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
              >
                <Image source={images[type]} style={styles.storeIcon} />
                <Text
                  style={
                    category.includes(type)
                      ? styles.selectedText
                      : styles.notSelectedText
                  }
                >
                  {type}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        </View>
      <Text style={{ fontSize: 20, textAlign: 'left', fontWeight: "bold", marginTop: 10 }}>Select Priority</Text>
      <View style={{ flexDirection: 'row', margin: 3, justifyContent: "space-evenly" }}>
        <SelectMultipleGroupButton
          containerViewStyle={{
            justifyContent: 'flex-start',
          }}
          highLightStyle={{
            borderColor: 'gray',
            backgroundColor: 'transparent',
            textColor: 'gray',
            borderTintColor: 'transparent',
            backgroundTintColor: '#83CA9E',
            textTintColor: 'black',
          }}
          onSelectedValuesChange={(selectedValues) =>
            setPriority(selectedValues)
          }
          multiple={false}
          group={[{ value: 'high' }, { value: 'medium' }, { value: 'low' }]}
        />
      </View>
      </View>
      <TouchableOpacity style={styles.save} onPress={onSubmit} title="save">
        <Text style={{color: "black", fontWeight: "bold"}}>
          save
        </Text>
      </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default AddTask;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemName: {
    fontSize: 20,
    borderWidth: 1,
    textAlign: 'center',
    borderColor: 'transparent',
    borderRadius: 4,
    margin: 5,
    padding: 10,
    width: 250,
    backgroundColor: '#EBF6EF',
    shadowColor: '#000000',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    shadowOffset: {
      height: 3,
      width: 3,
    },
  },
  selected: {
    backgroundColor: '#83CA9E',
    borderWidth: 1,
    borderColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    height: 90,
    width: 80,
    margin: 5,
    shadowColor: '#000000',
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 2,
    },
  },
  notSelected: {
    backgroundColor: '#EBF6EF',
    color: 'gray',
    borderWidth: 1,
    borderColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    height: 90,
    width: 80,
    margin: 5,
    shadowColor: '#000000',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 2,
    },
  },
  nudgie: {
    height: 150,
    width: 150,
    borderRadius: 24,
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    margin: 5,
  },
  selectedText: {
    color: 'black',
  },
  notSelectedText: {
    color: 'gray',
  },
  save: {
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 20,
    borderColor: "transparent",
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
  storeIcon: {
    width: 50,
    height: 50,
    backgroundColor: "transparent",
    marginBottom: 5,
  }
});
