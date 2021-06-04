import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import { Text } from 'react-native';

import PostScreen from '../containers/Post';
import CreatePost from '../containers/Post/CreatePost';
import MessageScreen from '../containers/Message';
import ChatScreen from '../containers/Message/Chat';
import ContactScreen from '../containers/Contact';
import InformationScreen from '../containers/Information';
import CallApiScreen from '../containers/CallApi';
import CommentScreen from '../containers/Post/Comment';

const PostStack = createStackNavigator();

const PostStackScreen = () => {
  return (
    <PostStack.Navigator>
      <PostStack.Screen
        name="Diary"
        options={{ headerShown: false }}
        component={PostScreen}
      />
      <PostStack.Screen
        name="CreatePost"
        options={{ headerShown: false }}
        component={CreatePost}
      />
      <PostStack.Screen
        name="Comment"
        options={{ headerShown: false }}
        component={CommentScreen}
      />
    </PostStack.Navigator>
  );
};

const MessageStack = createStackNavigator();

const MessageStackScreen = () => {
  return (
    <MessageStack.Navigator>
      <MessageStack.Screen
        name="Message"
        options={{ headerShown: false }}
        component={MessageScreen}
      />
      <MessageStack.Screen
        name="Chat"
        options={{ headerShown: false }}
        component={ChatScreen}
      />
    </MessageStack.Navigator>
  );
};

const Tab = createBottomTabNavigator();

const HomeStackScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Post':
              iconName = focused ? 'time' : 'time-outline';
              break;
            case 'Message':
              iconName = focused
                ? 'chatbubble-ellipses'
                : 'chatbubble-ellipses-outline';
              break;
            case 'Contact':
              iconName = focused ? 'person-circle' : 'person-circle-outline';
              break;
            case 'CallApi':
              iconName = focused ? 'globe' : 'globe-outline';
              break;
            case 'More':
              iconName = focused ? 'apps' : 'apps-outline';
              break;
            default:
              iconName = 'add';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarLabel: ({ focused, color }) => {
          let name;
          switch (route.name) {
            case 'Post':
              name = focused ? 'Nhật ký' : null;
              break;
            case 'Message':
              name = focused ? 'Tin nhắn' : null;
              break;
            case 'Contact':
              name = focused ? 'Danh bạ' : null;
              break;
            case 'CallApi':
              name = focused ? 'API' : null;
              break;
            case 'More':
              name = focused ? 'Thêm' : null;
              break;
            default:
              name = null;
              break;
          }
          return name ? (
            <Text
              style={{
                fontSize: 13,
                fontWeight: 'bold',
                color: '#777',
              }}
            >
              {name}
            </Text>
          ) : null;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#0091ff',
        inactiveTintColor: '#777777',
      }}
    >
      <Tab.Screen name="Message" component={MessageStackScreen} />
      <Tab.Screen name="Contact" component={ContactScreen} />
      <Tab.Screen name="CallApi" component={CallApiScreen} />
      <Tab.Screen name="Post" component={PostStackScreen} />
      <Tab.Screen name="More" component={InformationScreen} />
    </Tab.Navigator>
  );
};

export default HomeStackScreen;
