import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

const AuthScreen = ({ navigation }) => {
  const handleOpenLogin = () => {
    navigation.navigate('Login');
  };

  const handleOpenRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <View>
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: 40,
          marginBottom: 5,
        }}
      >
        <Image
          source={require('../../../assets/logo.png')}
          style={{ width: 90, height: 30, resizeMode: 'stretch' }}
        />
      </View>
      <View style={{ marginBottom: 50 }}>
        <Image
          source={require('../../../assets/icon.png')}
          style={{ width: '100%', height: 200, resizeMode: 'stretch' }}
        />
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 20,
            marginRight: 20,
            marginTop: 5,
          }}
        >
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 18,
              marginBottom: 5,
            }}
          >
            Gọi video ổn định
          </Text>
          <Text
            style={{
              color: 'gray',
            }}
          >
            Trò chuyện thật đã với chất lượng video ổn định mọi lúc, mọi nơi
          </Text>
        </View>
      </View>
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            backgroundColor: '#0091ff',
            width: '70%',
            paddingHorizontal: 0,
            paddingVertical: 15,
            borderRadius: 40,
            marginBottom: 15,
          }}
          onPress={handleOpenLogin}
        >
          <Text
            style={{
              color: '#fff',
              fontSize: 20,
              textTransform: 'uppercase',
              textAlign: 'center',
            }}
          >
            Đăng nhập
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: '#eee',
            width: '70%',
            paddingHorizontal: 0,
            paddingVertical: 15,
            borderRadius: 40,
          }}
          onClick={handleOpenRegister}
        >
          <Text
            style={{
              color: '#000',
              fontSize: 20,
              textTransform: 'uppercase',
              textAlign: 'center',
            }}
          >
            Đăng ký
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default AuthScreen;
