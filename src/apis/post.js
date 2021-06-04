import api from './api';
import { getCookie } from '../utils/cookie';

export async function getPosts(token) {
  const accessToken = token || (await getCookie('accessToken'));
  const response = await api({
    method: 'GET',
    url: '/posts',
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response;
}

export async function getPostsByMe(token) {
  const accessToken = token || (await getCookie('accessToken'));
  const response = await api({
    method: 'GET',
    url: '/posts/me',
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response;
}

export async function getPostById(id, token) {
  const accessToken = token || (await getCookie('accessToken'));
  const response = await api({
    method: 'GET',
    url: `/posts/${id}`,
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response;
}

export async function createPost(post, token) {
  const accessToken = token || (await getCookie('accessToken'));
  const response = await api({
    method: 'POST',
    url: '/posts',
    data: post,
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response;
}

export async function updatePost(id, post, token) {
  const accessToken = token || (await getCookie('accessToken'));
  const response = await api({
    method: 'PUT',
    url: `/posts/${id}`,
    data: post,
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response;
}

export async function deletePost(id, token) {
  const accessToken = token || (await getCookie('accessToken'));
  const response = await api({
    method: 'DELETE',
    url: `/posts/${id}`,
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response;
}

export async function reactPost(id, token) {
  const accessToken = token || (await getCookie('accessToken'));
  const response = await api({
    method: 'POST',
    url: `/posts/${id}/react`,
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response;
}

export async function unReactPost(id, token) {
  const accessToken = token || (await getCookie('accessToken'));
  const response = await api({
    method: 'POST',
    url: `/posts/${id}/unReact`,
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response;
}

export async function reportPost(id, content, token) {
  const accessToken = token || (await getCookie('accessToken'));
  const response = await api({
    method: 'POST',
    url: `/posts/${id}/report`,
    data: { content },
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response;
}

export async function getAllCommentByPost(postId, token) {
  const accessToken = token || (await getCookie('accessToken'));
  const response = await api({
    method: 'GET',
    url: `/posts/${postId}/comments`,
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response;
}

export async function createComment(id, content, token) {
  const accessToken = token || (await getCookie('accessToken'));
  const response = await api({
    method: 'POST',
    url: `/posts/${id}/comments`,
    data: { content },
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response;
}

export async function updateComment(postId, commentId, content, token) {
  const accessToken = token || (await getCookie('accessToken'));
  const response = await api({
    method: 'PUT',
    url: `/posts/${postId}/comments/${commentId}`,
    data: { content },
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response;
}

export async function deleteComment(postId, commentId, token) {
  const accessToken = token || (await getCookie('accessToken'));
  const response = await api({
    method: 'DELETE',
    url: `/posts/${postId}/comments/${commentId}`,
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response;
}
