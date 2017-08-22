const express = require('express');
const app = express.Router();
const passport = require('passport');
const Blog = require('../controllers/posts');

const passportService = require('../middleware/passport');
const auth = require('../middleware/userHelper');
const requireToken = passport.authenticate('jwt', { session: false });

app.get('/blog/api/count', Blog.getPostCollectionCount);
app.get('/blog/api/collection', Blog.findPosts);
// app.get('/posts/search?', Blog.searchForPosts);
app.post(
	'/blog/post/api/create_post',
	requireToken,
	auth.isLoggedIn,
	Blog.createPost
);
app.get(
	['/blog/post/api/fetch_one/:id', '/blog/edit/api/fetch_one/:id'],
	Blog.showPost
);
app.put(
	'/blog/edit/api/edit_post/:id',
	requireToken,
	auth.isLoggedIn,
	Blog.updatePost
);
app.delete(
	'/blog/api/delete_post/:id',
	requireToken,
	auth.isLoggedIn,
	Blog.deletePost
);

module.exports = app;
