module.exports = app => {
  const {
    createPost,
    deletePost,
    getPostCollectionCount,
    findPosts,
    showPost,
    updatePost
  } = app.controllers.posts;
  const { requireAuth } = app.services.strategies;
  const saveImage = app.services.sharp;

  app.get("/api/post/count", getPostCollectionCount);

  app.get("/api/post/collection", findPosts);

  app.post("/api/post/create", requireAuth, saveImage, createPost);

  app.get("/api/post/fetchpost/:id", showPost);

  app.put("/api/post/update/:id", requireAuth, saveImage, updatePost);

  app.delete("/api/post/delete/:id", requireAuth, deletePost);

  // app.get("/api/blogcount", Blog.getPostCollectionCount);
  // app.get("/api/blogcollection", Blog.findPosts);
  // app.get('/posts/search?', Blog.searchForPosts);
  // app.post("/api/create/post", (req, res, next) => {
  //   passport.authenticate("jwt", (err, user, errorMessage) => {
  //     if (err || !user || errorMessage) {
  //       res.status(401).json({ err: err ? err : errorMessage });
  //       return next();
  //     }
  //
  //     uploadImage(req, res, (err, success, errorMessage) => {
  //       if (err || errorMessage) {
  //         res.status(401).json({ err: err ? err : errorMessage });
  //         return next();
  //       }
  //
  //       Blog.createPost(req, res, next);
  //     });
  //   })(req, res, next);
  // });

  // app.get(["/api/post/:id", "/blog/edit/api/fetch_one/:id"], Blog.showPost);

  // app.put("/api/edit/post/:id", (req, res, next) => {
  //   passport.authenticate("jwt", (err, user, errorMessage) => {
  //     if (err || !user || errorMessage) {
  //       res.status(401).json({ err: err ? err : errorMessage });
  //       return next();
  //     }
  //
  //     uploadImage(req, res, (err, success, errorMessage) => {
  //       if (err || errorMessage) {
  //         res.status(401).json({ err: err ? err : errorMessage });
  //         return next();
  //       }
  //
  //       Blog.updatePost(req, res, next);
  //     });
  //   })(req, res, next);
  // });

  // app.delete("/api/delete/post/:id", (req, res, next) => {
  //   passport.authenticate("jwt", (err, user, errorMessage) => {
  //     if (err || !user || errorMessage) {
  //       res.status(401).json({ err: err ? err : errorMessage });
  //       return next();
  //     }
  //
  //     Blog.deletePost(req, res, next);
  //   })(req, res, next);
  // });
};
