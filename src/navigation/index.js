import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { getCookie } from '../utils/cookie';
import { Text } from 'react-native';
import actions from '../redux/actions';

import HomeStackScreen from './HomeStackScreen';
import AuthStackScreen from './AuthStackScreen';

const RootStack = createStackNavigator();

const Navigators = () => {
  const dispatch = useDispatch();
  const { accessToken, verifying } = useSelector((state) => state.auth);
  const [isFirstTime, setIsFirstTime] = useState(true);

  const verifyToken = async () => {
    const accessTokenFromCookie = await getCookie('accessToken');
    if (accessTokenFromCookie) {
      dispatch(actions.auth.verifyToken(accessTokenFromCookie));
    }
    setIsFirstTime(false);
  };

  useEffect(() => {
    if (!accessToken) {
      verifyToken();
    } else {
      setIsFirstTime(false);
    }
  }, []);

  if (isFirstTime || verifying) {
    return <Text>Loading....</Text>;
  }

  return (
    <NavigationContainer>
      <RootStack.Navigator headerMode="none">
        {accessToken ? (
          <RootStack.Screen
            name="App"
            component={HomeStackScreen}
            options={{
              animationEnabled: false,
            }}
          />
        ) : (
          <RootStack.Screen
            name="Auth"
            component={AuthStackScreen}
            options={{
              animationEnabled: false,
            }}
          />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Navigators;
