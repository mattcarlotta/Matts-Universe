module.exports = app => {
  const passport = require("passport");
  const { Projects } = app.controllers;
  // const { uploadImage }

  app.get("/api/projectscollection", Projects.findProjects);

  app.post("/api/create/project", (req, res, next) => {
    passport.authenticate("jwt", (err, user, errorMessage) => {
      if (err || !user || errorMessage) {
        res.status(401).json({ err: err ? err : errorMessage });
        return next();
      }

      uploadImage(req, res, (err, success, errorMessage) => {
        if (err || errorMessage) {
          res.status(401).json({ err: err ? err : errorMessage });
          return next();
        }

        Projects.createProject(req, res, next);
      });
    })(req, res, next);
  });

  app.get("/api/project/:id", Projects.grabProject);

  app.put("/api/edit/project/:id", (req, res, next) => {
    passport.authenticate("jwt", (err, user, errorMessage) => {
      if (err || !user || errorMessage) {
        res.status(401).json({ err: err ? err : errorMessage });
        return next();
      }

      uploadImage(req, res, (err, success, errorMessage) => {
        if (err || errorMessage) {
          res.status(401).json({ err: err ? err : errorMessage });
          return next();
        }

        Projects.updateProject(req, res, next);
      });
    })(req, res, next);
  });

  app.delete("/api/delete/project/:id", (req, res, next) => {
    passport.authenticate("jwt", (err, user, errorMessage) => {
      if (err || !user || errorMessage) {
        res.status(401).json({ err: err ? err : errorMessage });
        return next();
      }

      Projects.deleteProject(req, res, next);
    })(req, res, next);
  });
};
