import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import apis from '../../apis';
import styles from './index.style';
import Header from '../../components/Header';
import { useSelector } from 'react-redux';

const MessageApiScreen = ({ navigation }) => {
  const [conversations, setConversations] = useState([]);
  const { user } = useSelector((state) => state.auth);

  const fetchConversations = async () => {
    const { data } = await apis.conversation.getAllConversationByMe();
    if (data && data.status) {
      const temp = data.result.data.map((el) => {
        let isBlock = false;
        let friend;
        if (el.blockMessage.find((ele) => ele === user.id)) {
          isBlock = true;
        }
        if (user.id === el.userA) {
          friend = { ...el.userB };
        } else {
          friend = { ...el.userA };
        }
        return {
          id: el.id,
          messages: [...el.messages],
          friend,
          isBlock,
        };
      });
      setConversations([...temp]);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  return (
    <View>
      <Header />
      <Text>Message</Text>
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
