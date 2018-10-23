import axios from 'axios';

const env = process.env.NODE_ENV;

export const app = axios.create({
  baseURL:
    env === 'production'
      ? 'https://mattcarlotta.io/api/'
      : 'http://localhost:5000/api/',
  withCredentials: true,
});
app.interceptors.response.use(
  response => response,
  error => Promise.reject(error.response.data.err),
);
