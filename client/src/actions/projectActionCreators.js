import { app } from 'axios';
import { browserHistory } from 'react-router';
import * as types from './types';

export const redirectToProject = () => browserHistory.push('/');

//==========================================================================
// Blog Post C.R.U.D.
//==========================================================================

// Adds new post to blog DB
export const addNewProject = (formData, config) => dispatch =>
  app
    .post('/api/create/project', formData, config)
    .then(({ data: { message } }) => {
      dispatch({ type: types.AUTH_SUCCESS, payload: message });
      dispatch(fetchProjects());
      redirectToProject();
    })
    .catch(err => dispatch({ type: types.AUTH_ERROR, payload: err }));

// Deletes project from DB
export const deleteProject = id => dispatch =>
  app
    .delete(`/api/delete/project/${id}`, configAuth())
    .then(({ data: { message } }) => {
      dispatch({ type: types.AUTH_SUCCESS, payload: message });
      dispatch(fetchProjects());
    })
    .catch(err => dispatch({ type: types.AUTH_ERROR, payload: err }));

// Edits a project in DB
export const editProject = (id, formProps, config) => dispatch =>
  app
    .put(`/api/edit/project/${id}`, formProps, config)
    .then(({ data: { message } }) => {
      dispatch({ type: types.AUTH_SUCCESS, payload: message });
      dispatch(fetchProjects());
      redirectToProject();
    })
    .catch(err => dispatch({ type: types.AUTH_ERROR, payload: err }));

// Fetches a single project by navTitle for editing from DB
export const fetchProject = id => dispatch =>
  app
    .get(`/api/project/${id}`)
    .catch(err => dispatch({ type: types.AUTH_ERROR, payload: err }));

// Fetches all projects from DB
export const fetchProjects = requestedRecords => dispatch =>
  app
    .get('/api/projectscollection')
    .then(({ data: { projects } }) => {
      dispatch({ type: types.SET_PROJECTS, payload: projects });
    })
    .catch(err => dispatch({ type: types.AUTH_ERROR, payload: err }));
