import React, { useEffect, useRef, useState } from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';
import { useSelector } from 'react-redux';
import apis from '../../../apis';
import styles from './index.style';
import moment from 'moment';

const Comment = ({ route }) => {
  const ref = useRef();
  const scrollViewRef = useRef();
  const { postId } = route.params;
  const { user } = useSelector((state) => state.auth);
  const { socket } = useSelector((state) => state.socket);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');

  const fetchComments = async () => {
    const { data } = await apis.post.getAllCommentByPost(postId);
    if (data && data.status) {
      setComments(data.result.data);
    } else {
      alert('fetch data failed');
    }
  };

  const handleAddComment = (data) => {
    setComments([...comments, { ...data }]);
  };

  useEffect(() => {
    fetchComments();
    if (socket) {
      ref.current = socket;
      socket.emit('CLIENT_JOIN_COMMENT', { postId });
    }
  }, []);

  useEffect(() => {
    ref.current.on('SERVER_SEND_COMMENT', handleAddComment);
  });

  const handleSend = async () => {
    ref.current.emit('CLIENT_SEND_COMMENT', {
      postId,
      content: text,
    });
    setText('');
  };

  if (!user) {
    return <Text>Loading...</Text>;
  }
  return (
    <View style={{ flexDirection: 'column', flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View style={styles.content}>
          <Text style={styles.headerContent}>Bình luận</Text>
        </View>
        <ScrollView
          style={{
            marginBottom: 50,
          }}
          ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef.current.scrollToEnd({ animated: true })
          }
        >
          {comments.map((el, index) => (
            <View style={styles.comment} key={index}>
              <Image
                style={styles.commenterAvatar}
                source={{
                  uri: el.commenter.avatar,
                }}
              />
              <View>
                <View style={styles.commentContent}>
                  <Text style={styles.commenterName}>{el.commenter.name}</Text>
                  <Text style={{ fontSize: 13, color: '#ccc' }}>
                    {moment(el.createdAt).calendar()}
                  </Text>
                </View>
                <Text style={{ fontSize: 15, color: '#000' }}>
                  {el.content}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
      <View style={styles.sendBox}>
        <TextInput
          placeholder="Nhập input"
          value={text}
          onChangeText={(txt) => {
            setText(txt);
          }}
          style={{ padding: 10 }}
        />
        <TouchableOpacity
          onPress={handleSend}
          style={{
            padding: 5,
            backgroundColor: 'blue',
          }}
        >
          <Text style={{ fontWeight: 'bold', color: '#fff' }}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Comment;
