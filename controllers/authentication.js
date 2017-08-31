const jwt = require('jwt-simple');
const moment = require('moment');

const User = require('../models/user');
const config = require('../config/vars');

const tokenForUser = user => {
	const timestamp = new Date().getTime();
	return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
};

exports.signedin = async (req, res, next) => {
	try {
		const userId = req.user; // pulled from userHelper isLoggedIn middleware

		const existingUser = await User.findById(userId);

		res
			.status(200)
			.json({ user: existingUser.username, isGod: existingUser.god });
	} catch (e) {
		res.status(401).json({
			err:
				'There was a problem with your login credentials. Please sign in again!'
		});
		return next(err, false);
	}
};

exports.signin = async (req, res, next) => {
	try {
		const userId = req.user._id; // pulled from userHelper isLoggedIn middleware
		const existingUser = await User.findById(userId);

		res.status(200).json({
			token: tokenForUser(req.user),
			user: existingUser.username,
			isGod: existingUser.god
		});
	} catch (e) {
		res.status(401).json({
			err:
				'There was a problem with your login credentials. Please sign in again!'
		});
		return next(err);
	}
};

exports.signup = async (req, res) => {
	try {
		const email = req.body.email;
		const password = req.body.password;
		const username = req.body.username;

		if (!email || !username || !password) {
			const err = 'You must provide a valid email, username and password!';
			throw err;
		} else {
			// check if email exists
			const existingUser = await User.findOne({
				email: email,
				username: username
			});
			// throw error if any matches
			if (existingUser) {
				throw err;
			} else {
				// if new user, create and save user record
				const user = new User({
					email: email,
					username: username,
					password: password
				});
				// save user
				await user.save();

				// send back a token and user
				res.json({ token: tokenForUser(user), user: user.username });
			}
		}
	} catch (err) {
		if (err.name) err = 'That email and/or username is currently in use!';
		res.status(400).send({ err });
	}
};
