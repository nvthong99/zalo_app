import { actionTypes } from './actions';

export const initialState = {
  socket: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.UPDATE_SOCKET: {
      const { socket } = action;
      return { ...state, socket };
    }
    default:
      return state;
  }
}
