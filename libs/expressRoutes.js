//============================================================//
/* APP AUTHETHNICATION */
//============================================================//
const passportService = require('../middleware/passport');
const passport = require('passport');
const auth = require('../middleware/userHelper');
const requireToken = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

//============================================================//
/* APP UPLOADS */
//============================================================//
const uploadImage = require('../middleware/multer');

//============================================================//
/* APP CONTROLLERS */
//============================================================//
const Authentication = require('../controllers/authentication');
const Blog = require('../controllers/posts');
const Projects = require('../controllers/projects');
// const Comment = require('../controllers/comments');

//============================================================//
/* EXPRESS ROUTES */
//============================================================//
module.exports = app => {
	require('../routes/authentication')(
		app,
		Authentication,
		requireSignin,
		requireToken,
		auth
	);
	require('../routes/posts')(app, Blog, requireToken, auth, uploadImage);
	require('../routes/projects')(app, Projects, requireToken, auth, uploadImage);
	// require('../comments')(app, Comment, requireToken, auth);
	// require('../seeds')(app);
};
