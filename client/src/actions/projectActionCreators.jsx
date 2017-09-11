import * as app from 'axios';
import { browserHistory } from 'react-router';
import { animateScroll as Nav } from 'react-scroll';

import configAuth from './configAuth';
import dispatchError from './dispatchError';
import dispatchSuccess from './dispatchSuccess';

export const redirectToProject = () => {
	browserHistory.push('/');
	Nav.scrollTo(2150, { duration: 1150, smooth: 'easeInOutQuint' });
};

//==========================================================================
// Blog Post C.R.U.D.
//==========================================================================

// Adds new post to blog DB
export const addNewProject = (formData, config) => async dispatch => {
	try {
		const { data: { message } } = await app.post(
			`/api/create/project`,
			formData,
			config
		);

		dispatchSuccess(dispatch, message);
		redirectToProject();
	} catch (err) {
		dispatchError(dispatch, err);
	}
};

// Deletes project from DB
export const deleteProject = id => async dispatch => {
	try {
		const config = configAuth();
		const { data: { message } } = await app.delete(
			`/api/delete/project/${id}`,
			config
		);

		dispatchSuccess(dispatch, message);
	} catch (err) {
		dispatchError(dispatch, err);
	}
};

// Edits a project in DB
export const editProject = (id, formProps, config) => async dispatch => {
	try {
		const { data: { message } } = await app.put(
			`/api/edit/project/${id}`,
			formProps,
			config
		);

		dispatchSuccess(dispatch, message);
		redirectToProject();
	} catch (err) {
		dispatchError(dispatch, err);
	}
};

// Fetches a single project by navTitle for editing from DB
export const fetchProject = id => async dispatch => {
	try {
		return await app.get(`/api/project/${id}`);
	} catch (err) {
		dispatchError(dispatch, err);
	}
};

// Fetches all projects from DB
export const fetchProjects = requestedRecords => async dispatch => {
	try {
		return await app.get(`/api/projectscollection`);
	} catch (err) {
		dispatchError(dispatch, err);
	}
};
