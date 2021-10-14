import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  Image,
  Button,
  FlatList,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { selectGroup } from '../store/group'

const SingleGroup = (props) => {
  const dispatch = useDispatch();
  const group = useSelector((state) => state.selectedGroup)
  return (
      <View style={styles.box}>
              <Image
                style={styles.image}
                source={require('../public/nudgie2.png')}
              />
              <View style={styles.info}>
                <TouchableOpacity
                  onPress={() => {
                    dispatch(selectGroup(props.group.id));
                    props.navigation.navigate('Group List');
                  }}
                >
                  <Text style={styles.buttonText}>{props.group.name}</Text>
                </TouchableOpacity>
              </View>
              <Button
                style={styles.completedButton}
                title="Alert"
                onPress={() => {
                  console.log('sending bat signal');
                }}
              ></Button>
      </View>
  );
};

export default SingleGroup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: 20,
  },
  completedButton: {
    marginRight: 10,
    borderColor: '#2e64e5',
    borderWidth: 2,
    borderRadius: 3,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginHorizontal: 5,
  },
  item: {
    fontSize: 20,
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
  },
  image: {
    width: 80,
    height: 80,
    // borderWidth: 1,
    borderColor: '#FFFFFF',
    margin: 15,
    // backgroundColor: '#FAF3DD',
  },
  box: {
    display: 'flex',
    width: '95%',
    margin: 10,
    borderRadius: 10,
    backgroundColor: '#EBF6EF',
    flexDirection: 'row',
    shadowColor: 'black',
    alignItems: 'center',
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 1,
      width: -2,
    },
    elevation: 2,
  },
  info: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginLeft: 15,
    padding: 5,
  },
  item: {
    padding: 10,
    fontSize: 18,
    alignSelf: 'center',
    textAlign: 'center',
  },
  priority: {
    marginLeft: 'auto',
    marginBottom: 'auto',
    backgroundColor: 'red',
    width: 25,
    height: 25,
    borderRadius: 4,
    shadowColor: 'black',
    shadowOpacity: 0.1,
  },
  button: {
    backgroundColor: '#EBF6EF',
    padding: 5,
    borderRadius: 25,
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: '#FFFFFF',
    margin: 5,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 1,
      width: -2,
    },
    elevation: 2,
  },
  buttonText: {
    color: '#4a7c59',
    fontWeight: '700',
    fontSize: 22,
  },
  nudgie: {
    width: 50,
    height: 50,
    backgroundColor: 'transparent',
    margin: 5,
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    margin: 5,
  },
});

// const taskList = (props) => {
//   const dispatch = useDispatch();
//   const navigation = useNavigation();
//   const { tasks } = useSelector((state) => state.task);

//   const incompleteTasks = tasks.filter((task) => task.completed === false);

//   useEffect(() => {
//     dispatch(_fetchAllTasks());
//   }, [dispatch]);

//   if (!incompleteTasks.length) {
//     return (
//       <SafeAreaView style={styles.container}>
//         <View>
//           <Text style={styles.noTasksText}>You don't have any tasks...</Text>
//           <TouchableOpacity
//             style={styles.button}
//             onPress={(props) => {
//               navigation.navigate('Add Task');
//             }}
//           >
//             <Image
//               style={styles.nudgie}
//               source={require('../public/nudgie2.png')}
//             />
//             <Text style={styles.buttonText}>Add a Task!</Text>
//           </TouchableOpacity>
//         </View>
//       </SafeAreaView>
//     );
//   }

//   const updateCompleteStatus = (item) => {
//     dispatch(_updateCompleteStatus(item));
//   };
//   const deleteTask = (itemId) => {
//     dispatch(_deleteTask(itemId));
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={{ marginLeft: 'auto', padding: 5 }}>
//         <AntDesign.Button
//           name="pluscircle"
//           size={30}
//           color="#83CA9E"
//           backgroundColor="transparent"
//           onPress={() => {
//             props.navigation.navigate('Add Task');
//           }}
//         />
//       </View>
//       <View style={styles.body}>
//         <FlatList
//           data={incompleteTasks}
//           keyExtractor={(item) => item.id}
//           renderItem={({ item }) => (
//             <Swipeable
//               renderLeftActions={LeftSwipeActions}
//               renderRightActions={RightSwipeActions}
//               onSwipeableRightOpen={() => deleteTask(item.id)}
//               onSwipeableLeftOpen={() => updateCompleteStatus(item)}
//             >
//               <View style={styles.box}>
//                 <View style={styles.info}>
//                   <Text style={styles.item}>{item.name}</Text>
//                 </View>
//                 <View style={priorityStyle(item.priority)}></View>
//               </View>
//             </Swipeable>
//           )}
//         ></FlatList>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default taskList;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'space-evenly',
//     padding: 20,
//   },

//   item: {
//     fontSize: 20,
//   },
//   body: {
//     flex: 1,
//     justifyContent: 'center',
//     padding: 10,
//   },
//   image: {
//     width: 80,
//     height: 80,
//     borderWidth: 1,
//     borderColor: '#FFFFFF',
//     margin: 15,
//     backgroundColor: '#FAF3DD',
//   },
//   box: {
//     alignSelf: 'center',
//     display: 'flex',
//     width: '95%',
//     borderRadius: 10,
//     backgroundColor: '#EBF6EF',
//     flexDirection: 'row',
//     shadowColor: 'black',
//     alignItems: 'center',
//     shadowOpacity: 0.2,
//     shadowOffset: {
//       height: 1,
//       width: -2,
//     },
//     elevation: 2,
//   },
//   info: {
//     flexDirection: 'column',
//     justifyContent: 'flex-start',
//     padding: 5,
//   },
//   item: {
//     padding: 10,
//     fontSize: 18,
//     alignSelf: 'center',
//     textAlign: 'center',
//   },
//   priority: {
//     marginLeft: 'auto',
//     marginBottom: 'auto',
//     backgroundColor: 'red',
//     width: 25,
//     height: 25,
//     borderRadius: 4,
//     shadowColor: 'black',
//     shadowOpacity: 0.1,
//   },
//   button: {
//     backgroundColor: '#EBF6EF',
//     padding: 5,
//     borderRadius: 25,
//     alignItems: 'center',
//     flexDirection: 'row',
//     borderColor: '#FFFFFF',
//     margin: 5,
//     shadowColor: 'black',
//     shadowOpacity: 0.2,
//     shadowOffset: {
//       height: 1,
//       width: -2,
//     },
//     elevation: 2,
//   },
//   buttonText: {
//     color: '#4a7c59',
//     fontWeight: '700',
//     fontSize: 22,
//   },
//   nudgie: {
//     width: 50,
//     height: 50,
//     backgroundColor: 'transparent',
//     margin: 5,
//   },
//   noTasksText: {
//     fontWeight: '700',
//     fontSize: 20,
//   },
// });

