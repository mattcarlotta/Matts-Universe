module.exports = (app, Authentication, requireSignin, requireToken, auth) => {
	// app.post('/api/signup', Authentication.signup);

	app.post('/api/signin', requireSignin, Authentication.signin);

	app.get(
		'*/api/signedin',
		requireToken,
		auth.isLoggedIn,
		Authentication.signedin
	);
};
