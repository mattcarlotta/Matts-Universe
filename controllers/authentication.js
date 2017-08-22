const jwt = require('jwt-simple');
const moment = require('moment');

const User = require('../models/user');
const config = require('../config/vars');

const tokenForUser = user => {
	const timestamp = new Date().getTime();
	return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
};

exports.signedin = (req, res, next) => {
	const userId = req.user; // pulled from userHelper isLoggedIn middleware

	User.findById(userId).exec(function(err, existingUser) {
		if (err) {
			res.status(401).json({
				err:
					'There was a problem with your login credentials. Please sign in again!'
			});
			return next(err);
		}
		if (!existingUser) {
			return next(null, false);
		}

		res
			.status(200)
			.json({ user: existingUser.username, isGod: existingUser.god });
	});
};

exports.signin = (req, res, next) => {
	const userId = req.user._id; // pulled from userHelper isLoggedIn middleware

	User.findById(userId).exec(function(err, existingUser) {
		if (err) {
			res.status(401).json({
				err:
					'There was a problem with your login credentials. Please sign in again!'
			});
			return next(err);
		}

		if (!existingUser) {
			return next(null, false);
		} else res.status(200).json({ token: tokenForUser(req.user), user: existingUser.username, isGod: existingUser.god });
	});
};

exports.signup = (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;
	const username = req.body.username;

	if (!email || !username || !password) {
		return res
			.status(422)
			.send({ err: 'You must provide a valid email, username and password!' });
	}
	// check if email already exists
	User.findOne({ email: email, username: username }, function(
		err,
		existingUser
	) {
		if (err) return next(err);

		// if email exists, return an error
		if (existingUser) {
			res
				.status(422)
				.send({ err: 'That email and/or username is currently in use!' });
			return next(err);
		}

		// if new user, create and save user record
		const user = new User({
			email: email,
			username: username,
			password: password
		});

		user.save(function(err) {
			if (err) {
				res
					.status(422)
					.send({ err: 'That email and/or username is currently in use!' });
				return next(err);
			} else res.json({ token: tokenForUser(user), user: user.username });
		});
	});
};
