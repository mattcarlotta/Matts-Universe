const mongoose = require('mongoose');
const jwt = require('jwt-simple');
const moment = require('moment');
const config = require('../config/vars');
const User = mongoose.model('users');

const tokenForUser = user => ( jwt.encode({ sub: user, iat: new Date().getTime() }, config.secret) )

exports.signedin = async (userId, res, done) => {
	const existingUser = await User.findById(userId);

	if (!userId || !existingUser) {
		res.status(401).json({ err: 'There was a problem with your login credentials. Please sign in again!'});
		return done();
	}

	res.status(200).json({ user: existingUser.username, isGod: existingUser.god });
};

exports.signin = async (userId, res, done) => {
	const existingUser = await User.findById(userId);

	if (!existingUser) {
		res.status(401).json({ err: 'There was a problem with your login credentials. Please sign in again!'});
		return done();
	}

	res.status(200).json({
		token: tokenForUser(userId),
		user: existingUser.username,
		isGod: existingUser.god
	});
};

exports.signup = async (req, res, done) => {
	const email = req.body.email;
	const password = req.body.password;
	const username = req.body.username;

	if (!email || !username || !password) {
		res.status(400).send({ err: 'Missing credentials' });
		return done();
	}

	// check if email exists
	const existingUser = await User.find({$or:[{email: email},{username: username}]})
		// throw error if any matches
	if (existingUser) {
		res.status(400).send({ err: 'That email and/or username is currently in use!' });
		return done();
	}

	// if new user, create and save user record
	const user = new User({ email: email, username: username, password: password });
	// save user
	await user.save();
	// send back a token and user
	res.json({ token: tokenForUser(user), user: user.username });
}
