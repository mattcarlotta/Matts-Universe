import { routerReducer as routing } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import { combineReducers } from 'redux';
import * as types from '../types';

const initialAuthState = {
  error: '',
  success: '',
  fetchingUser: true,
  username: '',
  userIsGod: false,
};

const authReducer = (state = initialAuthState, { type, payload }) => {
  switch (type) {
    case types.AUTH_ERROR:
      return { ...state, error: payload };
    case types.AUTH_SUCCESS:
      return { ...state, success: payload };
    case types.RESET_NOTIFICATIONS:
      return { ...state, error: '', success: '' };
    case types.SET_SIGNEDIN_USER:
      return {
        ...state,
        username: payload.username,
        isGod: payload.god,
        fetchingUser: false,
      };
    case types.UNAUTH_USER:
      return { ...state, username: '', isGod: false };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  auth: authReducer,
  form: formReducer,
  routing,
});

export default rootReducer;
