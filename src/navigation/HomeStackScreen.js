import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import COLORS from '../constants/colors';
import { Text } from 'react-native';

import DiaryScreen from '../containers/Diary';
import MessageScreen from '../containers/Message';
import ContactScreen from '../containers/Contact';
import InformationScreen from '../containers/Information';
import CallApiScreen from '../containers/CallApi';

const Tab = createBottomTabNavigator();

const DiaryStackScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Diary':
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
            case 'Diary':
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
      <Tab.Screen name="Message" component={MessageScreen} />
      <Tab.Screen name="Contact" component={ContactScreen} />
      <Tab.Screen name="CallApi" component={CallApiScreen} />
      <Tab.Screen name="Diary" component={DiaryScreen} />
      <Tab.Screen name="More" component={InformationScreen} />
    </Tab.Navigator>
  );
};

export default DiaryStackScreen;
