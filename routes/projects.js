const express = require('express');
const app = express.Router();
const passport = require('passport');
const Projects = require('../controllers/projects');

const passportService = require('../middleware/passport');
const auth = require('../middleware/userHelper');
const requireToken = passport.authenticate('jwt', { session: false });

app.get('/api/projectscollection', Projects.findProjects);
app.post(
	'/api/create/project',
	requireToken,
	auth.isLoggedIn,
	Projects.createProject
);
app.get('/api/project/:id', Projects.grabProject);
app.put(
	'/api/edit/project/:id',
	requireToken,
	auth.isLoggedIn,
	Projects.updateProject
);
app.delete(
	'/api/delete/project/:id',
	requireToken,
	auth.isLoggedIn,
	Projects.deleteProject
);

module.exports = app;
