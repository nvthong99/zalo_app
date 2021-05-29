import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import actions from '../../redux/actions';
import { responseCodes } from '../../enums';

const LoginScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const { loginCode, isLoggingIn } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isLoggingIn) return;
    switch (loginCode) {
      case responseCodes.USER_NOT_FOUND:
        alert('Account not exists');
        break;
      case responseCodes.WRONG_PASSWORD:
        alert('Password not match');
        break;
      case responseCodes.SERVER_ERROR:
        alert('Server error');
        break;
      default:
    }
  }, [isLoggingIn]);

  const handleLogin = async () => {
    dispatch(actions.auth.login(phoneNumber, password));
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
          paddingHorizontal: 20,
          paddingVertical: 15,
          backgroundColor: '#ccc',
          marginBottom: 10,
        }}
      >
        <Text
          style={{
            fontSize: 13,
            fontWeight: 'bold',
          }}
        >
          Vui lòng nhập số điện thoại và mật khẩu để đăng nhập
        </Text>
      </View>
      <View
        style={{
          padding: 20,
        }}
      >
        <TextInput
          placeholder="Số điện thoại"
          style={{
            fontSize: 18,
            marginBottom: 10,
            borderBottomWidth: 1,
            borderBottomColor: '#ccc',
            height: 50,
            padding: 0,
          }}
          keyboardType="phone-pad"
          onChangeText={(text) => {
            setPhoneNumber(text);
          }}
          name="phoneNumber"
          value={phoneNumber}
        />
        <TextInput
          placeholder="Mật khẩu"
          style={{
            padding: 0,
            fontSize: 18,
            borderBottomWidth: 1,
            height: 50,
            marginBottom: 10,
            borderBottomColor: '#ccc',
          }}
          secureTextEntry={true}
          name="password"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
          }}
        />
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: '#0091ff',
          height: 50,
          width: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 50,
          alignSelf: 'flex-end',
          position: 'absolute',
          bottom: 10,
          right: 10,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowRadius: 5,
          shadowOpacity: 1.0,
        }}
        activeOpacity={0.8}
        onPress={handleLogin}
      >
        <Ionicons
          name="arrow-forward-outline"
          style={{
            color: '#fff',
            zIndex: 999,
            fontSize: 20,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};
export default LoginScreen;
