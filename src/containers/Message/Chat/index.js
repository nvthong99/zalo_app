import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import apis from '../../../apis';
import styles from './index.style';

const PersonalScreen = ({ route, navigation }) => {
  const { conversation } = route.params;
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  return (
    <View>
      <View style={{ flexDirection: 'column', flex: 1 }}>
        <Text>{conversation.friend.name}</Text>
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
            style={{
              padding: 5,
              backgroundColor: 'blue',
            }}
          >
            <Text style={{ fontWeight: 'bold', color: '#fff' }}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default PersonalScreen;
