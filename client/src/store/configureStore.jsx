import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import rootReducer from '../reducers';

const configureStore = () => {
	const store = createStore(
		rootReducer,
		applyMiddleware(thunk, promiseMiddleware)
	);
	return store;
};

export default configureStore;
