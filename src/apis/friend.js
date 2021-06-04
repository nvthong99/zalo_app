import api from './api';
import { getCookie } from '../utils/cookie';

export async function getAllFriendByMe(token) {
  const accessToken = token || (await getCookie('accessToken'));
  const response = await api({
    method: 'GET',
    url: '/friends',
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response;
}

export async function getAllRequestFriendByMe(token) {
  const accessToken = token || (await getCookie('accessToken'));
  const response = await api({
    method: 'GET',
    url: '/friends/allRequest',
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response;
}

export async function requestAddFriend(userId, token) {
  const accessToken = token || (await getCookie('accessToken'));
  const response = await api({
    method: 'POST',
    url: '/friends/request',
    data: {
      to: userId,
    },
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response;
}

export async function replyRequestAddFriend({ to, isAccept }, token) {
  const accessToken = token || (await getCookie('accessToken'));
  const response = await api({
    method: 'POST',
    url: '/friends/acceptRequest',
    data: { to, isAccept },
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response;
}

export async function blockMessage({ to, isBlock }, token) {
  const accessToken = token || (await getCookie('accessToken'));
  const response = await api({
    method: 'POST',
    url: '/friends/blockMessage',
    data: { to, isBlock },
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response;
}

export async function blockPost({ to }, token) {
  const accessToken = token || (await getCookie('accessToken'));
  const response = await api({
    method: 'POST',
    url: '/friends/blockPost',
    data: { to },
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response;
}
