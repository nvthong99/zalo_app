export const actionTypes = {
  LOGIN: 'LOGIN',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  VERIFY_TOKEN: 'VERIFY_TOKEN',
  VERIFY_TOKEN_SUCCESS: 'VERIFY_TOKEN_SUCCESS',
  VERIFY_TOKEN_FAILURE: 'VERIFY_TOKEN_FAILURE',
  LOGOUT: 'LOGOUT',
};

export function login(phoneNumber, password) {
  return {
    type: actionTypes.LOGIN,
    phoneNumber,
    password,
  };
}

export function loginSuccess(accessToken, code, user) {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    accessToken,
    code,
    user,
  };
}

export function loginFailure(code) {
  return {
    type: actionTypes.LOGIN_FAILURE,
    code,
  };
}

export function verifyToken(accessToken) {
  return {
    type: actionTypes.VERIFY_TOKEN,
    accessToken,
  };
}

export function verifyTokenSuccess(accessToken, user) {
  return {
    type: actionTypes.VERIFY_TOKEN_SUCCESS,
    accessToken,
    user,
  };
}

export function verifyTokenFailure() {
  return {
    type: actionTypes.VERIFY_TOKEN_FAILURE,
  };
}

export function logout() {
  return {
    type: actionTypes.LOGOUT,
  };
}
