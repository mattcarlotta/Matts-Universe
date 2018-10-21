module.exports = app => {
  const { manipNavTitle, sendError } = app.shared.helpers;
  const fs = app.get("fs");
  const mongoose = require("mongoose");
  const Project = mongoose.model("projects");
  const APIURL = app.get("APIURL");

  return {
    createProject: async (req, res, done) => {
      try {
        if (!req.file)
          return sendError(
            "Unable to locate requested image to be save!",
            res,
            done
          );

        req.body.image = {
          fileName: req.file.filename,
          originalName: req.file.originalname,
          path: req.file.path,
          apiURL: APIURL + req.file.path,
          size: req.file.size
        };

        req.body.navTitle = await manipNavTitle(req.body.title);

        await Project.create(req.body);
        res.status(201).json({ message: "Succesfully added a new project!" });
      } catch (err) {
        return sendError(err, res, done);
      }
    },
    findProjects: async (req, res, done) => {
      try {
        const projects = await Project.find({}).sort({ _id: -1 });
        const projectCount = await Project.countDocuments({});

        res.status(201).json({ projects, projectCount });
      } catch (err) {
        return sendError(err, res, done);
      }
    },
    grabProject: async (req, res, done) => {
      const { id } = req.params;
      if (!id) return sendError("Missing edit project query params", res, done);

      try {
        const foundItem = await Project.findOne({ navTitle: id });
        if (!foundItem)
          return sendError("Unable to locate requested project!", res, done);

        res.status(201).json({ foundItem });
      } catch (err) {
        return sendError(err, res, done);
      }
    },
    updateProject: async (req, res, done) => {
      try {
        if (req.file) {
          req.body.image = {
            fileName: req.file.filename,
            originalName: req.file.originalname,
            path: req.file.path,
            apiURL: APIURL + req.file.path,
            size: req.file.size
          };

          const unlinkError = await fs.unlink(
            `./${req.body.oldImage}`,
            err =>
              err
                ? "There was a problem updating the old project image!"
                : false
          );

          if (unlinkError) return sendError(unlinkError, res, done);
        }

        req.body.navTitle = await manipNavTitle(req.body.title);
        const updateProject = req.body;

        await Project.findByIdAndUpdate(req.params.id, updateProject);
        res.status(201).json({ message: "Succesfully edited the project!" });
      } catch (err) {
        return sendError(err, res, done);
      }
    },
    deleteProject: async (req, res, done) => {
      try {
        const {
          image: { path }
        } = await Project.findOne(
          { _id: req.params.id },
          { "image.path": 1, _id: 0 }
        );

        if (!path)
          return sendError(
            "Unable to locate image file path to be deleted!",
            res,
            done
          );

        const unlinkError = await fs.unlink(
          `./${path}`,
          err =>
            err
              ? "Unable to remove the project image from the uploads folder!"
              : false
        );

        if (unlinkError) return sendError(unlinkError, res, done);

        await Project.findByIdAndRemove(req.params.id);
        res.status(201).json({ message: "Succesfully deleted the Project!" });
      } catch (err) {
        return sendError(err, res, done);
      }
    }
  };
};
