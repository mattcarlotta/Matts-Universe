module.exports = (app, Projects, requireToken, auth, uploadImage) => {
	app.get('/api/projectscollection', Projects.findProjects);
	app.post(
		'/api/create/project',
		requireToken,
		auth.isLoggedIn,
		uploadImage,
		Projects.createProject
	);
	app.get('/api/project/:id', Projects.grabProject);
	app.put(
		'/api/edit/project/:id',
		requireToken,
		auth.isLoggedIn,
		uploadImage,
		Projects.updateProject
	);
	app.delete(
		'/api/delete/project/:id',
		requireToken,
		auth.isLoggedIn,
		Projects.deleteProject
	);
};
