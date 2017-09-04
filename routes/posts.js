const multer = require('multer');

storage = multer.diskStorage({
	destination: function(request, file, callback) {
		callback(null, 'uploads/');
	},
	filename: function(request, file, callback) {
		callback(null, Date.now() + '-' + file.originalname);
	}
});

var upload = multer({ storage: storage });

module.exports = (app, Blog, requireToken, auth, imageCreation) => {
	app.get('/api/blogcount', Blog.getPostCollectionCount);
	app.get('/api/blogcollection', Blog.findPosts);
	// app.get('/posts/search?', Blog.searchForPosts);
	app.post(
		'/api/create/post',
		// upload.single('file'),
		// (req, res) => {
		// 	console.log('request headers', req.headers);
		// 	console.log('request file', req.file);
		// 	console.log('request body', req.body);
		// }
		// imageCreation.multerUpload,
		Blog.createPost
	);
	app.get(['/api/post/:id', '/blog/edit/api/fetch_one/:id'], Blog.showPost);
	app.put('/api/edit/post/:id', requireToken, auth.isLoggedIn, Blog.updatePost);
	app.delete(
		'/api/delete/post/:id',
		requireToken,
		auth.isLoggedIn,
		Blog.deletePost
	);
};
