import * as app from 'axios';
import { browserHistory } from 'react-router';

import ConfigAuth from './ConfigAuth';

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
export const addNewPost = ({ title, image, imgtitle, description }) => {
	const config = ConfigAuth();

	return app
		.post(`api/create_post`, { title, image, imgtitle, description }, config)
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

export const deletePost = id => {
	const config = ConfigAuth();

	return app
		.delete(`api/delete_post/${id}`, config)
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
			`api/edit_post/${id}`,
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
export const fetchPost = id => {
	return app
		.get(`api/fetch_one/${id}`)
		.then(response => {
			return { foundPost: response.data.post };
		})
		.catch(({ response }) => {
			return { err: response.data.err };
		});
};

// Fetches the amount of posts located in DB
export const fetchPostCount = () => {
	return app
		.get(`api/count`)
		.then(response => {
			return {
				pageCount: response.data.pageCount,
				postCount: response.data.postCount
			};
		})
		.catch(({ response }) => {
			return { err: response.data.err };
		});
};

// Fetches the initial first and/or next 10 posts in the DB
export const fetchPosts = requestedRecords => {
	const skipByValue = requestedRecords ? requestedRecords : 0;

	return app
		.get(`api/collection`, {
			params: {
				skipByValue: skipByValue
			}
		})
		.then(response => {
			return { posts: response.data.posts };
		})
		.catch(({ response }) => {
			return { err: response.data.err };
		});
};
