import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
  Button,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import apis from '../../../apis';

const CreatePost = ({ navigation }) => {
  const [image, setImage] = useState();
  const [content, setContent] = useState('');

  const handleUploadImage = async () => {
    const formData = new FormData();
    let fileName = image.uri.split('/').pop();
    const file = {
      uri: image.uri,
      type: 'image/jpeg',
      name: fileName,
    };
    formData.append('file', file);
    const { data } = await apis.upload.uploadFileToCloudinary({ formData });
    if (!data || !data.status) {
      alert('upload image failed');
      return null;
    }
    return data.result.link;
  };

  const choosePhotoFromLibrary = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(result);
    }
  };

  const handlePost = async () => {
    let imageUrl = null;
    let typeMedia = null;
    if (image) {
      imageUrl = await handleUploadImage();
      typeMedia = 'IMAGE';
    }

    const postInfo = {
      text: content,
      media: {
        typeMedia,
        url: imageUrl,
        description: null,
      },
    };
    const { data } = await apis.post.createPost({
      content: { ...postInfo },
    });
    if (data && data.status) {
      navigation.navigate('Diary');
    } else {
      alert('Cap nhat that bai');
    }
  };

  const handleBack = () => {
    navigation.navigate('Diary');
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
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          paddingVertical: 10,
          marginTop: 25,
          backgroundColor: '#ccc',
        }}
      >
        <TouchableOpacity onPress={handleBack}>
          <Ionicons
            name="arrow-back"
            style={{
              fontSize: 30,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePost}>
          <Text
            style={{
              color: 'blue',
              fontSize: 18,
              fontWeight: 'bold',
            }}
          >
            ĐĂNG
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        style={{
          padding: 20,
          marginBottom: 50,
        }}
      >
        <TextInput
          placeholder="Bạn đang nghĩ gì?"
          multiline
          style={{ fontSize: 20, marginBottom: 20 }}
          value={content}
          onChangeText={(text) => {
            setContent(text);
          }}
        />
        {image && (
          <View>
            <Image
              source={{
                uri: image.uri,
              }}
              style={{ width: '100%', height: 200 }}
            />
          </View>
        )}
      </ScrollView>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderTopWidth: 1,
          borderTopColor: '#ccc',
        }}
      >
        <View>
          <Ionicons
            name="happy-outline"
            style={{ fontSize: 30, color: '#000' }}
          />
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',

            alignItems: 'center',
          }}
        >
          <View style={{ marginRight: 20 }}>
            <TouchableOpacity onPress={choosePhotoFromLibrary}>
              <Ionicons
                name="image-outline"
                style={{ fontSize: 30, color: '#000' }}
              />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity>
              <Ionicons
                name="videocam-outline"
                style={{ fontSize: 30, color: '#000' }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
export default CreatePost;
