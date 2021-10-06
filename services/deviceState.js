// import AsyncStorage from '@react-native-async-storage/async-storage';

// const deviceState = {
//   async loadJWT() {
//     try {
//       const token = await AsyncStorage.getItem('id_token');
//       if (token !== null) {
//         this.setState({
//           jwt: token,
//           loading: false,
//         });
//       } else {
//         this.setState({
//           loading: false,
//         });
//       }
//     } catch (error) {
//       console.log('AsyncStorage Error: ' + error.message);
//     }
//   },
//   async getJWT() {
//     try {
//       const token = await AsyncStorage.getItem('id_token');
//       if (token) {
//         return token;
//       }
//     } catch (error) {
//       console.log('AsyncStorage Error: ' + error.message);
//     }
//   },

//   async saveItem(key, value) {
//     try {
//       await AsyncStorage.setItem(key, value);
//     } catch (error) {
//       console.log('AsyncStorage Error: ' + error.message);
//     }
//   },

//   async deleteJWT() {
//     try {
//       await AsyncStorage.removeItem('id_token').then(() => {
//         this.setState({
//           jwt: '',
//         });
//       });
//     } catch (error) {
//       console.log('AsyncStorage Error: ' + error.message);
//     }
//   },
// };

// export default deviceState;
