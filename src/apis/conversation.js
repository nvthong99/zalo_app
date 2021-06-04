import api from './api';
import { getCookie } from '../utils/cookie';

export async function getAllConversationByMe(token) {
  const accessToken = token || (await getCookie('accessToken'));
  const response = await api({
    method: 'GET',
    url: '/conversationsByMe',
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response;
}
