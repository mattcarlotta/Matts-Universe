module.exports = app => {
  const { alreadyLoggedIn, badCredentials } = app.shared.authErrors;
  const mongoose = app.get("mongoose");
  const LocalStrategy = app.get("LocalStrategy");
  const passport = app.get("passport");
  const User = app.models.user;

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
        console.log("triggered");
        console.log("username", username);
        console.log("password", password);
        if (!username || !password) return done(badCredentials, false);

        try {
          // check to see if user is logged in from another session
          const { id } = req.session;
          if (id) return done(alreadyLoggedIn, false);

          // check to see if the user already exists
          const existingUser = await User.findOne({ username: username });
          console.log("existingUser", existingUser);
          if (!existingUser) return done(badCredentials, false);

          // compare password to existingUser password
          const { err, isMatch } = await existingUser.comparePassword(password);
          console.log("err", err);
          console.log("isMatch", isMatch);
          if (err || !isMatch) return done(err || badCredentials, false);

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
