import api from './api';
import { getCookie } from '../utils/cookie';

export async function searchUser(key, token) {
  const accessToken = token || (await getCookie('accessToken'));
  const response = await api({
    method: 'GET',
    url: '/users/search',
    params: {
      key,
    },
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response;
}
