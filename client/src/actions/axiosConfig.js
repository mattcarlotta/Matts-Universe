import axios from 'axios';

export const app = axios.create({
  baseURL: 'http://localhost:5000/api/',
  withCredentials: true,
});
app.interceptors.response.use(
  response => response,
  error => Promise.reject(error.response.data.err),
);
