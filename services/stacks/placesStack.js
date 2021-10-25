import React from 'react';
import { useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

// components
import PlacesList from '../../Components/PlacesList';
import OptimizedPlacesList from '../../Components/OptimizedPlacesList';
import NoPlaces from '../../Components/NoPlaces';
import Stateless from '../../Components/Stateless';
import Map from '../../Components/Map';

const Stack = createNativeStackNavigator();

const DisplayPlacesStack = (props) => {
  // const { currTask, incomplete } = useSelector((state) => state.task);

  // let tabs = [];
  // if (currTask.category.length > 1) {
  //   tabs = [{ All: [] }];
  // }

  // currTask.category.forEach((type) => {
  //   if (type !== 'other') {
  //     let newType = {};
  //     newType[type] = [];
  //     tabs.push(newType);
  //   }
  // });

  // incomplete.forEach((task) => {
  //   let lastIdx = task.category.length - 1;
  //   let all = true;
  //   task.category.forEach((category, idx) => {
  //     if (currTask.category.includes(category)) {
  //       tabs.forEach((tab) => {
  //         if (Object.keys(tab)[0] === category) {
  //           tab[Object.keys(tab)[0]].push(task);
  //         }
  //       });
  //     } else {
  //       all = false;
  //     }

  //     if (currTask.category.length > 1 && idx === lastIdx && all === true) {
  //       tabs[0].All.push(task);
  //     }
  //   });
  // });

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
        <Tab.Screen name="Map" component={Map} {...props} />
      </Tab.Navigator>
    </>
  );
};

// const OptimizedPlaces = (props) => {
//   return (
//     <>
//       <SafeAreaView></SafeAreaView>
//       <Tab.Navigator
//         screenOptions={{
//           activeTintColor: 'white',
//           itemStyle: { marginVertical: 10 },
//           inactiveTintColor: 'white',
//           headerShown: false,
//         }}
//       >
//         <Tab.Screen name="Quick Complete" component={OptimizedPlacesList} {...props} />
//       </Tab.Navigator>
//     </>
//   );
// };

const placesStack = (props) => {
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
      <Stack.Screen name="Display Places Stack">
        {(props) => <DisplayPlacesStack {...props} />}
      </Stack.Screen>

      <Stack.Screen name="Optimized Places"
              component={OptimizedPlacesList}
              options={{ headerShown: false }}>
        {/* {(props) => <OptimizedPlaces {...props} />} */}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default placesStack;
