import { browserHistory } from 'react-router';
import { app } from './axiosConfig';
import * as types from '../types';

//= =========================================================================
// Authorization
//= =========================================================================

// Displays error messages
export const authError = error => ({
  type: types.AUTH_ERROR,
  payload: error,
});

// Displays success messages
export const authSuccess = message => ({
  type: types.AUTH_SUCCESS,
  payload: message,
});

// Allows AJAX time to fetch a user on refresh before loading app
export const fetchingUser = bool => ({
  type: types.FETCHING_USER,
  payload: bool,
});

// Signs user out
export const signoutUser = () => ({
  type: types.UNAUTH_USER,
});

// Attempts to auth a previously signed in user
export const authenticateUser = () => dispatch => {
  dispatch(fetchingUser(false));
  return app
    .get(`signedin`)
    .then(res => {
      if (res) {
        dispatch({ type: types.SET_SIGNEDIN_USER, payload: res.data });
        dispatch({ type: types.FETCHING_USER, payload: false });
      }
    })
    .catch(err => {
      dispatch({ type: types.FETCHING_USER, payload: false });
      dispatch(signoutUser());
      dispatch({ type: types.AUTH_ERROR, payload: err });
    });
};

// Resets auth notifications
export const resetNotifications = () => ({
  type: types.RESET_NOTIFICATIONS,
});

// Attempts to sign in user
export const signinUser = ({ username, password }) => dispatch =>
  app
    .post('signin', { username, password })
    .then(res => {
      console.log('res', res);
      dispatch({ type: types.SET_SIGNEDIN_USER, payload: res.data });
      browserHistory.push('/');
    })
    .catch(err => dispatch({ type: types.AUTH_ERROR, payload: err }));

// Atempts to sign up user
export const signupUser = ({ email, username, password }) => dispatch =>
  app
    .post('signup', { email, username, password })
    .then(res => {
      console.log('res', res);
      dispatch({ type: types.SET_SIGNEDIN_USER, payload: res.data });
      browserHistory.push('/');
    })
    .catch(err => dispatch({ type: types.AUTH_ERROR, payload: err }));

// removes current user from redux props and clears cookie
// const logoutUser = () => dispatch => {
//   app
//     .post(`signout`)
//     .then(() => {
//       dispatch({ type: types.UNAUTH_USER });
//       browserHistory.push('/');
//     })
//     .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }));
// };
