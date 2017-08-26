import * as app from 'axios';
import { browserHistory } from 'react-router';
import { animateScroll as Nav } from 'react-scroll';

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
		.post(`api/create_project`, { title, image, imgtitle, description }, config)
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
		.delete(`api/delete_project/${id}`, config)
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
export const editProject = ({
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
			`api/edit_project/${id}`,
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

// Fetches a single project by navTitle for editing from DB
export const fetchProject = id => {
	return app
		.get(`api/fetch_one_project/${id}`)
		.then(response => {
			return { foundProject: response.data.project };
		})
		.catch(({ response }) => {
			return { err: response.data.err };
		});
};

// Fetches all projects from DB
export const fetchProjects = requestedRecords => {
	return app
		.get(`api/projects/collection`)
		.then(response => {
			return {
				projects: response.data.foundProject,
				projectCount: response.data.projectCount
			};
		})
		.catch(({ response }) => {
			return { err: response.data.err };
		});
};
