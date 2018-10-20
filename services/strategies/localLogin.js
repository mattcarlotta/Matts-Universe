module.exports = app => {
  // const { db, query: { findUserByEmail, getUserDetails } } = app.database;
  const { alreadyLoggedIn, badCredentials } = app.shared.authErrors;
  const bcrypt = app.get("bcrypt");
  const LocalStrategy = app.get("LocalStrategy");
  const passport = app.get("passport");

  passport.use(
    "local-login",
    new LocalStrategy(
      {
        // override username with email
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true
      },
      async (req, username, password, done) => {
        if (!email || !password) return done(badCredentials, false);

        try {
          // check to see if user is logged in from another session
          const { id } = req.session;
          if (id) return done(alreadyLoggedIn, false);

          // check to see if the user already exists
          const existingUser = await User.findOne({ username: username });
          if (!existingUser) return done(badCredentials, false);

          // compare password to existingUser password
          const isMatch = await user.comparePassword(password);
          if (!isMatch) return done(badCredentials, false);

          // set session
          req.session = { ...existingUser };

          return done(null, true);
        } catch (err) {
          return done(err, false);
        }
      }
    )
  );
};
