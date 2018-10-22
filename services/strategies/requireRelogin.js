module.exports = app => (req, res, next) => {
  const isEmpty = app.get('isEmpty');
  return isEmpty(req.session) ? res.status(201).send(null) : next();
};
