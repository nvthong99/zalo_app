import { combineReducers } from 'redux';
import auth, { initialState as authInitialState } from './auth/reducer';
import socket, { initialState as socketInitialState } from './socket/reducer';

export const initialState = {
  auth: authInitialState,
  socket: socketInitialState,
};

export default combineReducers({
  auth,
  socket,
});
