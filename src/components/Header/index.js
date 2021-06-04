import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const Header = ({ navigation }) => {
  return (
    <>
      <View
        style={{
          height: 25,
          backgroundColor: '#0091ff',
        }}
      />

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          backgroundColor: '#53abfb',
          color: '#fff',
          padding: 15,
        }}
      >
        <Ionicons
          name="search-outline"
          style={{
            fontSize: 25,
            color: '#fff',
            marginRight: 20,
          }}
        />
        <TouchableOpacity
          style={{ flexGrow: 1 }}
          onPress={() => {
            navigation.navigate('SearchFriend');
          }}
        >
          <Text
            style={{
              color: '#fff',
              fontSize: 18,
            }}
          >
            Tìm bạn bè, tin nhắn ...
          </Text>
        </TouchableOpacity>

        <Ionicons
          style={{
            paddingLeft: 20,
            fontSize: 25,
            color: '#fff',
            marginRight: 20,
          }}
          name="image-outline"
        />
        <Ionicons
          style={{
            fontSize: 25,
            color: '#fff',
          }}
          name="notifications-outline"
        />
      </View>
    </>
  );
};

export default Header;
