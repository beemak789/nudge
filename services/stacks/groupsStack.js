import React from 'react';
import { Text, SafeAreaView } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useSelector } from 'react-redux';

const Tab = createMaterialTopTabNavigator();

// components
import GroupsList from '../../Components/GroupsList';
import AddGroup from '../../Components/AddGroup';
import EditGroup from '../../Components/EditGroup';
import AddGroupTask from '../../Components/AddGroupTask';
import SingleGroup from '../../Components/SingleGroup';
import GroupChat from '../../Components/GroupChat';
import SingleGroupList from '../../Components/SingleGroupList';
import SingleGroupSettings from '../../Components/SingleGroupSettings';
const Stack = createNativeStackNavigator();

const SingleGroupStack = (props) => {
  const selectedGroup = useSelector((state) => state.groups.selectedGroup);


  return (
    <>
      <SafeAreaView style={{ backgroundColor: 'white' }}>
        <Text
          style={{
            fontSize: 30,
            textAlign: 'center',
            fontWeight: 'bold',
            margin: 5,
            backgroundColor: 'white',
          }}
        >
          {selectedGroup.group.name}
        </Text>
      </SafeAreaView>
      <Tab.Navigator
        initialRouteName="Tasks"
        screenOptions={{
          activeTintColor: 'white',
          itemStyle: { marginVertical: 10 },
          inactiveTintColor: 'white',
          headerShown: false,
          // style: { position: 'relative', top: 100 },
        }}
      >
        <Tab.Screen name="Tasks" component={SingleGroupList} {...props} />

        <Tab.Screen
          name="Chat"
          component={GroupChat}
          options={{ headerShown: false }}
          {...props}
        />

        <Tab.Screen
          name="Settings"
          component={SingleGroupSettings}
          {...props}
        />
      </Tab.Navigator>
    </>
  );
};

const groupsStack = (props) => {
  return (
    <Stack.Navigator
      initialRouteName="Group List"
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: 'white',
        },
        headerTintColor: 'white',
        headerBackTitle: '',
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="Group List"
        component={GroupsList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Add Group"
        component={AddGroup}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Edit Group"
        component={EditGroup}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Single Group" component={SingleGroup} />

      <Stack.Screen
        name="Single Group Stack"
        options={{
          headerShown: false,
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: 'white',
            headerStyle: {
              elevation: 0,
              shadowOpacity: 0,
              borderBottomWidth: 0,
            },
          },
        }}
      >
        {(props) => <SingleGroupStack {...props} />}
      </Stack.Screen>
      <Stack.Screen name="Add Group Task" component={AddGroupTask} />
    </Stack.Navigator>
  );
};

export default groupsStack;
