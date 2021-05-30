import api from './api';
import { getCookie } from '../utils/cookie';

export async function getPosts() {
  const accessToken = await getCookie('accessToken');
  const response = await api({
    method: 'GET',
    url: '/posts',
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response;
}

export async function getPostById(id) {
  const response = await api({
    method: 'GET',
    url: `/posts/${id}`,
  });
  return response;
}

export async function createPost(post) {
  const accessToken = await getCookie('accessToken');
  const response = await api({
    method: 'POST',
    url: '/posts',
    data: post,
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response;
}

export async function updatePost(id, post) {
  const response = await api({
    method: 'PUT',
    url: `/posts/${id}`,
    data: post,
  });
  return response;
}

export async function deletePost(id) {
  const response = await api({
    method: 'DELETE',
    url: `/posts/${id}`,
  });
  return response;
}

export async function reactPost(id) {
  const accessToken = await getCookie('accessToken');
  const response = await api({
    method: 'POST',
    url: `/posts/${id}/react`,
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response;
}

export async function unReactPost(id) {
  const accessToken = await getCookie('accessToken');
  const response = await api({
    method: 'POST',
    url: `/posts/${id}/unReact`,
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response;
}
