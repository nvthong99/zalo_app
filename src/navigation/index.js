import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { getCookie } from '../utils/cookie';
import { Text, View } from 'react-native';
import actions from '../redux/actions';

import HomeStackScreen from './HomeStackScreen';
import AuthStackScreen from './AuthStackScreen';
import PersonalScreen from '../containers/Personal';
import SearchFriendScreen from '../containers/SearchFriend';

import envConstants from '../constants/env';
import io from 'socket.io-client';

const PrivateStack = createStackNavigator();

const PrivateScreenStack = () => {
  return (
    <PrivateStack.Navigator>
      <PrivateStack.Screen
        name="Home"
        component={HomeStackScreen}
        options={{ headerShown: false }}
      />
      <PrivateStack.Screen
        name="Personal"
        component={PersonalScreen}
        options={{ headerShown: false }}
      />
      <PrivateStack.Screen
        name="SearchFriend"
        component={SearchFriendScreen}
        options={{ headerShown: false }}
      />
    </PrivateStack.Navigator>
  );
};
const RootStack = createStackNavigator();

const Navigators = () => {
  const dispatch = useDispatch();
  const { accessToken, verifying, user } = useSelector((state) => state.auth);
  const { socket } = useSelector((state) => state.socket);

  const [isFirstTime, setIsFirstTime] = useState(true);

  const verifyToken = async () => {
    const accessTokenFromCookie = await getCookie('accessToken');
    console.log(accessTokenFromCookie);
    if (accessTokenFromCookie && accessTokenFromCookie !== 'undefined') {
      console.log(accessTokenFromCookie);
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

  useEffect(() => {
    if (!socket) {
      if (accessToken && user) {
        const socket = io(envConstants.BACKEND_DOMAIN + `?data=${user.id}`);
        dispatch(actions.socket.updateSocket(socket));
      }
    }
  }, [accessToken, user]);

  console.log(verifying);
  if (isFirstTime || verifying) {
    return <Text>Loading....</Text>;
  }

  return (
    <NavigationContainer>
      <RootStack.Navigator headerMode="none">
        {accessToken ? (
          <RootStack.Screen
            name="Private"
            component={PrivateScreenStack}
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
