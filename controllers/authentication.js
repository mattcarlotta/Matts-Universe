module.exports = app => {
  const mongoose = app.get("mongoose");
  const passport = app.get("passport");
  const User = mongoose.model("users");
  const { badCredentials } = app.shared.authErrors;
  const { sendError } = app.shared.helpers;

  return {
    // signedin: async (userId, res, done) => {
    //   const existingUser = await User.findById(userId);
    //
    //   if (!userId || !existingUser) {
    //     res.status(401).json({
    //       err:
    //         "There was a problem with your login credentials. Please sign in again!"
    //     });
    //     return done();
    //   }
    //
    //   res
    //     .status(200)
    //     .json({ user: existingUser.username, isGod: existingUser.god });
    // },
    signin: (req, res, done) =>
      passport.authenticate(
        "local-login",
        err =>
          err || !req.session
            ? sendError(err || badCredentials, res, done)
            : res.status(201).json({ ...req.session })
      )(req, res, done),
    signedin: (req, res, done) =>
      !req.session
        ? sendError(badCredentials, res, done)
        : res
            .status(201)
            .json({ user: req.session.username, isGod: req.session.god }),
    // signin: async (userId, res, done) => {
    //   const existingUser = await User.findById(userId);
    //
    //   if (!existingUser) {
    //     res
    //       .status(401)
    //       .json({
    //         err:
    //           "There was a problem with your login credentials. Please sign in again!"
    //       });
    //     return done();
    //   }
    //
    //   res.status(200).json({
    //     token: tokenForUser(userId),
    //     user: existingUser.username,
    //     isGod: existingUser.god
    //   });
    // },
    // signup: (req, res, done) =>
    //   passport.authenticate(
    //     "local-signup",
    //     err =>
    //       err
    //         ? sendError(err, res, done)
    //         : res
    //             .status(201)
    //             .json({ user: req.session.username, isGod: req.session.god })
    //   )(req, res, done),
    signup: (req, res, done) =>
      passport.authenticate(
        "local-signup",
        err =>
          err
            ? sendError(err, res, done)
            : res.status(201).json({ ...req.session })
      )(req, res, done),
    signout: (req, res, done) => {
      req.session = null;
      res
        .clearCookie("Authorization", { path: "/" })
        .status(200)
        .send("Cookie deleted.");
    }
    // signup = async (req, res, done) => {
    // 	const email = req.body.email;
    // 	const password = req.body.password;
    // 	const username = req.body.username;
    //
    // 	if (!email || !username || !password) {
    // 		res.status(400).send({ err: 'Missing credentials' });
    // 		return done();
    // 	}
    //
    // 	// check if email exists
    // 	const existingUser = await User.find({$or:[{email: email},{username: username}]})
    // 		// throw error if any matches
    // 	if (existingUser) {
    // 		res.status(400).send({ err: 'That email and/or username is currently in use!' });
    // 		return done();
    // 	}
    //
    // 	// if new user, create and save user record
    // 	const user = new User({ email: email, username: username, password: password });
    // 	// save user
    // 	await user.save();
    // 	// send back a token and user
    // 	res.json({ token: tokenForUser(user), user: user.username });
    // }
  };
};
