import { AUTH_ERROR } from './types';

export default (dispatch, err) => {
	dispatch({ type: AUTH_ERROR, payload: err });
	console.error(err);
};
