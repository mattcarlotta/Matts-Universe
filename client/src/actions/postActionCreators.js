import { browserHistory } from 'react-router';
import { app } from './axiosConfig';
import * as types from './types';

export const redirectToBlog = () => {
  browserHistory.push({
    pathname: '/blog/page',
    query: { pageId: 1 },
  });
};

//= =========================================================================
// Blog Post C.R.U.D.
//= =========================================================================

// Adds a single blog post to DB
export const addNewPost = formData => dispatch =>
  app
    .post('/api/create/post', formData)
    .then(({ data: { message } }) => {
      dispatch({ type: types.AUTH_SUCCESS, payload: message });
      redirectToBlog();
    })
    .catch(err => dispatch({ type: types.AUTH_ERROR, payload: err }));

// Deletes a single blog post from DB
export const deletePost = id => dispatch =>
  app
    .delete(`/api/delete/post/${id}`)
    .then(({ data: { message } }) => {
      dispatch({ type: types.AUTH_SUCCESS, payload: message });
      redirectToBlog();
    })
    .catch(err => dispatch({ type: types.AUTH_ERROR, payload: err }));

// Edits a single blog post in DB
export const editPost = (id, formData) => dispatch =>
  app
    .put(`/api/edit/post/${id}`, formData)
    .then(({ data: { message } }) => {
      dispatch({ type: types.AUTH_SUCCESS, payload: message });
      redirectToBlog();
    })
    .catch(err => dispatch({ type: types.AUTH_ERROR, payload: err }));

// Fetches a single post by navTitle from DB
export const fetchPost = id => dispatch =>
  app
    .get(`/api/post/${id}`)
    .catch(err => dispatch({ type: types.AUTH_ERROR, payload: err }));

// Fetches the amount of posts located in DB
export const fetchPostCount = () => dispatch =>
  app
    .get(`/api/blogcount`)
    .catch(err => dispatch({ type: types.AUTH_ERROR, payload: err }));

// Fetches the initial first and/or next 10 posts in the DB
export const fetchPosts = requestedRecords => dispatch =>
  app
    .get(`/api/blogcollection`, {
      params: { skipByValue: requestedRecords || 0 },
    })
    .catch(err => dispatch({ type: types.AUTH_ERROR, payload: err }));
