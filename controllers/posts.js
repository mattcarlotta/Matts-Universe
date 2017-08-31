const Post = require('../models/post');
const moment = require('moment');
const navHelper = require('../middleware/navHelper');

//====================================================================================================================//
// CREATE A POST
//====================================================================================================================//
exports.createPost = (req, res) => {
	// try {
	// 	req.body.navTitle = navHelper.manipNavTitle(req.body.title);
	// 	req.body.timestamp = moment().format('MMMM Do YYYY');
	// 	req.body.createdAt = moment().unix();
	// 	const newPost = req.body;
	//
	// 	await Post.create(newPost);
	// 	res.status(201).json({ message: 'Succesfully added a new post!' });
	// } catch (e) {
	// 	res.status(500).json({
	// 		err:
	// 			'The server encountered a problem when attempting to create a post!'
	// 	});
	// }

	req.body.navTitle = navHelper.manipNavTitle(req.body.title);
	req.body.timestamp = moment().format('MMMM Do YYYY');
	req.body.createdAt = moment().unix();
	const newPost = req.body;

	Post.create(newPost, (err, message) => {
		if (err)
			res.status(500).json({
				err:
					'The server encountered a problem when attempting to create a post!'
			});
		else res.status(201).json({ message: 'Succesfully added a new post!' });
	});
};

//====================================================================================================================//
// FIND POST (INITIAL FIND + PREV/NEXT 10 RECORDS FOR PAGINATION) AND GET POST COLLECTION LENGTH (FOR PAGINATION)
//====================================================================================================================//
exports.findPosts = async (req, res) => {
	try {
		const skipByValue = parseInt(req.query.skipByValue);

		const allPosts = await Post.find({})
			.skip(skipByValue)
			.limit(10)
			.sort({ _id: -1 });
		res.status(201).json({ posts: navHelper.stripDescription(allPosts) });
	} catch (e) {
		res.status(404).json({
			err: 'The server encountered a problem when attempting to find posts!'
		});
	}
};

//====================================================================================================================//
//GET POST COLLECTION LENGTH (FOR PAGINATION)
//====================================================================================================================//
exports.getPostCollectionCount = async (req, res) => {
	try {
		const postCount = await Post.count({});

		res.status(201).json({
			pageCount: navHelper.covertToArray(Math.ceil(postCount / 10)),
			postCount: 10 * Math.ceil(postCount / 10)
		});
	} catch (e) {
		res
			.status(404)
			.json({ err: 'The server was unable to find any blog content!' });
	}
};

//====================================================================================================================//
// SHOW A SINGLE POST
//====================================================================================================================//
exports.showPost = async (req, res) => {
	try {
		const foundPost = await Post.findOne({ navTitle: req.params.id });

		res.status(201).json({ foundPost });
	} catch (e) {
		res.status(404).json({
			err:
				'The server encountered a problem when attempting to locate the post to be viewed!'
		});
	}
};

//====================================================================================================================//
// UPDATE A SINGLE POST
//====================================================================================================================//
exports.updatePost = (req, res) => {
	// try {
	// 	req.body.navTitle = navHelper.manipNavTitle(req.body.title);
	// 	const updatePost = req.body;
	// 	await Post.findByIdAndUpdate(req.params.id, updatePost);
	//
	// 	 res.status(201).json({ message: 'Succesfully edited the post!' });
	// } catch (e) {
	// 		res.status(500).json({
	// 			err:
	// 				'The server encountered a problem when attempting to update the post!'
	// 		});
	// }
	//

	req.body.navTitle = navHelper.manipNavTitle(req.body.title);
	const updatePost = req.body;

	Post.findByIdAndUpdate(req.params.id, updatePost, (err, foundPost) => {
		if (err)
			res.status(500).json({
				err:
					'The server encountered a problem when attempting to update the post!'
			});
		if (!foundPost)
			res.status(404).json({
				err:
					'The server encountered a problem when attempting to locate the post to be updated!'
			});
		else res.status(201).json({ message: 'Succesfully edited the post!' });
	});
};

//====================================================================================================================//
// DELETE A SINGLE POST
//====================================================================================================================//
exports.deletePost = async (req, res) => {
	try {
		await Post.findByIdAndRemove(req.params.id);

		res.status(201).json({ message: 'Succesfully deleted the post!' });
	} catch (e) {
		res.status(500).json({
			err:
				'The server encountered a problem when attempting to delete the post!'
		});
	}
};

//====================================================================================================================//
// SEARCH FOR POSTS BY TITLE
//====================================================================================================================//
// exports.searchForPosts = (req, res) => {
// 	Post.find(
// 		{ title: { $regex: new RegExp(req.query.searchByTitle, 'i') } },
// 		(err, allPosts) => {
// 			if (err || allPosts.length == 0)
// 				res.status(404).json({
// 					err:
// 						'The server was unable to locate blog posts matching the search term!'
// 				});
// 			else res.status(201).json({ posts: allPosts });
// 		}
// 	).sort({ _id: -1 });
// };
