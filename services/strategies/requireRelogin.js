module.exports = app => (req, res, next) => {
  const isEmpty = app.get('isEmpty');

  return isEmpty(req.session) || !req.session.id || !req.session.god
    ? res.status(200).send(null)
    : next();
};
