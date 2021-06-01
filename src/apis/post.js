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

export async function reportPost(id, content) {
  const accessToken = await getCookie('accessToken');
  const response = await api({
    method: 'POST',
    url: `/posts/${id}/report`,
    data: { content },
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response;
}

export async function getAllCommentByPost(postId) {
  const accessToken = await getCookie('accessToken');
  const response = await api({
    method: 'GET',
    url: `/posts/${postId}/comments`,
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response;
}

export async function createComment(id, content) {
  const accessToken = await getCookie('accessToken');
  const response = await api({
    method: 'POST',
    url: `/posts/${id}/comments`,
    data: { content },
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response;
}

export async function updateComment(postId, commentId, content) {
  const accessToken = await getCookie('accessToken');
  const response = await api({
    method: 'PUT',
    url: `/posts/${postId}/comments/${commentId}`,
    data: { content },
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response;
}

export async function deleteComment(postId, commentId) {
  const accessToken = await getCookie('accessToken');
  const response = await api({
    method: 'DELETE',
    url: `/posts/${postId}/comments/${commentId}`,
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response;
}
