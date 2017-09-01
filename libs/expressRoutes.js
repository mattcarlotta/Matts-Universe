//============================================================//
/* APP AUTHETHNICATION */
//============================================================//
const passportService = require('../middleware/passport');
const passport = require('passport');
const auth = require('../middleware/userHelper');
const requireToken = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

//============================================================//
/* APP CONTROLLERS */
//============================================================//
const Authentication = require('../controllers/authentication');
const Blog = require('../controllers/posts');
const Projects = require('../controllers/projects');
// const Comments = require('../controllers/comments');

//============================================================//
/* APP ROUTES */
//============================================================//
module.exports = app => {
	require('../routes/authentication')(
		app,
		Authentication,
		requireSignin,
		requireToken,
		auth
	);
	require('../routes/posts')(app, Blog, requireToken, auth);
	require('../routes/projects')(app, Projects, requireToken, auth);
	// require('../comments')(app, Comment, requireToken, auth);
	// require('../seeds')(app);
};
