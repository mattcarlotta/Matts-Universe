module.exports = app => {
  const map = app.get("map");

  return {
    manipNavTitle: title =>
      (title = title.replace(/[^\w\s]/gi, "").replace(/ /g, "-")),
    covertToArray: int => {
      const arr = [];
      for (var i = 0; i < int; i++) {
        arr.push(i);
      }
      return arr;
    },
    stripDescription: allPosts =>
      map(allPosts, post => {
        post.description.length >= 497 &&
          (post.description = post.description.substring(0, 496) + "...");
        return post;
      }),
    sendError: (err, res, done) => {
      res.status(500).json({ err: err.toString() });
      done();
    }
  };
};
