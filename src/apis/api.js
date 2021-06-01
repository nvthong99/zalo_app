import axios from 'axios';
import camelCase from 'camelcase-keys';

const REACT_APP_API_DOMAIN_DEV = 'http://b987a7857579.ngrok.io';
const REACT_APP_API_DOMAIN = 'http://127.0.0.1:3000';
export default axios.create({
  baseURL: `${REACT_APP_API_DOMAIN_DEV}/api/v1`,
  responseType: 'json',
  timeout: 30 * 1000,
  transformResponse: [(data) => camelCase(data, { deep: true })],
});
