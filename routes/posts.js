const multer = require('multer');
const fs = require('fs');

storage = multer.diskStorage({
	destination: function(request, file, callback) {
		callback(null, 'client/public/uploads/');
	},
	limits: { fileSize: 10000000, files: 1 },
	filename: function(request, file, callback) {
		callback(null, Date.now() + '-' + file.originalname);
	},
	fileFilter: (req, file, callback) => {
		if (!file.originalname.match(/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/)) {
			return callback(new Error('Only images are allowed!'), false);
		}
		callback(null, true);
	}
});

const upload = multer({ storage: storage }).single('file');

module.exports = (app, Blog, requireToken, auth, imageCreation) => {
	app.get('/api/blogcount', Blog.getPostCollectionCount);
	app.get('/api/blogcollection', Blog.findPosts);
	// app.get('/posts/search?', Blog.searchForPosts);
	app.post(
		'/api/create/post',
		requireToken,
		auth.isLoggedIn,
		upload,
		Blog.createPost
	);
	app.get(['/api/post/:id', '/blog/edit/api/fetch_one/:id'], Blog.showPost);
	app.put(
		'/api/edit/post/:id',
		requireToken,
		auth.isLoggedIn,
		upload,
		Blog.updatePost
	);
	app.delete(
		'/api/delete/post/:id',
		requireToken,
		auth.isLoggedIn,
		Blog.deletePost
	);
};
