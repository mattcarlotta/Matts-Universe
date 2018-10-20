import axios from 'axios';

const objHasKeys = (obj, ...args) => {
  for (let i = 0; i < args.length; i += 1) {
    if (!obj || !Object.prototype.hasOwnProperty.call(obj, args[i])) {
      return false;
    }
    obj = obj[args[i]];
  }
  return true;
};

export const app = axios.create({
  baseURL: 'http://localhost:5000/api/',
  withCredentials: true,
});
app.interceptors.response.use(
  response => response,
  error => {
    const rejectErr = objHasKeys(error, 'response', 'data', 'err')
      ? error.response.data.err
      : error.toString();
    Promise.reject(rejectErr);
  },
);

export const avatarAPI = axios.create({
  baseURL: 'http://localhost:4000/api/',
  withCredentials: true,
});
avatarAPI.interceptors.response.use(
  response => response,
  error => {
    const rejectErr = objHasKeys(error, 'response', 'data', 'err')
      ? error.response.data.err
      : error.toString();
    Promise.reject(rejectErr);
  },
);
