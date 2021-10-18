import React from 'react';
import { useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

// components
import PlacesList from '../../Components/PlacesList';
import NoPlaces from '../../Components/NoPlaces';
import Stateless from '../../Components/Stateless';

const Stack = createNativeStackNavigator();

const DisplayPlacesStack = (props) => {
  // this checks what categories the current task has, and conditionally renders the lists based on it. So if chocolate can be found at both a pharmacy and a grocery store, it'll pull other items that can be found at both pharmacies and grocery stores from your task list, pull items that can only be found in grocery stores, and pull items that can only be found in pharmacies in separate tabs
  const { currTask, incomplete } = useSelector((state) => state.task);

  let tabs = [];
  if (currTask.category.length > 1) {
    tabs = [{ All: [] }];
  }

  currTask.category.forEach((type) => {
    if (type !== 'other') {
      let newType = {};
      newType[type] = [];
      tabs.push(newType);
    }
  });

  incomplete.forEach((task) => {
    let lastIdx = task.category.length - 1;
    let all = true;
    task.category.forEach((category, idx) => {
      if (currTask.category.includes(category)) {
        tabs.forEach((tab) => {
          if (Object.keys(tab)[0] === category) {
            tab[Object.keys(tab)[0]].push(task);
          }
        });
      } else {
        all = false;
      }

      if (currTask.category.length > 1 && idx === lastIdx && all === true) {
        tabs[0].All.push(task);
      }
    });
  });

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
        <Tab.Screen name="Places List" component={PlacesList} {...props} />
        {tabs.map((tab) => (
          <Tab.Screen key={Object.keys(tab)[0]} name={Object.keys(tab)[0]}>
            {(props) => (
              <Stateless {...props} list={tab[Object.keys(tab)[0]]} />
            )}
          </Tab.Screen>
        ))}
      </Tab.Navigator>
    </>
  );
};

const placesStack = (props) => {
  const { places } = useSelector((state) => state.place);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: '#709775',
        },
        headerTintColor: 'white',
        headerBackTitle: '',
        headerShadowVisible: false,
      }}
    >
      {!places.length ? (
        <Stack.Screen
          name="No Places"
          component={NoPlaces}
          options={{ headerShown: false }}
        />
      ) : (
        <Stack.Screen name="Display Places Stack">
          {(props) => <DisplayPlacesStack {...props} />}
        </Stack.Screen>
      )}
    </Stack.Navigator>
  );
};

export default placesStack;
