module.exports = app => {
  const fs = app.get("fs");
  const mongoose = app.get("mongoose");
  const moment = app.get("moment");
  const {
    covertToArray,
    manipNavTitle,
    sendError,
    stripDescription
  } = app.shared.helpers;
  const Post = mongoose.model("posts");
  const APIURL = app.get("APIURL");

  return {
    createPost: async (req, res, done) => {
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

        req.body.navTitle = manipNavTitle(req.body.title);
        req.body.timestamp = moment().format("dddd, MM.DD.YY");
        req.body.createdAt = moment().unix();

        await Post.create(req.body);

        res.status(201).json({ message: "Succesfully added a new post!" });
      } catch (err) {
        return sendError(err, res, done);
      }
    },
    findPosts: async (req, res, done) => {
      try {
        const skipByValue = parseInt(req.query.skipByValue);

        const allPosts = await Post.find({})
          .skip(skipByValue)
          .limit(10)
          .sort({ _id: -1 });

        res.status(201).json({ posts: stripDescription(allPosts) });
      } catch (err) {
        return sendError(err, res, done);
      }
    },
    getPostCollectionCount: async (req, res, done) => {
      try {
        const postCount = await Post.countDocuments({});

        res.status(201).json({
          pageCount: covertToArray(Math.ceil(postCount / 10)),
          postCount: 10 * Math.ceil(postCount / 10)
        });
      } catch (err) {
        return sendError(err, res, done);
      }
    },
    showPost: async (req, res, done) => {
      const { id } = req.params;
      if (!id) return sendError("Missing fetch post query params.", res, done);

      try {
        const foundItem = await Post.findOne({ navTitle: id });
        if (!foundItem)
          sendError("Unable to locate the requested post!", res, done);

        res.status(201).json({ foundItem });
      } catch (err) {
        return sendError(err, res, done);
      }
    },
    updatePost: async (req, res, done) => {
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
              err ? "There was a problem updating the old post image!" : false
          );

          if (unlinkError) return sendError(unlinkError, res, done);
        }

        req.body.navTitle = manipNavTitle(req.body.title);
        await Post.findByIdAndUpdate(req.params.id, req.body);

        res.status(201).json({ message: "Succesfully edited the post!" });
      } catch (err) {
        return sendError(err, res, done);
      }
    },
    deletePost: async (req, res, done) => {
      try {
        const {
          image: { path }
        } = await Post.findOne(
          { _id: req.params.id },
          { "image.path": 1, _id: 0 }
        );

        if (!path)
          return sendError(
            "Unable to locate the image file path to be deleted!",
            res,
            done
          );

        const unlinkError = await fs.unlink(
          `./${path}`,
          err =>
            err ? "Unable to remove the image from the uploads folder!" : false
        );

        if (unlinkError) return sendError(unlinkError, res, done);

        await Post.findByIdAndRemove(req.params.id);

        res.status(201).json({ message: "Succesfully deleted the post!" });
      } catch (err) {
        return sendError(err, res, done);
      }
    }
  };
};
