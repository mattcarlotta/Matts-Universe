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

import ConfigAuth from './configAuth';

//==========================================================================
// Authorization
//==========================================================================

// Displays error messages
export const authError = error => {
	return {
		type: AUTH_ERROR,
		payload: error
	};
};

// Displays success messages
export const authSuccess = message => {
	return {
		type: AUTH_SUCCESS,
		payload: message
	};
};

// Attempts to auth a previously signed in user
export const authenticateUser = id => {
	const config = ConfigAuth();

	return dispatch => {
		dispatch(fetchingUser(true));
		if (!config.user) return dispatch(fetchingUser(false));
		else
			app
				.get(`/api/signedin`, config)
				.then(response => {
					dispatch({ type: SET_SIGNEDIN_USER, payload: response.data });
					dispatch(fetchingUser(false));
				})
				.catch(({ response }) => {
					dispatch(authError(response.data.err));
					dispatch(fetchingUser(false));
					dispatch(signoutUser());
				});
	};
};

// Allows Redux time to fetch a user on refresh before loading app
export const fetchingUser = bool => {
	return {
		type: FETCHING_USER,
		payload: bool
	};
};

// Resets auth notifications
export const resetNotifications = () => {
	return {
		type: RESET_NOTIFICATIONS
	};
};

// Attempts to sign in user
export const signinUser = ({ username, password }) => {
	return dispatch => {
		app
			.post(`api/signin`, { username, password })
			.then(response => {
				localStorage.setItem('token', response.data.token);
				dispatch({ type: SET_SIGNEDIN_USER, payload: response.data });
				browserHistory.push('/');
			})
			.catch(({ response }) =>
				dispatch(authError(`Your username or password is incorrect!`))
			);
	};
};

// Atempts to sign up user
export const signupUser = ({ email, username, password }) => {
	return dispatch => {
		app
			.post(`api/signup`, { email, username, password })
			.then(response => {
				localStorage.setItem('token', response.data.token);
				dispatch({ type: SET_SIGNEDIN_USER, payload: response.data.user });
				browserHistory.push('/');
			})
			.catch(({ response }) => dispatch(authError(response.data.err)));
	};
};

// Signs user out
export const signoutUser = () => {
	localStorage.removeItem('token');

	return {
		type: UNAUTH_USER
	};
};
