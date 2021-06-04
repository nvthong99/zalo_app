import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import actions from '../../redux/actions';
import { removeCookie } from '../../utils/cookie';

const InformationApiScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const handleLogout = async () => {
    await removeCookie('accessToken');
    await removeCookie('posts');
    await removeCookie('friends');
    dispatch(actions.auth.logout());
  };
  return (
    <View>
      <Text>InformationApiScreen</Text>
      <TouchableOpacity onPress={handleLogout}>
        <Text style={{ color: 'blue', marginTop: 50 }}>Đăng xuất</Text>
      </TouchableOpacity>
    </View>
  );
};
export default InformationApiScreen;
