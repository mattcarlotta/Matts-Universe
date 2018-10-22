module.exports = (app) => {
  const { alreadyLoggedIn, badCredentials } = app.shared.authErrors;
  const mongoose = app.get('mongoose');
  const LocalStrategy = app.get('LocalStrategy');
  const passport = app.get('passport');
  const User = mongoose.model('users');

  passport.use(
    'local-login',
    new LocalStrategy(
      {
        // override username with email
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true,
      },
      async (req, username, password, done) => {
        if (!username || !password) return done(badCredentials, false);

        try {
          // check to see if user is logged in from another session
          const { id } = req.session;
          if (id) return done(alreadyLoggedIn, false);

          // check to see if the user already exists
          const existingUser = await User.findOne({ username });
          if (!existingUser) return done(badCredentials, false);

          // compare password to existingUser password
          await existingUser.comparePassword(password);

          // set session
          req.session = {
            id: existingUser._id, // eslint-disable-line no-underscore-dangle
            username: existingUser.username,
            god: existingUser.god,
          };

          return done(null, true);
        } catch (err) {
          return done(err, false);
        }
      },
    ),
  );
};
