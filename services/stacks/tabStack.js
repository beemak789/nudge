import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TasksStack from './tasksStack';
import PlacesStack from './placesStack';
import FriendsStack from './friendsStack';
import GroupsStack from './groupsStack';
import ProfileStack from './profileStack';
import { Icon } from 'react-native-elements';

const Tab = createBottomTabNavigator();

const TabStack = () => {
  return (
    <Tab.Navigator
      initialRouteName="Tasks Stack"
      screenOptions={{
        activeTintColor: '#6ede8a',
        itemStyle: { marginVertical: 10 },
        inactiveTintColor: '#dde5b6',
        style: {
          backgroundColor: '#00818A',
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Tasks Stack"
        options={{
          tabBarIcon: () => (
            <Icon
              style={{ marginRight: 10 }}
              color="black"
              type="ionicon"
              name="list-outline"
              size={20}
            />
          ),
        }}
      >
        {(props) => <TasksStack {...props} />}
      </Tab.Screen>
      <Tab.Screen
        name="Places Stack"
        options={{
          tabBarIcon: () => (
            <Icon
              style={{ marginRight: 10 }}
              color="black"
              type="ionicon"
              name="location-outline"
              size={20}
            />
          ),
        }}
      >
        {(props) => <PlacesStack {...props} />}
      </Tab.Screen>
      <Tab.Screen
        name="Friends Stack"
        options={{
          tabBarIcon: () => (
            <Icon
              style={{ marginRight: 10 }}
              color="black"
              type="ionicon"
              name="people-outline"
              size={20}
            />
          ),
        }}
      >
        {(props) => <FriendsStack {...props} />}
      </Tab.Screen>
      <Tab.Screen
        name="Groups Stack"
        options={{
          tabBarIcon: () => (
            <Icon
              style={{ marginRight: 10 }}
              color="black"
              type="ionicon"
              name="chatbox-outline"
              size={20}
            />
          ),
        }}
      >
        {(props) => <GroupsStack {...props} />}
      </Tab.Screen>

      <Tab.Screen
        name="Profile Stack"
        options={{
          tabBarIcon: () => (
            <Icon
              style={{ marginRight: 10 }}
              color="black"
              type="ionicon"
              name="person-circle-outline"
              size={20}
            />
          ),
        }}
      >
        {(props) => <ProfileStack {...props} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default TabStack;
