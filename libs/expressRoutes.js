//============================================================//
/* APP AUTHETHNICATION */
//============================================================//
require('../services/passport');

//============================================================//
/* APP UPLOADS */
//============================================================//
const uploadImage = require('../services/multer');

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
	require('../routes/authentication')(app, Authentication);
	require('../routes/posts')(app, Blog, uploadImage);
	require('../routes/projects')(app, Projects, uploadImage);
	// require('../comments')(app, Comment, requireToken, auth);
	// require('../seeds')(app);
};
