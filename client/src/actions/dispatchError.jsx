import { AUTH_ERROR } from './types';

const dispatchError = (dispatch, err) => {
	dispatch({ type: AUTH_ERROR, payload: err });
	console.error(err);
};

export default dispatchError;
