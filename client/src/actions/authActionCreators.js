import * as app from 'axios';
import { browserHistory } from 'react-router';

import {
	AUTH_ERROR,
	AUTH_SUCCESS,
	FETCHING_USER,
	RESET_NOTIFICATIONS,
	SET_SIGNEDIN_USER,
	UNAUTH_USER
} from '../actions/types';
import configAuth from './configAuth';
import dispatchError from './dispatchError';

//==========================================================================
// Authorization
//==========================================================================

// Displays error messages
export const authError = error => ({
	type: AUTH_ERROR,
	payload: error
})

// Displays success messages
export const authSuccess = message => ({
	type: AUTH_SUCCESS,
	payload: message
})

// Attempts to auth a previously signed in user
export const authenticateUser = id => {
	const config = configAuth();
	return !config.user
	 ? dispatch => dispatch(fetchingUser(false))
	 : dispatch => {
			app.get(`/api/signedin`, config)
			.then(({data}) => {
				dispatch({ type: SET_SIGNEDIN_USER, payload: data });
				dispatch({ type: FETCHING_USER, payload: false });
			})
			.catch(err => {
				dispatchError(dispatch, err);
				dispatch({ type: FETCHING_USER, payload: false });
				dispatch(signoutUser());
				throw err;
			})
		}
};

// Allows AJAX time to fetch a user on refresh before loading app
export const fetchingUser = bool => ({
	type: FETCHING_USER,
	payload: bool
});

// Resets auth notifications
export const resetNotifications = () => ({
	type: RESET_NOTIFICATIONS
});

// Attempts to sign in user
export const signinUser = ({ username, password }) => (
	dispatch => {
		app.post('api/signin', { username, password })
		.then(({data}) => {
			localStorage.setItem('token', data.token);
			dispatch({ type: SET_SIGNEDIN_USER, payload: data });
			browserHistory.push('/');
		})
		.catch(({ response }) => {
			const error = `Your username or password is incorrect!`;
			dispatchError(dispatch, error);
		});
	}
)

// Atempts to sign up user
export const signupUser = ({ email, username, password }) => (
	dispatch => {
		app.post('api/signup', { email, username, password })
		.then(({data}) => {
			localStorage.setItem('token', data.token);
			dispatch({ type: SET_SIGNEDIN_USER, payload: data.user });
			browserHistory.push('/');
		})
		.catch(err => {
			dispatchError(dispatch, err);
			console.error(err);
		});
	}
);

// Signs user out
export const signoutUser = () => {
	localStorage.removeItem('token');

	return {
		type: UNAUTH_USER
	};
};
