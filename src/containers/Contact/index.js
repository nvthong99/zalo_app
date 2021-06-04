import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import apis from '../../apis';
import styles from './index.style';
import { setCookie, getCookie } from '../../utils/cookie';
import moment from 'moment';
import Header from '../../components/Header';

const ContactApiScreen = ({ navigation }) => {
  const [requestFriends, setRequestFriends] = useState([]);
  const [friends, setFriends] = useState([]);

  const fetchRequestFriends = async () => {
    const { data } = await apis.friend.getAllRequestFriendByMe();
    if (data && data.status) {
      setRequestFriends(data.result.data);
    }
  };

  const fetchFriends = async () => {
    const { data } = await apis.friend.getAllFriendByMe();
    if (data && data.status) {
      setFriends(data.result.data);
      await setCookie('friends', JSON.stringify([...data.result.data]));
    }
  };

  const fetchFriendsFromCookie = async () => {
    const listFriends = await getCookie('friends');
    if (listFriends) setFriends([...JSON.parse(listFriends)]);
    await fetchFriends();
  };

  useEffect(() => {
    fetchFriendsFromCookie();
    fetchRequestFriends();
  }, []);

  const handleAccept = (id, isAccept) => async () => {
    const { data } = await apis.friend.replyRequestAddFriend({
      to: id,
      isAccept,
    });
    if (data && data.status) {
      const pos = requestFriends.findIndex((el) => el.user.id === id);

      if (isAccept) {
        const newFriends = [...friends, { ...requestFriends[pos] }];
        setFriends([...nativeViewProps]);
        await setCookie('friends', JSON.stringify([...newFriends]));
      }

      setRequestFriends([...requestFriends.splice(pos, 1)]);
    }
  };

  return (
    <View style={{ backgroundColor: '#fff' }}>
      <Header navigation={navigation} />
      <View style={{ marginBottom: 20, padding: 10 }}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 15,
            paddingTop: 10,
            paddingBottom: 10,
            borderBottomColor: '#ccc',
            borderBottomWidth: 1,
          }}
        >
          Lời mời kết bạn
        </Text>
        {requestFriends.length <= 0 ? (
          <View>
            <Text style={{ textAlign: 'center', color: '#ccc', fontSize: 15 }}>
              Bạn hiện không có yêu cầu nào
            </Text>
          </View>
        ) : null}
        <View>
          {requestFriends.map((el) => (
            <View style={styles.comment} key={el.id}>
              <Image
                style={styles.commenterAvatar}
                source={{
                  uri: el.user.avatar,
                }}
              />
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <View style={styles.commentContent}>
                  <Text style={styles.commenterName}>{el.user.name}</Text>
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                  }}
                >
                  <TouchableOpacity
                    style={{ marginRight: 20 }}
                    onPress={handleAccept(el.user.id, true)}
                  >
                    <Text>Đồng ý</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleAccept(el.user.id, false)}>
                    <Text>Từ chối</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
      <View style={{ padding: 10 }}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 15,
            paddingTop: 10,
            paddingBottom: 10,
            borderBottomColor: '#ccc',
            borderBottomWidth: 1,
          }}
        >
          Lời mời kết bạn
        </Text>
        <View>
          {friends.map((el) => (
            <View style={styles.comment} key={el.id}>
              <Image
                style={styles.commenterAvatar}
                source={{
                  uri: el.user.avatar,
                }}
              />
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Personal', {
                    userId: el.user.id,
                  });
                }}
              >
                <View>
                  <View style={styles.commentContent}>
                    <Text style={styles.commenterName}>{el.user.name}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};
export default ContactApiScreen;
