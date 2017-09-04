const mongoose = require('mongoose');
const Project = mongoose.model('projects');
const navHelper = require('../middleware/navHelper');

//====================================================================================================================//
// CREATE A PROJECT
//====================================================================================================================//
exports.createProject = async (req, res) => {
	try {
		req.body.navTitle = navHelper.manipNavTitle(req.body.title);
		const newProject = req.body;

		await Project.create(newProject);
		res.status(201).json({ message: 'Succesfully added a new project!' });
	} catch (e) {
		res.status(500).json({
			err:
				'The server encountered a problem when attempting to create a project!'
		});
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
	} catch (e) {
		res.status(500).json({
			err: 'The server encountered a problem when attempting to find projects!'
		});
	}
};

//====================================================================================================================//
// GRAB A SINGLE PROJECT FOR EDITING
//====================================================================================================================//
exports.grabProject = async (req, res) => {
	try {
		const foundProject = await Project.findOne({ navTitle: req.params.id });

		res.status(201).json({ foundProject });
	} catch (e) {
		res.status(404).json({
			err:
				'The server encountered a problem when attempting to locate the project to be edited!'
		});
	}
};

//====================================================================================================================//
// UPDATE A SINGLE PROJECT
//====================================================================================================================//
exports.updateProject = async (req, res) => {
	try {
		req.body.navTitle = navHelper.manipNavTitle(req.body.title);
		const updateProject = req.body;

		await Project.findByIdAndUpdate(req.params.id, updateProject);
		res.status(201).json({ message: 'Succesfully edited the project!' });
	} catch (e) {
		res.status(500).json({
			err:
				'The server encountered a problem when attempting to update the project!'
		});
	}
};

//====================================================================================================================//
// DELETE A PROJECT
//====================================================================================================================//
exports.deleteProject = async (req, res) => {
	try {
		await Project.findByIdAndRemove(req.params.id);

		res.status(201).json({ message: 'Succesfully deleted the project!' });
	} catch (e) {
		res.status(500).json({
			err:
				'The server encountered a problem when attempting to delete the project!'
		});
	}
};
