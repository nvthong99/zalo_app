import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import { useSelector } from 'react-redux';
import apis from '../../../apis';
import styles from './index.style';
import moment from 'moment';
import Ionicons from '@expo/vector-icons/Ionicons';

const PersonalScreen = ({ route, navigation }) => {
  const ref = useRef();
  const scrollViewRef = useRef();
  const { conversation } = route.params;
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const { user } = useSelector((state) => state.auth);
  const { socket } = useSelector((state) => state.socket);

  console.log(conversation);
  useEffect(() => {
    setMessages([...conversation.messages]);
  }, [conversation]);

  useEffect(() => {
    if (socket) {
      ref.current = socket;
      socket.on('SERVER_SEND_LIST_CONVERSATION', (data) => {
        fetchConversations([...data]);
      });
    }
  }, [socket]);

  useEffect(() => {
    ref.current.on('SERVER_SEND_MSG', (data) => {
      console.log(data);
      setMessages([...messages, { ...data }]);
    });
  });

  const handleSend = () => {
    const data = {
      message: text,
      conversation: conversation.id,
      from: user.id,
      to: conversation.friend.id,
    };
    ref.current.emit('CLIENT_SEND_MSG', { ...data });
    setMessages([...messages, { ...data }]);
    setText('');
  };
  return (
    <View
      style={{
        flexDirection: 'column',
        flex: 1,
      }}
    >
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          padding: 10,
          backgroundColor: '#53abfb',
          alignItems: 'center',
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
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: '#fff',
            flexGrow: 1,
          }}
        >
          {conversation.friend.name}
        </Text>
        <View>
          <TouchableOpacity>
            <Ionicons
              name="close-circle-outline"
              style={{ color: '#fff', fontSize: 20 }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        style={{ backgroundColor: '#e5ebf0', padding: 20 }}
        ref={scrollViewRef}
        onContentSizeChange={() =>
          scrollViewRef.current.scrollToEnd({ animated: true })
        }
      >
        {messages.map((el, index) => {
          return (
            <View key={index}>
              <Text>
                {el.from === user.id ? (
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      marginBottom: 10,
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: '#c4eef3',
                        borderColor: '#ccc',
                        display: 'flex',
                        paddingHorizontal: 8,
                        paddingTop: 8,
                        paddingBottom: 5,
                        borderWidth: 1,
                        borderColor: '#ccc',
                        borderRadius: 5,
                        maxWidth: '60%',
                      }}
                    >
                      <Text>{el.message}</Text>
                      <Text style={{ fontSize: 10, color: '#848993' }}>
                        {moment(el.createdAt).format('LLL')}
                      </Text>
                    </View>
                  </View>
                ) : (
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      marginBottom: 10,
                    }}
                  >
                    <Image
                      source={{ uri: conversation.friend.avatar }}
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: 20,
                        marginRight: 5,
                        borderWidth: 1,
                        borderColor: '#ccc',
                      }}
                    />
                    <View
                      style={{
                        display: 'flex',
                        backgroundColor: '#fff',
                        paddingHorizontal: 8,
                        paddingTop: 8,
                        paddingBottom: 5,
                        borderWidth: 1,
                        borderColor: '#ccc',
                        borderRadius: 5,
                      }}
                    >
                      <Text>{el.message}</Text>
                      <Text style={{ fontSize: 10, color: '#ccc' }}>
                        {moment(el.createdAt).format('LLL')}
                      </Text>
                    </View>
                  </View>
                )}
              </Text>
            </View>
          );
        })}
      </ScrollView>
      <View style={styles.sendBox}>
        <TextInput
          placeholder="Nhập input"
          value={text}
          onChangeText={(txt) => {
            setText(txt);
          }}
          onKeyPress={(e) => {
            if (e.nativeEvent.key == 'Enter') {
              handleSend();
            }
          }}
          style={{ padding: 10, flexGrow: 1, marginRight: 10, borderWidth: 0 }}
        />
        <TouchableOpacity onPress={handleSend}>
          <Ionicons
            style={{ fontSize: 20, color: 'blue' }}
            name="send-outline"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default PersonalScreen;
