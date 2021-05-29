import API from './api';

const login = async (phoneNumber, password) => {
  try {
    const response = await API({
      method: 'POST',
      url: '/auths/login',
      data: {
        phoneNumber,
        password,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

const verify = async (accessToken) => {
  try {
    const response = await API({
      method: 'GET',
      url: '/auths/verify',
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

const register = async (user) => {
  try {
    const response = await API({
      method: 'POST',
      url: '/auths/register',
      data: user,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export { login, verify, register };
