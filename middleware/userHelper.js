const { isNil, isEmpty } = require('lodash');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
const jwtDecode = require('jwt-decode');

const User = mongoose.model('users');

exports.isLoggedIn = async (req, res, done) => {
	try {
		let encodedId = req.headers.authorization;

		if (isNil(encodedId) || isEmpty(encodedId)) {
			throw err;
		}

		const decodedId = await jwtDecode(encodedId);
		const user = await User.findById(decodedId.sub);

		if (!user.god) {
			throw err;
			return done();
		}

		req.user = user._id;
		req.username = user.username;
		return done();
	} catch (err) {
		res.status(401).json({
			err: 'There is only one god: Me. You do not permission to do that.'
		});
	}
};
