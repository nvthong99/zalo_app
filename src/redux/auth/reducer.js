import { actionTypes } from "./actions";

export const initialState = {
  accessToken: null,
  verifying: false,
  errorMessage: "",
  isProcessing: false,
  loginCode: null,
  role: null,
  user: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOGIN: {
      return { ...state, isProcessing: true };
    }
    case actionTypes.LOGIN_SUCCESS: {
      const { accessToken, code, user } = action;
      return {
        ...state,
        accessToken,
        loginCode: code,
        isProcessing: false,
        user,
      };
    }
    case actionTypes.LOGIN_FAILURE: {
      const { code } = action;
      return { ...state, loginCode: code, isProcessing: false, user: null };
    }
    case actionTypes.VERIFY_TOKEN:
      return { ...state, verifying: true };
    case actionTypes.VERIFY_TOKEN_SUCCESS: {
      const { accessToken, role, user } = action;
      return {
        ...state,
        verifying: false,
        accessToken,
        role,
        user,
      };
    }
    case actionTypes.VERIFY_TOKEN_FAILURE:
      return { ...state, verifying: false };
    case actionTypes.LOGOUT:
      return { ...state, verifying: false, accessToken: null, user: null };
    default:
      return state;
  }
}
