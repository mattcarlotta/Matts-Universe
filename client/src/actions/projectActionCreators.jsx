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
export const addNewProject = ({ title, image, imgtitle, description }) => {
	const config = ConfigAuth();

	return app
		.post(
			`/api/create/project`,
			{ title, image, imgtitle, description },
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

// Deletes project from DB
export const deleteProject = id => {
	const config = ConfigAuth();

	return app
		.delete(`/api/delete/project/${id}`, config)
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

// Edits a project in DB
export const editProject = formProps => async dispatch => {
	try {
		const config = ConfigAuth();

		const { data: { message } } = await app.put(
			`/api/edit/project/${formProps.id}`,
			{ ...formProps },
			config
		);
		redirectToProject();
		return dispatch({ type: AUTH_SUCCESS, payload: message });
	} catch (err) {
		return dispatch({ type: AUTH_ERROR, payload: err });
	}
	// return app
	// 	.put(
	// 		`/api/edit/project/${id}`,
	// 		{ id, title, image, imgtitle, description, navTitle },
	// 		config
	// 	)
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

// Fetches a single project by navTitle for editing from DB
export const fetchProject = async id => {
	try {
		const { data: { project } } = await app.get(`/api/project/${id}`);

		return { foundProject: project };
	} catch (err) {
		return { err };
	}
};

// Fetches all projects from DB
export const fetchProjects = async requestedRecords => {
	try {
		const { data: { foundProject, projectCount } } = await app.get(
			`/api/projectscollection`
		);

		return {
			projects: foundProject,
			projectCount
		};
	} catch (err) {
		return { err };
	}
};
