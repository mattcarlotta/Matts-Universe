import * as app from 'axios';
import { browserHistory } from 'react-router';

import AppPromiseInterceptor from './appPromiseInterceptor';
import { AUTH_ERROR, AUTH_SUCCESS } from './types';
import ConfigAuth from './configAuth';

AppPromiseInterceptor(app);

export const redirectToBlog = () => {
	browserHistory.push({
		pathname: '/blog/page',
		query: { pageId: 1 }
	});
};

//==========================================================================
// Blog Post C.R.U.D.
//==========================================================================

// Adds new post to blog DB
export const addNewPost = (id, formData, config) => async dispatch => {
	try {
		const { data: { message } } = await app.post(
			`/api/create/post`,
			formData,
			config
		);

		dispatch({ type: AUTH_SUCCESS, payload: message });
	} catch (err) {
		dispatch({ type: AUTH_ERROR, payload: err });
		throw err;
	}
};

// Deletes a single blog post from DB
export const deletePost = id => async dispatch => {
	try {
		const config = ConfigAuth();
		const { data: { message } } = await app.delete(
			`/api/delete/post/${id}`,
			config
		);

		dispatch({ type: AUTH_SUCCESS, payload: message });
	} catch (err) {
		dispatch({ type: AUTH_ERROR, payload: err.toString() });
		throw err;
	}
};

// Edits a single blog post in DB
export const editPost = (id, formData, config) => async dispatch => {
	try {
		const { data: { message } } = await app.put(
			`/api/edit/post/${id}`,
			formData,
			config
		);

		dispatch({ type: AUTH_SUCCESS, payload: message });
	} catch (err) {
		dispatch({ type: AUTH_ERROR, payload: err.toString() });
		throw err;
	}
};

// Fetches a single post by navTitle from DB
export const fetchPost = id => async dispatch => {
	try {
		return await app.get(`/api/post/${id}`);
	} catch (err) {
		dispatch({ type: AUTH_ERROR, payload: err.toString() });
		throw err;
	}
};

// Fetches the amount of posts located in DB
export const fetchPostCount = () => async dispatch => {
	try {
		return await app.get(`/api/blogcount`);
	} catch (err) {
		dispatch({ type: AUTH_ERROR, payload: err.toString() });
		throw err;
	}
};

// Fetches the initial first and/or next 10 posts in the DB
export const fetchPosts = requestedRecords => async dispatch => {
	try {
		const skipByValue = requestedRecords ? requestedRecords : 0;
		return await app.get(`/api/blogcollection`, {
			params: {
				skipByValue: skipByValue
			}
		});
	} catch (err) {
		dispatch({ type: AUTH_ERROR, payload: err.toString() });
		throw err;
	}
};
