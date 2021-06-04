import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import apis from '../../apis';
import styles from './index.style';
import Header from '../../components/Header';
import { useSelector } from 'react-redux';

const MessageApiScreen = ({ navigation }) => {
  const ref = useRef();
  const [conversations, setConversations] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const { socket } = useSelector((state) => state.socket);

  const fetchConversations = async (data) => {
    const temp = data.map((el) => {
      let isBlock = false;
      let friend;
      if (el.blockMessage.find((ele) => ele.equals(user.id))) {
        isBlock = true;
      }

      if (user.id === el.userB._id.toString()) {
        friend = { ...el.userA, id: el.userA._id };
      } else {
        friend = { ...el.userB, id: el.userB._id };
      }
      return {
        id: el._id,
        messages: [...el.messages],
        friend,
        isBlock,
      };
    });
    setConversations([...temp]);
  };
  useEffect(() => {
    if (socket) {
      socket.emit('CLIENT_JOIN_CHAT');
      ref.current = socket;
      socket.on('SERVER_SEND_LIST_CONVERSATION', (data) => {
        fetchConversations([...data]);
      });
    }
  }, [socket]);

  return (
    <View>
      <Header navigation={navigation} />
      <ScrollView>
        {conversations.map((el) => (
          <View style={styles.comment} key={el.id}>
            <Image
              style={styles.commenterAvatar}
              source={{
                uri: el.friend.avatar,
              }}
            />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Chat', {
                  conversation: { ...el },
                });
              }}
            >
              <View>
                <View style={styles.commentContent}>
                  <Text style={styles.commenterName}>{el.friend.name}</Text>
                  <Text style={styles.msg}>
                    {el.messages[el.messages.length - 1].message}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};
export default MessageApiScreen;
