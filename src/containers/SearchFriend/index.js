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
    <View style={{ backgroundColor: '#fff' }}>
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
          alignItems: 'center',
          backgroundColor: '#53abfb',
          color: '#fff',
          padding: 15,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Message');
          }}
        >
          <Ionicons
            name="arrow-back"
            style={{ fontSize: 20, color: '#fff', marginRight: 10 }}
          />
        </TouchableOpacity>
        <TextInput
          style={{
            flexGrow: 1,
            color: '#fff',
            fontSize: 20,
          }}
          placeholderTextColor="#fff"
          editable
          placeholder="Tìm bạn bè, tin nhắn ..."
          onChangeText={handleChange}
        />
      </View>

      <View style={{ padding: 10 }}>
        {!userSearch ? (
          <Text
            style={{
              fontSize: 15,
              color: '#ccc',
              textAlign: 'center',
              marginTop: 10,
            }}
          >
            No result
          </Text>
        ) : (
          <ScrollView>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
              }}
            >
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
                    width: 30,
                    height: 30,
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
            </View>
          </ScrollView>
        )}
      </View>
    </View>
  );
};

export default SearchFriend;
