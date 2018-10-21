import { app } from 'axios';
import { browserHistory } from 'react-router';
import * as types from '../types';

export const redirectToProject = () => browserHistory.push('/');

//= =========================================================================
// Blog Post C.R.U.D.
//= =========================================================================

// Fetches all projects from DB
export const fetchProjects = () => dispatch =>
  app
    .get('projects/collection')
    .then(({ data: { projects } }) => {
      dispatch({ type: types.SET_PROJECTS, payload: projects });
    })
    .catch(err => dispatch({ type: types.AUTH_ERROR, payload: err }));

// Fetches a single project by navTitle for editing from DB
export const fetchProject = id => dispatch =>
  app
    .get(`project/edit/${id}`)
    .catch(err => dispatch({ type: types.AUTH_ERROR, payload: err }));

// Adds new post to blog DB
export const addNewProject = formData => dispatch =>
  app
    .post('project/create', formData)
    .then(({ data: { message } }) => {
      dispatch({ type: types.AUTH_SUCCESS, payload: message });
      dispatch(fetchProjects());
      redirectToProject();
    })
    .catch(err => dispatch({ type: types.AUTH_ERROR, payload: err }));

// Deletes project from DB
export const deleteProject = id => dispatch =>
  app
    .delete(`project/delete/${id}`)
    .then(({ data: { message } }) => {
      dispatch({ type: types.AUTH_SUCCESS, payload: message });
      dispatch(fetchProjects());
    })
    .catch(err => dispatch({ type: types.AUTH_ERROR, payload: err }));

// Edits a project in DB
export const editProject = (id, formProps) => dispatch =>
  app
    .put(`project/update/${id}`, formProps)
    .then(({ data: { message } }) => {
      dispatch({ type: types.AUTH_SUCCESS, payload: message });
      dispatch(fetchProjects());
      redirectToProject();
    })
    .catch(err => dispatch({ type: types.AUTH_ERROR, payload: err }));
