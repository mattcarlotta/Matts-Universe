import * as app from 'axios';
import { browserHistory } from 'react-router';

import AppPromiseInterceptors from './appPromiseInterceptors';
import ConfigAuth from './configAuth';

AppPromiseInterceptors(app);

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
		.post(`/api/create/post`, { title, image, imgtitle, description }, config)
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
		.delete(`/api/delete/post/${id}`, config)
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
export const fetchPost = id => {
	return app
		.get(`/api/post/${id}`)
		.then(response => {
			return { foundPost: response.data.post };
		})
		.catch(({ response }) => {
			return { err: response.data.err };
		});
};

// Fetches the amount of posts located in DB
export const fetchPostCount = async () => {
	try {
		const { data: { pageCount, postCount } } = await app.get(`/api/blogcount`);

		return {
			pageCount,
			postCount
		};
	} catch (err) {
		return { err };
	}

	// 	return {
	// 		pageCount: await res.pageCount,
	// 		postCount: await res.postCount
	// 	};
	// } catch (e) {
	// 	console.log(e);
	// 	// console.log(res);
	// 	return { err: 'The server was unable to find any blog content!' };
	// }
};

// export const fetchPostCount = () => {
// 	return app({
// 		url: `/api/count`,
// 		timeout: 20000,
// 		method: 'get',
// 		responseType: 'json'
// 	})
// 		.then(response => {
// 			return {
// 				pageCount: response.data.pageCount,
// 				postCount: response.data.postCount
// 			};
// 		})
// 		.catch(({ response }) => {
// 			return { err: response.data.err };
// 		});
// };

// Fetches the initial first and/or next 10 posts in the DB
export const fetchPosts = async requestedRecords => {
	try {
		const skipByValue = requestedRecords ? requestedRecords : 0;
		const res = await app.get(`/api/blogcollection`, {
			params: {
				skipByValue: skipByValue
			}
		});
		return { posts: await res.data.posts };
	} catch ({ res }) {
		return { err: res.data.err };
	}
};
