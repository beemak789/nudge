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
import SendToGroup from '../../Components/SendToGroup';
import TasksToSend from '../../Components/TasksToSend';

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
    supermarket: 'Grocery',
    pharmacy: 'Pharmacy',
    book_store: 'Bookstore',
    bakery: 'Bakery',
    clothing_store: 'Clothing',
    drugstore: 'Drugstore',
    convenience_store: 'Convenience',
    florist: 'Florist',
    home_goods_store: 'Home Goods',
    shoe_store: 'Shoe Store',
    liquor_store: 'Liquor Store',
    other: 'Other',
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
      <Drawer.Screen name="All Tasks">
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
        <Tab.Screen name="Tasks" component={TaskList} {...props} />
        <Tab.Screen
          name="Completed"
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
      initialRouteName="Categories Stack"
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
      <Stack.Screen
        name="Tasks To Send"
        component={TasksToSend}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Send To Group"
        component={SendToGroup}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default tasksStack;
