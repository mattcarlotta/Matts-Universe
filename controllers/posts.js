const mongoose = require('mongoose');
const Post = mongoose.model('posts');
const moment = require('moment');
const navHelper = require('../middleware/navHelper');
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

const throwError = (res, err) => {
	console.log(err);
	res.status(500).json({ err: err.toString() });
};
// const upload = multer().single('file');
//====================================================================================================================//
// CREATE A POST
//====================================================================================================================//
exports.createPost = async (req, res) => {
	try {
		if (!req.body) throwError(res, 'There was a problem saving the image!');
		if (req.file) {
			req.body.image = {
				fileName: req.file.filename,
				originalName: req.file.originalname,
				path: req.file.path,
				size: req.file.size
			};
		}

		req.body.navTitle = navHelper.manipNavTitle(req.body.title);
		req.body.timestamp = moment().format('MMMM Do YYYY');
		req.body.createdAt = moment().unix();
		const newPost = req.body;
		await Post.create(newPost);
		res.status(201).json({ message: 'Succesfully added a new post!' });
	} catch (err) {
		console.log(err);
		throwError(res, err);
	}
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
	} catch (err) {
		throwError(res, err);
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
	} catch (err) {
		throwError(res, err);
	}
};

//====================================================================================================================//
// SHOW A SINGLE POST
//====================================================================================================================//
exports.showPost = async (req, res) => {
	try {
		const foundPost = await Post.findOne({ navTitle: req.params.id });

		res.status(201).json({ foundPost });
	} catch (err) {
		console.log(err);
		throwError(res, err);
	}
};

//====================================================================================================================//
// UPDATE A SINGLE POST
//====================================================================================================================//
exports.updatePost = async (req, res) => {
	// let
	try {
		console.log(req.file);
		if (!req.body) throwError(res, 'There was a problem saving the image!');

		if (req.file) {
			req.body.image = {
				fileName: req.file.filename,
				originalName: req.file.originalname,
				path: req.file.path,
				size: req.file.size
			};

			fs.unlink(`./${req.body.oldImage}`, function(err) {
				if (err) console.log(err);
			});
		}

		req.body.navTitle = navHelper.manipNavTitle(req.body.title);
		const updatePost = req.body;

		await Post.findByIdAndUpdate(req.params.id, updatePost);
		res.status(201).json({ message: 'Succesfully edited the post!' });
	} catch (err) {
		console.log(err);
		throwError(res, err);
	}
};

//====================================================================================================================//
// DELETE A SINGLE POST
//====================================================================================================================//
exports.deletePost = async (req, res, done) => {
	let imagePath;
	try {
		const { image: { path } } = await Post.findOne(
			{ _id: req.params.id },
			{ 'image.path': 1, _id: 0 }
		);
		imagePath = path;
	} catch (err) {
		throwError(res, err);
	}

	try {
		fs.unlink(`./${imagePath}`, async err => {
			if (err) throw err;

			await Post.findByIdAndRemove(req.params.id);
			res.status(201).json({ message: 'Succesfully deleted the post!' });
		});
	} catch (err) {
		throwError(res, err);
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
