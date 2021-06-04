import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import apis from '../../apis';
import styles from './index.style';
import Header from '../../components/Header';

const MessageApiScreen = ({ navigation }) => {
  const [conversations, setConversation] = useState([]);
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
      </ScrollView>
    </View>
  );
};
export default MessageApiScreen;
