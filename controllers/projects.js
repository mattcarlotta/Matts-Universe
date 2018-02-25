const env = require('../config/env');
const mongoose = require('mongoose');
const Project = mongoose.model('projects');
const manipNavTitle = require('../middleware/navHelper').manipNavTitle;
const throwError = require('../middleware/throwError');
const fs = require('fs');

//====================================================================================================================//
// CREATE A PROJECT
//====================================================================================================================//
exports.createProject = async (req, res) => {
	try {
		if (!req.file) throw Error('Unable to locate requested image to be save!');

		req.body.image = {
			fileName: req.file.filename,
			originalName: req.file.originalname,
			path: req.file.path,
			apiURL: env.APIURL + req.file.path,
			size: req.file.size
		};

		req.body.navTitle = await manipNavTitle(req.body.title);
		const newProject = req.body;

		await Project.create(newProject);
		res.status(201).json({ message: 'Succesfully added a new project!' });
	} catch (err) {
		throwError(res, err);
	}
};

//====================================================================================================================//
// GRAB ALL PROJECTS
//====================================================================================================================//
exports.findProjects = async (req, res) => {
	try {
		const projects = await Project.find({}).sort({ _id: -1 });
		const projectCount = await Project.count({});

		res.status(201).json({ projects, projectCount });
	} catch (err) {
		throwError(res, err);
	}
};

//====================================================================================================================//
// GRAB A SINGLE PROJECT FOR EDITING
//====================================================================================================================//
exports.grabProject = async (req, res) => {
	try {
		const foundItem = await Project.findOne({ navTitle: req.params.id });

		if (!foundItem) throw Error('Unable to locate requested project!')

		res.status(201).json({ foundItem });
	} catch (err) {
		throwError(res, err);
	}
};

//====================================================================================================================//
// UPDATE A SINGLE PROJECT
//====================================================================================================================//
exports.updateProject = async (req, res) => {
	try {
		let unlinkError;

		if (req.file) {
			req.body.image = {
				fileName: req.file.filename,
				originalName: req.file.originalname,
				path: req.file.path,
				apiURL: env.APIURL + req.file.path,
				size: req.file.size
			};

			await fs.unlink(`./${req.body.oldImage}`, function(err) {
				if (err) unlinkError = 'There was a problem updating the old project image!';
			});
		}

		if (unlinkError) throw unlinkError;

		req.body.navTitle = await manipNavTitle(req.body.title);
		const updateProject = req.body;

		await Project.findByIdAndUpdate(req.params.id, updateProject);
		res.status(201).json({ message: 'Succesfully edited the project!' });
	} catch (err) {
		throwError(res, err);
	}
};

//====================================================================================================================//
// DELETE A PROJECT
//====================================================================================================================//
exports.deleteProject = async (req, res) => {
	try {
		const { image: { path } } = await Project.findOne({ _id: req.params.id }, { 'image.path': 1, _id: 0 });

		if (!path) throw Error('Unable to locate image file path to be deleted!')

		fs.unlink(`./${path}`, async err => {
			if (err) throw err;

			await Project.findByIdAndRemove(req.params.id);
			res.status(201).json({ message: 'Succesfully deleted the Project!' });
		});
	} catch (err) {
		throwError(res, err);
	}
};
