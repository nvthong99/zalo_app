import React from 'react';
import { View, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const Header = () => {
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
        <TextInput
          style={{
            flexGrow: 1,
            color: '#fff',
            fontSize: 18,
          }}
          placeholderTextColor="#fff"
          editable
          placeholder="Tìm bạn bè, tin nhắn ..."
        />
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
