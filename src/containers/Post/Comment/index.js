import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import apis from '../../../apis';
import styles from './index.style';

const Comment = ({ postId, handleCloseRBSheet }) => {
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

  useEffect(() => {
    fetchComments();
  }, []);

  const handleSend = () => {
    const { data } = await apis.post.createComment(postId, text);
    if (data && data.status) {
    }
  };

  return (
    <View style={{ flexDirection: 'column', flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View style={styles.content}>
          <Text style={styles.headerContent}>Bình luận</Text>
        </View>
        {comments.map((el) => (
          <View style={styles.comment}>
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
                  {el.commenter.createdAt}
                </Text>
              </View>
              <Text style={{ fontSize: 15, color: '#000' }}>{el.content}</Text>
            </View>
          </View>
        ))}
      </View>
      <View style={styles.sendBox}>
        <TextInput
          placeholder="Nhập input"
          value={text}
          onChangeText={(txt) => {
            setText(txt);
          }}
        />
        <TouchableOpacity onPress={handleSend}>
          <Text>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Comment;
