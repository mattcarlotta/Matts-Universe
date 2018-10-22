module.exports = app => (req, res, next) => {
  const isEmpty = app.get('isEmpty');
  const { badCredentials } = app.shared.authErrors;

  return isEmpty(req.session)
    ? res.status(401).send({ err: badCredentials })
    : next();
};
