import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import apis from '../../apis';
import { useSelector } from 'react-redux';

const SearchFriend = ({ navigation }) => {
  const timeRef = useRef();
  const { user } = useSelector((state) => state.auth);
  const [keySearch, setKeySearch] = useState();
  const [userSearch, setUserSearch] = useState();
  const handleSearch = async (text) => {
    const { data } = await apis.user.searchUser(text);
    if (data && data.status) {
      setUserSearch(data.result.data);
    }
  };
  const handleChange = (text) => {
    setUserSearch('');
    clearImmediate(timeRef.current);
    if (text.trim()) {
      timeRef.current = setTimeout(() => {
        handleSearch(text);
      }, 1000);
    }
  };

  const handleRequestAddFriend = (id) => async () => {
    const { data } = await apis.friend.requestAddFriend(id);
    if (data && data.status) {
      setUserSearch({
        ...userSearch,
        status: 'REQUEST',
      });
    }
  };

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
          onChangeText={handleChange}
        />
      </View>

      <View>
        {!userSearch ? (
          <Text>No result</Text>
        ) : (
          <ScrollView>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                navigation.navigate('Personal', {
                  userId: userSearch.friend.id,
                });
              }}
            >
              <Image
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 50,
                  marginRight: 20,
                }}
                source={{
                  uri: userSearch.friend.avatar,
                }}
              />
            </TouchableOpacity>
            <View style={{ flexGrow: 1 }}>
              <Text style={{ fontSize: 18, marginBottom: 5 }}>
                {userSearch.friend.name}
              </Text>
            </View>
            <View>
              {userSearch.status === 'STRANGER' &&
              userSearch.friend.id !== user.id ? (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={handleRequestAddFriend(userSearch.friend.id)}
                >
                  <Text>Kết bạn</Text>
                </TouchableOpacity>
              ) : userSearch.status === 'REQUEST' &&
                userSearch.friend.id !== user.id ? (
                <Text style={{ color: '#ccc' }}>Đang yêu cầu</Text>
              ) : null}
            </View>
          </ScrollView>
        )}
      </View>
    </>
  );
};

export default SearchFriend;
