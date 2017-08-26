const _ = require('lodash');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
const jwtDecode = require('jwt-decode');

const User = require('../models/user');

exports.isLoggedIn = (req, res, done) => {
	let encodedId = req.headers.authorization;

	if (_.isNil(encodedId) || _.isEmpty(encodedId)) {
		return res.status(404).json({ err: 'Could not locate user.' });
	} else {
		const decodedId = jwtDecode(encodedId);
		User.findById(decodedId.sub, (err, user) => {
			if (err || !user) {
				return res
					.status(401)
					.json({ err: 'You do not permission to do that.' });
			}

			if (!user.god) {
				return res.status(401).json({
					err: 'There is only one god: Me. You do not permission to do that.'
				});
			}
			req.user = user._id;
			req.username = user.username;
			return done();
		});
	}
};
