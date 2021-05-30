import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import apis from '../../apis';
import moment from 'moment';
import { useSelector } from 'react-redux';

const limitBreakLine = 2;
const Diary = ({ navigation }) => {
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
      numberOfLineBreaks = (text.match(/\n/g) || []).length;
      if (numberOfLineBreaks < limitBreakLine) {
        return <Text style={{ fontSize: 20 }}>{text}</Text>;
      }
      console.log(status);
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
      console.log(newText);
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
  return (
    <View style={{ backgroundColor: '#eee' }}>
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
        />
        <Ionicons
          style={{
            paddingLeft: 20,
            fontSize: 25,
            color: '#fff',
            marginRight: 20,
          }}
          name="image-outline"
        />
        <Ionicons
          style={{
            fontSize: 25,
            color: '#fff',
          }}
          name="notifications-outline"
        />
      </View>
      <ScrollView style={{ marginBottom: 80 }}>
        <View style={{ marginTop: 12 }}>
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row',
              padding: 15,
              backgroundColor: '#fff',
            }}
          >
            <Image
              style={{
                width: 60,
                height: 60,
                borderRadius: 50,
                marginRight: 20,
              }}
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
          {/* <View
          style={{
            marginRight: 15,
            marginBottom: 15,
            marginLeft: 15,
            height: 1,
            backgroundColor: '#ccc',
          }}
        /> */}
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
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 15,
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
                  <Ionicons
                    style={{ fontSize: 25, color: '#ccc' }}
                    name="ellipsis-horizontal"
                  />
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
                      uri:
                        (el.content.media && el.content.media.url) ||
                        'https://jssors8.azureedge.net/demos/image-slider/img/faded-monaco-scenery-evening-dark-picjumbo-com-image.jpg',
                    }}
                  />
                </View>
              )}
              <View
                style={{
                  padding: 15,
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginRight: 30,
                    }}
                  >
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

                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => {
                        const reactFind =
                          el.reacts &&
                          el.reacts.find((ele) => ele.user === user.id);
                        if (reactFind) handleReactPost(el.id);
                        else handleUnReactPost(el.id);
                      }}
                    >
                      <Ionicons
                        style={{
                          fontSize: 25,
                          color: '#ccc',
                          marginRight: 5,
                        }}
                        name="chatbox-ellipses-outline"
                      />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 20 }}>30</Text>
                  </View>
                </View>
                {/* <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Text style={{ fontSize: 15, color: '#ccc', marginRight: 5 }}>
                  Thích bởi
                </Text>
                <Image
                  style={{
                    width: 25,
                    height: 25,
                    borderRadius: 25,
                  }}
                  source={{
                    uri: 'https://jssors8.azureedge.net/demos/image-slider/img/faded-monaco-scenery-evening-dark-picjumbo-com-image.jpg',
                  }}
                />
                <View
                  style={{
                    width: 25,
                    height: 25,
                    borderRadius: 25,
                    backgroundColor: '#ccc',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    left: -5,
                    borderWidth: 1,
                    borderColor: '#fff',
                  }}
                >
                  <Text style={{ fontSize: 10 }}>+10</Text>
                </View>
              </View> */}
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Diary;
