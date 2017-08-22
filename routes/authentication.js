const express = require('express');
const app = express.Router();
const passport = require('passport');

const Authentication = require('../controllers/authentication');
const passportService = require('../middleware/passport');
const requireToken = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

const auth = require('../middleware/userHelper');

app.post('/api/signup', Authentication.signup);
app.post('/api/signin', requireSignin, Authentication.signin);
app.get(
	'*/api/signedin',
	requireToken,
	auth.isLoggedIn,
	Authentication.signedin
);
module.exports = app;
