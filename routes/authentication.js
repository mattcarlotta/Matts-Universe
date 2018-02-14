const passport = require('passport');

module.exports = (app, Authentication, requireSignin, requireToken, auth) => {
	// app.post('/api/signup', Authentication.signup);

	app.post('/api/signin', (req, res, next) => {
    passport.authenticate('local', (err, user, errorMessage) => {
			if (err || !user || errorMessage) res.status(401).json({ err: errorMessage });
			Authentication.signin(user._id, res);
    })(req, res, next)
	});


	app.get(
		'*/api/signedin',
		passport.authenticate('jwt', { session: false }),
		auth.isLoggedIn,
		Authentication.signedin
	);

	// app.get('*/api/signedin', (req, res, next) => {
	// 	passport.authenticate('jwt-login', (err, user, errorMessage) => {
	// 		console.log('triggered', user);
	// 		// if (err || !user || errorMessage) res.status(401).json({ err: errorMessage });
	// 		//
	// 		// auth.isLoggedIn((user, req, res, next), (req) => {
	// 		// 	console.log('this was returned');
	// 		// 	//Authentication.signedin
	// 		// });
	// 	})(req, res, next)
	// });
};
