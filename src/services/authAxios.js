/*eslint-disable*/
import axios from 'axios';

export default function authAxios(options) {
  const { headers } = options;

  return axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  });
}
