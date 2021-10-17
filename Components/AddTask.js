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
import { _createTask } from '../store/task';

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
const priorityTypes = ['high', 'medium', 'low'];

const Store = ({ storeType }) => {
  <View>
    <Text>{storeType}</Text>
  </View>;
};

const AddTask = (props) => {
  const [text, onChangeText] = useState('');
  const [priority, setPriority] = useState('high');
  const [category, addCategory] = useState([]);
  const dispatch = useDispatch();

  const renderItem = (item) => <Store storeType={item} />;

  const onSubmit = () => {
    if (!category.length) {
      dispatch(
        _createTask({
          name: text,
          priority,
          category: ['other'],
        })
      );
    } else {
      dispatch(
        _createTask({
          name: text,
          priority,
          category,
        })
      );
    }

    props.navigation.navigate('Categories Stack', {
      screen: 'Task List',
    });
    onChangeText('');
    addCategory([]);
    setPriority('');
  };
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          margin: 20,
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
        }}
      >
        <Image
          source={require('../public/nudgie2.png')}
          style={styles.nudgie}
        />
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
          <Text
            style={{
              fontSize: 20,
              textAlign: 'left',
              fontWeight: 'bold',
              marginBottom: 10,
            }}
          >
            Where can we find this item?
          </Text>
          <Text style={{ marginBottom: 10 }}>Select all that apply</Text>
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
              marginTop: 10,
            }}
          >
            Select Priority
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
          <Text style={styles.saveText}>save</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.save}
          onPress={() =>
            props.navigation.navigate('Categories Stack', {
              screen: 'Task List',
            })
          }
          title="cancel"
        >
          <Text style={styles.saveText}>cancel</Text>
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
    width: 90,
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
    width: 90,
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
