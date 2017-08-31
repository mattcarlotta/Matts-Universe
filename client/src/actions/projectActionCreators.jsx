import * as app from 'axios';
import { browserHistory } from 'react-router';
import { animateScroll as Nav } from 'react-scroll';

import { AUTH_ERROR, AUTH_SUCCESS } from './types';
import ConfigAuth from './configAuth';

export const redirectToProject = () => {
	browserHistory.push('/');
	Nav.scrollTo(2045, { duration: 1150, smooth: 'easeInOutQuint' });
};

//==========================================================================
// Blog Post C.R.U.D.
//==========================================================================

// Adds new post to blog DB
export const addNewProject = ({
	title,
	image,
	imgtitle,
	description
}) => async dispatch => {
	try {
		const config = ConfigAuth();

		const { data: { message } } = await app.post(
			`/api/create/project`,
			{ title, image, imgtitle, description },
			config
		);

		dispatch({ type: AUTH_SUCCESS, payload: message });
		redirectToProject();
	} catch (err) {
		dispatch({ type: AUTH_ERROR, payload: err });
		throw err;
	}
};

// Deletes project from DB
export const deleteProject = id => async dispatch => {
	try {
		const config = ConfigAuth();
		const { data: { message } } = await app.delete(
			`/api/delete/project/${id}`,
			config
		);
		dispatch({ type: AUTH_SUCCESS, payload: message });
		redirectToProject();
	} catch (err) {
		dispatch({ type: AUTH_ERROR, payload: err });
		throw err;
	}
};

// Edits a project in DB
export const editProject = formProps => async dispatch => {
	try {
		const config = ConfigAuth();

		const { data: { message } } = await app.put(
			`/api/edit/project/${formProps._id}`,
			{ ...formProps },
			config
		);
		redirectToProject();
		dispatch({ type: AUTH_SUCCESS, payload: message });
	} catch (err) {
		dispatch({ type: AUTH_ERROR, payload: err });
		throw err;
	}
};

// Fetches a single project by navTitle for editing from DB
export const fetchProject = id => async dispatch => {
	try {
		return await app.get(`/api/project/${id}`);
	} catch (err) {
		dispatch({ type: AUTH_ERROR, payload: err });
		throw err;
	}
};

// Fetches all projects from DB
export const fetchProjects = requestedRecords => async dispatch => {
	try {
		return await app.get(`/api/projectscollection`);
	} catch (err) {
		dispatch({ type: AUTH_ERROR, payload: err });
		throw err;
	}
};
