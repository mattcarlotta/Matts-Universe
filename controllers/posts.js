const Post = require('../models/post');
const moment = require('moment');
const navHelper = require('../middleware/navHelper');

//====================================================================================================================//
// CREATE A POST
//====================================================================================================================//
exports.createPost = (req, res) => {
	req.body.navTitle = navHelper.manipNavTitle(req.body.title);
	req.body.timestamp = moment().format('MMMM Do YYYY');
	req.body.createdAt = moment().unix();
	const newPost = req.body;

	Post.create(newPost, (err, message) => {
		if (err)
			res
				.status(500)
				.json({
					err:
						'The server encountered a problem when attempting to create a post!'
				});
		else res.status(201).json({ message: 'Succesfully added a new post!' });
	});
};

//====================================================================================================================//
// FIND POST (INITIAL FIND + PREV/NEXT 10 RECORDS FOR PAGINATION) AND GET POST COLLECTION LENGTH (FOR PAGINATION)
//====================================================================================================================//
exports.findPosts = (req, res) => {
	const skipByValue = parseInt(req.query.skipByValue);

	Post.find({}, (err, allPosts) => {
		if (err || !allPosts)
			res
				.status(404)
				.json({
					err: 'The server encountered a problem when attempting to find posts!'
				});
		else res.status(201).json({ posts: navHelper.stripDescription(allPosts) });
	})
		.skip(skipByValue)
		.limit(10)
		.sort({ _id: -1 });
};

//====================================================================================================================//
//GET POST COLLECTION LENGTH (FOR PAGINATION)
//====================================================================================================================//
exports.getPostCollectionCount = (req, res) => {
	Post.count({}).exec((err, postCount) => {
		if (err || !postCount) {
			res
				.status(404)
				.json({ err: 'The server was unable to find any blog content!' });
		} else
			res
				.status(201)
				.json({
					pageCount: navHelper.covertToArray(Math.ceil(postCount / 10)),
					postCount: 10 * Math.ceil(postCount / 10)
				});
	});
};

//====================================================================================================================//
// SHOW A SINGLE POST
//====================================================================================================================//
exports.showPost = (req, res) => {
	Post.findOne({ navTitle: req.params.id }, (err, foundPost) => {
		if (err || !foundPost)
			res
				.status(404)
				.json({
					err:
						'The server encountered a problem when attempting to locate the post to be viewed!'
				});
		else res.status(201).json({ post: foundPost });
	});
};

//====================================================================================================================//
// UPDATE A SINGLE POST
//====================================================================================================================//
exports.updatePost = (req, res) => {
	req.body.navTitle = navHelper.manipNavTitle(req.body.title);
	const updatePost = req.body;

	Post.findByIdAndUpdate(req.params.id, updatePost, (err, foundPost) => {
		if (err)
			res
				.status(500)
				.json({
					err:
						'The server encountered a problem when attempting to update the post!'
				});
		if (!foundPost)
			res
				.status(404)
				.json({
					err:
						'The server encountered a problem when attempting to locate the post to be updated!'
				});
		else res.status(201).json({ message: 'Succesfully edited the post!' });
	});
};

//====================================================================================================================//
// DELETE A SINGLE POST
//====================================================================================================================//
exports.deletePost = (req, res) => {
	Post.findByIdAndRemove(req.params.id, (err, foundPost) => {
		if (err)
			res
				.status(500)
				.json({
					err:
						'The server encountered a problem when attempting to delete the post!'
				});
		if (!foundPost)
			res
				.status(404)
				.json({
					err:
						'The server encountered a problem when attempting to locate the post to be deleted!'
				});
		else res.status(201).json({ message: 'Succesfully deleted the post!' });
	});
};

//====================================================================================================================//
// SEARCH FOR POSTS BY TITLE
//====================================================================================================================//
exports.searchForPosts = (req, res) => {
	Post.find(
		{ title: { $regex: new RegExp(req.query.searchByTitle, 'i') } },
		(err, allPosts) => {
			if (err || allPosts.length == 0)
				res
					.status(404)
					.json({
						err:
							'The server was unable to locate blog posts matching the search term!'
					});
			else res.status(201).json({ posts: allPosts });
		}
	).sort({ _id: -1 });
};
