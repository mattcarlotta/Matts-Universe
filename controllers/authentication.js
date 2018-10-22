module.exports = (app) => {
  const passport = app.get('passport');
  const { badCredentials } = app.shared.authErrors;
  const { sendError } = app.shared.helpers;

  return {
    signin: (req, res, done) => passport.authenticate(
      'local-login',
      err => (err || !req.session
        ? sendError(err || badCredentials, res, done)
        : res.status(201).json({ ...req.session })),
    )(req, res, done),
    signedin: (req, res, done) => (!req.session
      ? sendError(badCredentials, res, done)
      : res.status(201).json({ ...req.session })),
    signup: (req, res, done) => passport.authenticate(
      'local-signup',
      err => (err
        ? sendError(err, res, done)
        : res.status(201).json({ ...req.session })),
    )(req, res, done),
    signout: (req, res) => {
      req.session = null;
      res
        .clearCookie('Authorization', { path: '/' })
        .status(200)
        .send('Cookie deleted.');
    },
  };
};
