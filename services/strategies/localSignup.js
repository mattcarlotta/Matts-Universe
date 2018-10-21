module.exports = app => {
  const { userAlreadyExists, missingCredentials } = app.shared.authErrors;
  const isEmpty = app.get("isEmpty");
  const bcrypt = app.get("bcrypt");
  const mongoose = app.get("mongoose");
  const LocalStrategy = app.get("LocalStrategy");
  const passport = app.get("passport");
  const User = mongoose.model("users");

  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        // override username with email
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true // allows us to send request to the callback
      },
      async (req, email, password, done) => {
        const { username } = req.body;

        // check to see if both an email, username, and password were supplied
        if (!email || !username || !password)
          return done(missingCredentials, false);

        try {
          // check to see if the email or username is already in use
          const existingUser = await User.find({
            $or: [{ email: email }, { username: username }]
          });

          // throw error if any matches
          if (!isEmpty(existingUser)) return done(userAlreadyExists, false);

          // create a hash + salted password\
          const salt = await bcrypt.genSalt(12);
          if (!salt) return next("Unable to generate password salt", false);

          const newPassword = await bcrypt.hash(password, salt, null);
          if (!newPassword)
            return next("Unable to generate secure password", false);

          //if new user, create and save user record
          const createdUser = new User({
            email: email,
            username: username,
            password: newPassword
          });

          // save user
          await createdUser.save();

          const getUserDetails = await User.find({ username })
            .lean()
            .select("-password");

          // set session
          req.session = { ...getUserDetails[0] };

          return done(null, true);
        } catch (err) {
          return done(err, false);
        }
      }
    )
  );
};
