module.exports = (app) => {
  const { userAlreadyExists, missingCredentials } = app.shared.authErrors;
  const isEmpty = app.get('isEmpty');
  const mongoose = app.get('mongoose');
  const LocalStrategy = app.get('LocalStrategy');
  const passport = app.get('passport');
  const User = mongoose.model('users');

  passport.use(
    'local-signup',
    new LocalStrategy(
      {
        // override username with email
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true, // allows us to send request to the callback
      },
      async (req, username, password, done) => {
        const { email } = req.body;

        // check to see if both an email, username, and password were supplied
        if (!email || !username || !password) return done(missingCredentials, false);

        try {
          // check to see if the email or username is already in use
          const existingUser = await User.find({
            $or: [{ email }, { username }],
          });

          // throw error if any matches
          if (!isEmpty(existingUser)) return done(userAlreadyExists, false);

          // generate salted + hashed password
          const newPassword = await User.createPassword(password);

          // create new user
          const createdUser = await User.createUser({
            email,
            username,
            password: newPassword,
          });

          // set session
          req.session = {
            id: createdUser._id, // eslint-disable-line no-underscore-dangle
            username: createdUser.username,
            god: createdUser.god,
          };

          return done(null, true);
        } catch (err) {
          return done(err, false);
        }
      },
    ),
  );
};
