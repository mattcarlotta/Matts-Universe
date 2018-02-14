const passport = require('passport');

module.exports = (app, Authentication, requireSignin, requireToken, auth) => {
	// app.post('/api/signup', Authentication.signup);

	app.post('/api/signin', (req, res, next) => {
    passport.authenticate('local', (err, user, errorMessage) => {

			if (err || errorMessage) {
				res.status(401).json({ err: errorMessage });
				return next();
			}

			Authentication.signin(user._id, res, next);
    })(req, res, next)
	});


	app.get(
		'*/api/signedin', (req, res, next) => {
			passport.authenticate('jwt', (err, user, errorMessage) => {

				if (err || !user || errorMessage) {
					res.status(401).json({ err: err ? err : errorMessage });
					return next();
				}

				Authentication.signedin(user._id, res, next);
			})(req, res, next)
		});
};
