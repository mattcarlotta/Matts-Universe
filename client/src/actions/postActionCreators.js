import * as app from 'axios';
import { browserHistory } from 'react-router';

import AppPromiseInterceptor from './appPromiseInterceptor';
import configAuth from './configAuth';
import dispatchError from './dispatchError';
import dispatchSuccess from './dispatchSuccess';

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

export const addNewPost = (formData, config) => async dispatch => {
	try {
		const { data: { message } } = await app.post(
			`/api/create/post`,
			formData,
			config
		);
		dispatchSuccess(dispatch, message);
		redirectToBlog();
	} catch (err) {
		dispatchError(dispatch, err);
	}
};
// Deletes a single blog post from DB
export const deletePost = id => async dispatch => {
	try {
		const config = configAuth();

		const { data: { message } } = await app.delete(
			`/api/delete/post/${id}`,
			config
		);
		dispatchSuccess(dispatch, message);
		redirectToBlog();
	} catch (err) {
		dispatchError(dispatch, err);
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

		dispatchSuccess(dispatch, message);
		redirectToBlog();
	} catch (err) {
		dispatchError(dispatch, err);
	}
};

// Fetches a single post by navTitle from DB
export const fetchPost = id => async dispatch => {
	try {
		return await app.get(`/api/post/${id}`);
	} catch (err) {
		dispatchError(dispatch, err);
	}
};

// Fetches the amount of posts located in DB
export const fetchPostCount = () => dispatch => {
	try {
		return app.get(`/api/blogcount`);
	} catch (err) {
		dispatchError(dispatch, err);
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
		dispatchError(dispatch, err);
	}
};
