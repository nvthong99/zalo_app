import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AuthScreen from '../containers/Auth';
import LoginScreen from '../containers/Login';
import RegisterScreen from '../containers/Register';

const Stack = createStackNavigator();

const AuthStackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Auth" component={AuthScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

export default AuthStackScreen;
