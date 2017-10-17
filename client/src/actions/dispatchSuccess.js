import { AUTH_SUCCESS } from './types';

const dispatchSuccess = (dispatch, message) => {
	dispatch({ type: AUTH_SUCCESS, payload: message });
};

export default dispatchSuccess;
