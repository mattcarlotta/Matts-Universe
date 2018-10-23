module.exports = (app) => {
  const { signin, signedin, signout } = app.controllers.authentication;
  const { requireRelogin } = app.services.strategies;

  // app.post('/api/signup', signup);

  app.post('/api/signin', signin);

  app.get('/api/signedin', requireRelogin, signedin);

  app.post('/api/signout', signout);

  // app.post("/api/signin", (req, res, next) => {
  //   passport.authenticate("local", (err, user, errorMessage) => {
  //     if (err || errorMessage) {
  //       res.status(401).json({ err: errorMessage });
  //       return next();
  //     }
  //
  //     Authentication.signin(user._id, res, next);
  //   })(req, res, next);
  // });

  // app.get("*/api/signedin", (req, res, next) => {
  //   passport.authenticate("jwt", (err, user, errorMessage) => {
  //     if (err || !user || errorMessage) {
  //       res.status(401).json({ err: err ? err : errorMessage });
  //       return next();
  //     }
  //
  //     Authentication.signedin(user._id, res, next);
  //   })(req, res, next);
  // });
};
