import { routerReducer as routing } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import { combineReducers } from 'redux';
import {
	AUTH_ERROR,
	AUTH_SUCCESS,
	FETCHING_USER,
	RESET_NOTIFICATIONS,
	SET_SIGNEDIN_USER,
	UNAUTH_USER
} from '../actions/types';

const authReducer = (state = {}, action) => {
	switch (action.type) {
		case AUTH_ERROR:
			return { ...state, error: action.payload };
		case AUTH_SUCCESS:
			return { ...state, success: action.payload };
		case FETCHING_USER:
			return { ...state, fetchingUser: action.payload };
		case RESET_NOTIFICATIONS:
			return { ...state, error: '', success: '' };
		case SET_SIGNEDIN_USER:
			return {
				...state,
				username: action.payload.user,
				isGod: action.payload.isGod
			};
		case UNAUTH_USER:
			return { ...state, username: null, isGod: null };
		default:
			return state;
	}
};

const rootReducer = combineReducers({
	auth: authReducer,
	form: formReducer,
	routing
});

export default rootReducer;
