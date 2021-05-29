import React, { useState } from 'react';
import { View, Text, TextInput, Image, ScrollView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const Diary = ({ route }) => {
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
                uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png',
              }}
            />
            <TextInput
              style={{
                flexGrow: 1,
                color: '#000',
                fontSize: 18,
              }}
              editable
              placeholder="Hôm nay bạn thế nào?"
            />
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
        <View
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
                uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png',
              }}
            />
            <View style={{ flexGrow: 1 }}>
              <Text style={{ fontSize: 18, marginBottom: 5 }}>Test Ten</Text>
              <Text style={{ fontSize: 15, color: '#ccc' }}>
                30/05 lúc 21:00
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
            <Text style={{ fontSize: 20 }}>Đảo cò mùa covid</Text>
          </View>
          <View>
            <Image
              style={{
                height: 300,
                width: '100%',
              }}
              source={{
                uri: 'https://jssors8.azureedge.net/demos/image-slider/img/faded-monaco-scenery-evening-dark-picjumbo-com-image.jpg',
              }}
            />
          </View>
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
                <Ionicons
                  style={{ fontSize: 25, color: '#ccc', marginRight: 5 }}
                  name="heart-outline"
                />
                <Text style={{ fontSize: 20 }}>30</Text>
              </View>

              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Ionicons
                  style={{ fontSize: 25, color: '#ccc', marginRight: 5 }}
                  name="chatbox-ellipses-outline"
                />
                <Text style={{ fontSize: 20 }}>30</Text>
              </View>
            </View>
            <View
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
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Diary;
