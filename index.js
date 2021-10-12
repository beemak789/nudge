// app = express();

// cron.schedule('*/2 * * * *', function() {
//   console.log('finding location every 2 minutes');
// });

// app.listen(3000);

// import { StatusBar } from 'expo-status-bar';
// import React, { useState, useEffect } from 'react';
// import { StyleSheet, Text, View, SafeAreaView, Animated } from 'react-native';
// import MapView, { Marker, AnimatedRegion } from 'react-native-maps';
// import * as Location from 'expo-location';


// const App = () => {
//   const [location, setLocation] = useState({
//     latitude: LATITUDE,
//     longitude: LONGITUDE,
//     latitudeDelta: LONG_DELTA,
//     longitudeDelta: LAT_DELTA,
//   });
//   const [errorMsg, setErrorMsg] = useState(null);
//   console.log('the location--->', location);
//   const locationTracking = async () => {
//     try {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         setErrorMsg('Permission to access location was denied');
//         return;
//       }
//       // local variable location - not the state variable location
//       let GPSlocation = await Location.getCurrentPositionAsync({});
//       setLocation({
//         ...location,
//         latitude: GPSlocation.coords.latitude,
//         longitude: GPSlocation.coords.longitude,
//       });
//       console.log('THE GPS location--->', GPSlocation);
//     } catch (err) {
//       console.log(err);
//     }
//   };
//   useEffect(() => {
//     locationTracking();
//   }, []);
//   //[ location ] will make it keep running
//   // console.log(location);
//   return (
//     <MapView style={{ flex: 1 }} region={location} initialRegion={location}>
//       <Marker
//         coordinate={{
//           latitude: location.latitude,
//           longitude: location.longitude,
//         }}
//       />
//     </MapView>
//   );
// };
// export default App;

// // "coords": Object {
// //   "accuracy": 15.211999893188477,
// //   "altitude": -3.1630274570690693,
// //   "altitudeAccuracy": 3,
// //   "heading": 316.06402587890625,
// //   "latitude": 40.63534,
// //   "longitude": -74.0295126,
// //   "speed": 0.14483816921710968,
// // }
