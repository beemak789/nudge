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
  ScrollView,
  ButtonGroup,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { _createTask, _updateTask } from '../store/task';

const EditTask = (props) => {
  const [taskName, onChangeTaskName] = useState(
    `${props.route.params.item.name}`
  );
  const [priority, setPriority] = useState(
    `${props.route.params.item.priority}`
  );
  const [category, addCategory] = useState([
    `${props.route.params.item.category}`,
  ]);
  const dispatch = useDispatch();
  const types = [
    'supermarket',
    'pharmacy',
    'book_store',
    'bakery',
    'clothing_store',
    'drugstore',
    'convenience_store',
    'florist',
    'home_goods_store',
    'shoe_store',
    'liquor_store',
    'other',
  ];
  const images = {
    supermarket: require('../public/supermarket.png'),
    clothing_store: require('../public/clothing.png'),
    shoe_store: require('../public/shoe-store.png'),
    liquor_store: require('../public/liquor-store.png'),
    convenience_store: require('../public/convenience_store.png'),
    bakery: require('../public/bakery.png'),
    drugstore: require('../public/drugstore.png'),
    book_store: require('../public/book_store.png'),
    florist: require('../public/florist.png'),
    pharmacy: require('../public/pharmacy.png'),
    home_goods_store: require('../public/home-goods.png'),
    other: require('../public/other.png'),
  };
  const displayTypes = {
    supermarket: 'grocery',
    pharmacy: 'pharmacy',
    book_store: 'bookstore',
    bakery: 'bakery',
    clothing_store: 'clothing',
    drugstore: 'drugstore',
    convenience_store: 'convenience',
    florist: 'florist',
    home_goods_store: 'home goods',
    shoe_store: 'shoe store',
    liquor_store: 'liquor store',
    other: 'other',
  };
  const onSubmit = () => {
    if (!taskName.trim()) {
      alert('Please enter a task item!');
      return;
    }

    if (!category.length) {
      dispatch(
        _updateTask({
          id: props.route.params.item.id,
          name: taskName,
          priority,

          category: ['other'],
        })
      );
    } else {
      dispatch(
        _updateTask({
          id: props.route.params.item.id,
          name: taskName,
          priority,
          category,
        })
      );
    }

    props.navigation.navigate('Categories Stack', {
      screen: 'Task List',
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          marginRight: 'auto',
          marginLeft: 10,
        }}
      >
        <TouchableOpacity
          style={styles.save}
          onPress={() => {
            props.navigation.navigate('Categories Stack', {
              screen: 'Task List',
            });
          }}
        >
          <Text style={styles.saveText}>back</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.title}>Edit Task</Text>
        <TextInput
          style={styles.itemName}
          onChangeText={onChangeTaskName}
          value={taskName}
        />
      </View>
      <View style={{ padding: 10 }}>
        <Text
          style={{
            fontSize: 20,
            textAlign: 'left',
            fontWeight: 'bold',
            margin: 10,
          }}
        >
          Change location
        </Text>
        <View style={{ height: 100 }}>
          <ScrollView
            style={{ height: 30 }}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
          >
            {types.map((type) => {
              return (
                <TouchableOpacity
                  key={type}
                  style={
                    category.includes(type)
                      ? styles.selected
                      : styles.notSelected
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
                    {displayTypes[type]}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
        <Text
          style={{
            fontSize: 20,
            textAlign: 'left',
            fontWeight: 'bold',
            margin: 10,
          }}
        >
          Change priority
        </Text>
        <View
          style={{
            flexDirection: 'row',
            margin: 3,
            justifyContent: 'space-evenly',
          }}
        >
          <TouchableOpacity
            style={[
              styles.notSelectedPriority,
              priority === 'high' ? { backgroundColor: '#83CA9E' } : null,
            ]}
            onPress={() => setPriority('high')}
          >
            <Text
              style={[
                styles.btnText,
                priority === 'high'
                  ? { color: 'black', fontWeight: 'bold' }
                  : null,
              ]}
            >
              high
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.notSelectedPriority,
              priority === 'medium' ? { backgroundColor: '#83CA9E' } : null,
            ]}
            onPress={() => setPriority('medium')}
          >
            <Text
              style={[
                styles.btnText,
                priority === 'medium'
                  ? { color: 'black', fontWeight: 'bold' }
                  : null,
              ]}
            >
              medium
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.notSelectedPriority,
              priority === 'low' ? { backgroundColor: '#83CA9E' } : null,
            ]}
            onPress={() => setPriority('low')}
          >
            <Text
              style={[
                styles.btnText,
                priority === 'low'
                  ? { color: 'black', fontWeight: 'bold' }
                  : null,
              ]}
            >
              low
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.save} onPress={onSubmit} title="save">
        <Text style={styles.saveText}>update</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
export default EditTask;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-evenly',
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
    fontWeight: 'bold',
  },
  notSelectedText: {
    color: 'gray',
  },
  save: {
    justifyContent: 'center',
    width: 80,
    paddingVertical: 10,
    paddingHorizontal: 10,
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
  saveText: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  storeIcon: {
    width: 50,
    height: 50,
    backgroundColor: 'transparent',
    marginBottom: 5,
  },
  notSelectedPriority: {
    backgroundColor: '#EBF6EF',
    color: 'gray',
    borderWidth: 1,
    borderColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    height: 30,
    width: 100,
    margin: 5,
    shadowColor: '#000000',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 2,
    },
  },
});
