import React from 'react';
import { SafeAreaView } from 'react-native';
import { useSelector } from 'react-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Tab = createMaterialTopTabNavigator();

// components
import TaskList from '../../Components/TaskList';
import AddTask from '../../Components/AddTask';
import EditTask from '../../Components/EditTask';
import CompletedList from '../../Components/CompletedList';
import Stateless from '../../Components/Stateless';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function MyDrawer() {
  const { incomplete } = useSelector((state) => state.task);

  let categories = [];
  incomplete.forEach((task) =>
    task.category.forEach((cat) => {
      if (!categories.includes(cat)) {
        categories.push(cat);
      }
    })
  );

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

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: '#1d3557',
        drawerActiveBackgroundColor: '#EBF6EF',
        drawerStyle: {
          backgroundColor: '#fcfffd',
        },
      }}
    >
      <Drawer.Screen name="all tasks">
        {(props) => <CategoriesStack {...props} />}
      </Drawer.Screen>
      {categories.map((category) => {
        return (
          <Drawer.Screen key={category} name={`${displayTypes[category]}`}>
            {(props) => (
              <Stateless
                list={incomplete.filter((task) =>
                  task.category.includes(category)
                )}
                title={`${displayTypes[category]} list`}
                {...props}
              />
            )}
          </Drawer.Screen>
        );
      })}
    </Drawer.Navigator>
  );
}

const CategoriesStack = (props) => {
  return (
    <>
      <SafeAreaView></SafeAreaView>
      <Tab.Navigator
        screenOptions={{
          activeTintColor: 'white',
          itemStyle: { marginVertical: 10 },
          inactiveTintColor: 'white',
          headerShown: false,
        }}
      >
        <Tab.Screen name="Task List" component={TaskList} {...props} />
        <Tab.Screen
          name="Completed List"
          component={CompletedList}
          {...props}
        />
      </Tab.Navigator>
    </>
  );
};

const tasksStack = (props) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: 'white',
          height: 10,
        },
        headerTintColor: 'white',
        headerBackTitle: '',
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="Categories Stack">
        {(props) => <MyDrawer {...props} />}
      </Stack.Screen>

      <Stack.Screen
        name="Add Task"
        component={AddTask}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Edit Stack"
        component={EditTask}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default tasksStack;
