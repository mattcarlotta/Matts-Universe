module.exports = (app, Blog, requireToken, auth) => {
	app.get('/api/blogcount', Blog.getPostCollectionCount);
	app.get('/api/blogcollection', Blog.findPosts);
	// app.get('/posts/search?', Blog.searchForPosts);
	app.post('/api/create/post', requireToken, auth.isLoggedIn, Blog.createPost);
	app.get(['/api/post/:id', '/blog/edit/api/fetch_one/:id'], Blog.showPost);
	app.put('/api/edit/post/:id', requireToken, auth.isLoggedIn, Blog.updatePost);
	app.delete(
		'/api/delete/post/:id',
		requireToken,
		auth.isLoggedIn,
		Blog.deletePost
	);
};
