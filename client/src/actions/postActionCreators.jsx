import * as app from 'axios';
import { browserHistory } from 'react-router';
import AppPromiseInterceptor from './appPromiseInterceptor';
import ConfigAuth from './configAuth';
import { AUTH_ERROR, AUTH_SUCCESS } from './types';

AppPromiseInterceptor(app);

export const redirectToBlog = () => {
	browserHistory.push({
		pathname: '/blog/page',
		query: { pageId: 1 }
	});
};

const fd = new FormData();

//==========================================================================
// Blog Post C.R.U.D.
//==========================================================================

// Adds new post to blog DB
export const addNewPost = async ({ title, file, imgtitle, description }) => {
	await fd.append('file', file[0]);
	await fd.append('title', title);
	await fd.append('imgtitle', imgtitle);
	await fd.append('description', description);
	return app.post(`/api/create/post`, fd);
	// 	.then(response => {
	// 		return { success: response.data.message };
	// 	})
	// 	.catch(({ response }) => {
	// 		if (response.data.denied) {
	// 			return { err: response.data.denied };
	// 		} else {
	// 			return { err: response.data.err };
	// 		}
	// 	});
};

// Deletes a single blog post from DB
export const deletePost = id => async dispatch => {
	try {
		const config = ConfigAuth();
		const { data: { message } } = await app.delete(
			`/api/delete/post/${id}`,
			config
		);

		redirectToBlog();
		dispatch({ type: AUTH_SUCCESS, payload: message });
	} catch (err) {
		dispatch({ type: AUTH_ERROR, payload: err.toString() });
		throw err.toString();
	}
};

// Edits a single blog post in DB
export const editPost = ({
	id,
	title,
	image,
	imgtitle,
	description,
	navTitle
}) => {
	const config = ConfigAuth();

	return app
		.put(
			`/api/edit/post/${id}`,
			{ id, title, image, imgtitle, description, navTitle },
			config
		)
		.then(response => {
			return { success: response.data.message };
		})
		.catch(({ response }) => {
			if (response.data.denied) {
				return { err: response.data.denied };
			} else {
				return { err: response.data.err };
			}
		});
};

// Fetches a single post by navTitle from DB
export const fetchPost = id => async dispatch => {
	try {
		return await app.get(`/api/post/${id}`);
	} catch (err) {
		dispatch({ type: AUTH_ERROR, payload: err.toString() });
		throw err.toString();
	}
};

// Fetches the amount of posts located in DB
export const fetchPostCount = () => async dispatch => {
	try {
		return await app.get(`/api/blogcount`);
	} catch (err) {
		dispatch({ type: AUTH_ERROR, payload: err.toString() });
		throw err.toString();
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
		throw err.toString();
	}
};
