const express = require('express');
const app = express.Router();
const passport = require('passport');
const Projects = require('../controllers/projects');

const passportService = require('../middleware/passport');
const auth = require('../middleware/userHelper');
const requireToken = passport.authenticate('jwt', { session: false });

app.get('/api/projects/collection', Projects.findProjects);
app.post(
	'/projects/api/create_project',
	requireToken,
	auth.isLoggedIn,
	Projects.createProject
);
app.get('/projects/edit/api/fetch_one_project/:id', Projects.grabProject);
app.put(
	'/projects/edit/api/edit_project/:id',
	requireToken,
	auth.isLoggedIn,
	Projects.updateProject
);
app.delete(
	'/api/delete_project/:id',
	requireToken,
	auth.isLoggedIn,
	Projects.deleteProject
);

module.exports = app;
