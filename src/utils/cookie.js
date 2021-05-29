import AsyncStorage from '@react-native-async-storage/async-storage';

async function setCookie(cname, cvalue, extime) {
  try {
    await AsyncStorage.setItem(cname, cvalue);
  } catch (e) {
    // saving error
  }
}
async function removeCookie(cname) {
  try {
    await AsyncStorage.removeItem(cname);
  } catch (e) {
    // saving error
  }
}
async function getCookie(cname) {
  try {
    const accessTokenFromCookie = await AsyncStorage.getItem(cname);
    return accessTokenFromCookie;
  } catch (e) {
    console.log(e);
  }
  return '';
}

function getCookieFromCookieString(cname, cookie) {
  const name = `${cname}=`;
  const ca = cookie.split(';');
  for (let i = 0; i < ca.length; i += 1) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}

export { setCookie, removeCookie, getCookie, getCookieFromCookieString };
