import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Button,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { format } from 'json-string-formatter';
import Header from '../../components/Header';
import apis from '../../apis';

const CallApiScreen = ({ navigation }) => {
  const [apiIndex, setApiIndex] = useState(0);
  const [param, setParam] = useState({});
  const [token, setToken] = useState('');
  const [result, setResult] = useState();
  const [listApi] = useState([
    {
      isToken: true,
      heading: 'Lấy tất cả các post',
      function: async (accessToken) => {
        return await apis.post.getPosts(accessToken);
      },
      data: [],
    },
    {
      isToken: false,
      heading: 'Đăng nhập',
      function: async (token, { phoneNumber, password }) => {
        return await apis.auth.login(phoneNumber, password);
      },
      data: [
        {
          name: 'phoneNumber',
          heading: 'SDT',
          type: 'TEXT',
        },
        {
          name: 'password',
          heading: 'Password',
          type: 'TEXT',
        },
      ],
    },
  ]);
  const handleSend = async () => {
    setResult();
    const apiInfo = listApi[apiIndex];
    try {
      const { data } = await apiInfo.function(token, { ...param });
      setResult(data);
    } catch (error) {
      alert('fetch data failed');
    }
  };
  console.log(listApi[apiIndex].isToken);
  return (
    <View style={{ backgroundColor: '#fff' }}>
      <Header navigation={navigation} />
      <ScrollView
        style={{
          padding: 20,
        }}
      >
        <Picker
          mode="dropdown"
          selectedValue={apiIndex}
          style={{
            height: 50,
            width: '100%',
          }}
          itemStyle={{
            padding: 0,
            margin: 0,
          }}
          onValueChange={(itemValue, itemIndex) => {
            setResult();
            setApiIndex(itemValue);
          }}
        >
          {listApi.map((el, index) => (
            <Picker.Item label={el.heading} value={index} key={index} />
          ))}
        </Picker>
        <View>
          {apiIndex >= 0 && listApi[apiIndex].isToken ? (
            <View style={{ marginBottom: 10 }}>
              <Text>Token</Text>
              <TextInput
                placeholder="Nhập access token"
                value={token || ''}
                onChangeText={(text) => setToken(text)}
              />
            </View>
          ) : null}
        </View>
        {apiIndex
          ? listApi[apiIndex].data
            ? listApi[apiIndex].data.map((el, index) => {
                if (el.type === 'TEXT') {
                  return (
                    <View key={index} style={{ marginBottom: 10 }}>
                      <Text>{el.heading}</Text>
                      <TextInput
                        placeholder={`Nhập ${el.heading}`}
                        value={(param && param[el.name]) || ''}
                        onChangeText={(text) => {
                          setParam({
                            ...param,
                            [el.name]: text,
                          });
                        }}
                      />
                    </View>
                  );
                }
              })
            : null
          : null}

        <Button title="Gửi" color="#53abfb" onPress={handleSend} />
        <ScrollView style={{ marginBottom: 120 }}>
          {result ? (
            <Text style={{ marginTop: 20 }}>
              {format(JSON.stringify(result))}
            </Text>
          ) : null}
        </ScrollView>
      </ScrollView>
    </View>
  );
};
export default CallApiScreen;
