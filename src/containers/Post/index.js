import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import apis from '../../apis';
import moment from 'moment';
import { useSelector } from 'react-redux';
import styles from './index.style';
import RBSheet from 'react-native-raw-bottom-sheet';
import Comment from './Comment';
import Report from './Report';

const limitBreakLine = 2;
const Diary = ({ navigation }) => {
  const refRBSheet = useRef();
  const [rbSheetInfo, setRBSheetInfo] = useState({
    height: 0,
    component: null,
  });
  const { user } = useSelector((state) => state.auth);

  const [posts, setPosts] = useState([]);
  const [listSeeMore, setListSeeMore] = useState([]);

  const handleOpenCreatePost = () => {
    navigation.navigate('CreatePost');
  };

  const fetchPosts = async () => {
    const { data } = await apis.post.getPosts();
    if (data && data.status) {
      setPosts(data.result.data);
    } else {
      alert('fetch data failed');
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleReactPost = async (id) => {
    const newPosts = [...posts];
    const indexPostReact = posts.findIndex((el) => el.id === id);
    newPosts[indexPostReact].reacts.push({
      user: user.id,
      type: 'HEART',
    });
    setPosts([...newPosts]);
    const { data } = await apis.post.reactPost(id);
    if (!data || !data.status) {
      alert('fetch data failed');
    }
  };

  const handleUnReactPost = async (id, pos) => {
    const newPosts = [...posts];
    const indexPostReact = posts.findIndex((el) => el.id === id);
    newPosts[indexPostReact].reacts.splice(pos, 1);
    setPosts([...newPosts]);
    const { data } = await apis.post.unReactPost(id);
    if (!data || !data.status) {
      alert('fetch data failed');
    }
  };

  const checkUserInReactPoss = ({ ...el }) => {
    const reactFind =
      el.reacts && el.reacts.findIndex((ele) => ele.user === user.id);
    return reactFind;
  };

  const handleStatusDisplayPost = (id, status) => {
    setListSeeMore({
      ...listSeeMore,
      [id]: status,
    });
  };
  const renderText = (id, text, status) => {
    if (text.trim()) {
      const numberOfLineBreaks = (text.match(/\n/g) || []).length;
      if (numberOfLineBreaks < limitBreakLine) {
        return <Text style={{ fontSize: 20 }}>{text}</Text>;
      }
      if (status) {
        return (
          <View>
            <Text style={{ fontSize: 20 }}>{text}</Text>
            <TouchableOpacity
              onPress={() => handleStatusDisplayPost(id, !status)}
            >
              <Text style={{ color: 'blue' }}>Rút gọn</Text>
            </TouchableOpacity>
          </View>
        );
      }
      const newText = text
        .split('\n')
        .slice(0, limitBreakLine)
        .reduce((str, i) => str + i + '\n', '');

      return (
        <View>
          <Text style={{ fontSize: 20 }}>
            {newText.slice(0, newText.length - 1)}
          </Text>
          <TouchableOpacity
            onPress={() => handleStatusDisplayPost(id, !status)}
          >
            <Text style={{ color: 'blue' }}>Xem thêm</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return <Text style={{ fontSize: 20 }}></Text>;
  };

  const handleOpenRBSheet = ({ height = 100, component }) => {
    setRBSheetInfo({
      height,
      component,
    });
    refRBSheet.current.open();
  };

  const handleCloseRBSheet = () => {
    refRBSheet.current.close();
  };

  const handleOpenMore = (id) => {
    handleOpenRBSheet({
      height: 500,
      component: (
        <Comment postId={id} handleCloseRBSheet={handleCloseRBSheet} />
      ),
    });
  };
  const handleOpenComment = (id) => {
    handleOpenRBSheet({
      height: 80,
      component: <Report postId={id} handleCloseRBSheet={handleCloseRBSheet} />,
    });
  };

  return (
    <View style={{ backgroundColor: '#eee' }}>
      <ScrollView style={{ marginBottom: 80 }}>
        <View style={{ marginTop: 12 }}>
          <View style={styles.boxFeel}>
            <Image
              style={styles.avatar}
              source={{
                uri: user.avatar,
              }}
            />
            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                flexGrow: 1,
              }}
            >
              <Text
                style={{
                  color: '#000',
                  fontSize: 18,
                }}
                onPress={handleOpenCreatePost}
              >
                Hôm nay bạn thế nào?
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {posts.map((el) => {
          const reactStatus = checkUserInReactPoss(el);
          return (
            <View
              key={el.id}
              style={{
                backgroundColor: '#fff',
                marginTop: 12,
              }}
            >
              <View style={styles.headerPost}>
                <Image
                  style={styles.headerAvatarAuthor}
                  source={{
                    uri: el.author && el.author.avatar,
                  }}
                />
                <View style={{ flexGrow: 1 }}>
                  <Text style={{ fontSize: 18, marginBottom: 5 }}>
                    {el.author.name}
                  </Text>
                  <Text style={{ fontSize: 15, color: '#ccc' }}>
                    {moment(el.createdAt).format('LLL')}
                  </Text>
                </View>
                <View>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => handleOpenMore(el.id)}
                  >
                    <Ionicons
                      style={{ fontSize: 25, color: '#ccc' }}
                      name="ellipsis-horizontal"
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={{ paddingRight: 15, paddingLeft: 15, paddingBottom: 15 }}
              >
                {renderText(el.id, el.content.text, listSeeMore[el.id])}
              </View>
              {el.content.media && el.content.media.url && (
                <View>
                  <Image
                    style={{
                      height: 300,
                      width: '100%',
                    }}
                    source={{
                      uri: el.content.media && el.content.media.url,
                    }}
                  />
                </View>
              )}
              <View style={styles.actionPostContainer}>
                <View style={styles.actionPost}>
                  <View style={styles.reactPost}>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => {
                        if (reactStatus < 0) handleReactPost(el.id);
                        else handleUnReactPost(el.id, reactStatus);
                      }}
                    >
                      <Ionicons
                        style={{
                          fontSize: 25,
                          color: reactStatus >= 0 ? 'red' : '#ccc',
                          marginRight: 5,
                        }}
                        name={reactStatus >= 0 ? 'heart' : 'heart-outline'}
                      />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 20 }}>
                      {(el.reacts && el.reacts.length) || 0}
                    </Text>
                  </View>

                  <View style={styles.actionPost}>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => handleOpenComment(el.id)}
                    >
                      <Ionicons
                        style={styles.commentIcon}
                        name="chatbox-ellipses-outline"
                      />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 20 }}>30</Text>
                  </View>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={rbSheetInfo.height}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}
      >
        {rbSheetInfo.component}
      </RBSheet>
    </View>
  );
};

export default Diary;
