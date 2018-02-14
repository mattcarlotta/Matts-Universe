const { isNil, isEmpty } = require('lodash');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
const jwtDecode = require('jwt-decode');

const User = mongoose.model('users');

exports.isLoggedIn = async (req, res, done) => {
		let encodedId = req.headers.authorization;

		if (isNil(encodedId) || isEmpty(encodedId)) {
			req.errorMessage = 'You do not have permission to do that.';
			return done();
		}

		const decodedId = await jwtDecode(encodedId);
		const user = await User.findById(decodedId.sub);

		if (!user.god) {
			req.errorMessage = 'There is only one god: Me. You do not permission to do that.';
			return done();
		}

		req.user = user._id;
		req.username = user.username;
		return done();
};
