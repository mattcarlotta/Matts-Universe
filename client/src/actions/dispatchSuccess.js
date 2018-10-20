import { AUTH_SUCCESS } from './types';

export default (dispatch, message) => {
	dispatch({ type: AUTH_SUCCESS, payload: message });
};
