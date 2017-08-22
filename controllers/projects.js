const Project = require('../models/project');
const navHelper = require('../middleware/navHelper');

//====================================================================================================================//
// CREATE A PROJECT
//====================================================================================================================//
exports.createProject = (req, res) => {
	req.body.navTitle = navHelper.manipNavTitle(req.body.title);
  const newProject = req.body;

	Project.create(newProject, (err, message) => {
		if (err) res.status(500).json({ err: 'The server encountered a problem when attempting to create a project!' });

		else res.status(201).json({ message: 'Succesfully added a new project!' });
	});
}

//====================================================================================================================//
// READ ALL PROJECTS
//====================================================================================================================//
exports.findProjects = (req, res) => {
	Project.find({}, (err, foundProject) => {
		if (err || !foundProject) res.status(404).json({ err: 'The server encountered a problem when attempting to find projects!' });

		else
			Project.count({}, (err, projectCount) => {
				if (err || !projectCount) res.status(404).json({ err: 'The server was unable to locate any projects!' });

				else res.status(201).json({foundProject: foundProject, projectCount: projectCount});
			});
	}).sort({_id: -1});
}

//====================================================================================================================//
// GRAB A SINGLE PROJECT FOR EDITING
//====================================================================================================================//
exports.grabProject = (req, res) => {
	Project.findOne({navTitle: req.params.id}, (err, foundProject) => {
	  if (err || !foundProject) res.status(404).json({ err: 'The server encountered a problem when attempting to locate the project to be edited!' });

	  else res.status(201).json({project: foundProject});
	});
}

//====================================================================================================================//
// UPDATE A SINGLE PROJECT
//====================================================================================================================//
exports.updateProject = (req, res) => {
  req.body.navTitle = navHelper.manipNavTitle(req.body.title);
	const updateProject = req.body;

	Project.findByIdAndUpdate(req.params.id, updateProject, (err, foundProject) => {
		if (err) res.status(500).json({ err: 'The server encountered a problem when attempting to update the project!' });
		if (!foundProject) res.status(404).json({ err: 'The server encountered a problem when attempting to locate the project to be updated!' });

   	else res.status(201).json({ message: 'Succesfully edited the project!'});
	});
}

//====================================================================================================================//
// DELETE A PROJECT
//====================================================================================================================//
exports.deleteProject = (req, res) => {
	Project.findByIdAndRemove(req.params.id, (err, foundProject) => {
		if (err) res.status(500).json({ err: 'The server encountered a problem when attempting to delete the project!' });
		if (!foundProject) res.status(404).json({ err: 'The server encountered a problem when attempting to locate the project to be deleted!' });

 		else res.status(201).json({ message: 'Succesfully deleted the project!' });
	});
}
