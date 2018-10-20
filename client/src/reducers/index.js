import { routerReducer as routing } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import { combineReducers } from 'redux';
import * as types from '../actions/types';

const authReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case types.AUTH_ERROR:
      return { ...state, error: payload };
    case types.AUTH_SUCCESS:
      return { ...state, success: payload };
    case types.FETCHING_USER:
      return { ...state, fetchingUser: payload };
    case types.RESET_NOTIFICATIONS:
      return { ...state, error: '', success: '' };
    case types.SET_SIGNEDIN_USER:
      return {
        ...state,
        username: payload.user,
        isGod: payload.isGod,
      };
    case types.UNAUTH_USER:
      return { ...state, username: null, isGod: null };
    default:
      return state;
  }
};

const projectReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case types.SET_PROJECTS:
      return { ...state, projects: payload };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  auth: authReducer,
  form: formReducer,
  works: projectReducer,
  routing,
});

export default rootReducer;
