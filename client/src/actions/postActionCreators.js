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

// Adds a single blog post to DB
export const addNewPost = (formData, config) => (
	dispatch => {
		app.post('/api/create/post', formData, config)
			.then(({ data: { message }}) => {
				dispatchSuccess(dispatch, message);
				redirectToBlog();
		})
		.catch(err => dispatchError(dispatch, err));
	}
)

// Deletes a single blog post from DB
export const deletePost = id => (
	dispatch => {
		app.delete(`/api/delete/post/${id}`, configAuth())
		.then(({data: { message }}) => {
			dispatchSuccess(dispatch, message);
			redirectToBlog();
		})
		.catch(err => dispatchError(dispatch, err));
	}
)

// Edits a single blog post in DB
export const editPost = (id, formData, config) => (
	dispatch => {
		app.put(`/api/edit/post/${id}`, formData, config)
		.then(({data: { message }}) => {
			dispatchSuccess(dispatch, message);
			redirectToBlog();
		})
		.catch(err => dispatchError(dispatch, err))
	}
);

// Fetches a single post by navTitle from DB
export const fetchPost = id => dispatch => (
	app.get(`/api/post/${id}`)
	.catch(err => dispatchError(dispatch, err))
)

// Fetches the amount of posts located in DB
export const fetchPostCount = () => dispatch => (
	app.get(`/api/blogcount`)
	.catch(err => dispatchError(dispatch, err))
)

// Fetches the initial first and/or next 10 posts in the DB
export const fetchPosts = requestedRecords => dispatch => (
	app.get(`/api/blogcollection`, {params: {skipByValue: requestedRecords ? requestedRecords : 0}})
	.catch(err => dispatchError(dispatch, err))
)
