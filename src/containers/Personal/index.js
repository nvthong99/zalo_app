import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import apis from '../../apis';
import Header from '../../components/Header';
import styles from './index.style';

const PersonalScreen = ({ route, navigation }) => {
  const { userId } = route.params;
  const [posts, setPosts] = useState([]);

  return (
    <View>
      <Header />
      <Text>{userId}</Text>
    </View>
  );
};
export default PersonalScreen;
