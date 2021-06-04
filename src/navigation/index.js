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
