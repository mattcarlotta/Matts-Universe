const mongoose = require('mongoose');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

const User = mongoose.model('users');
const config = require('../config/vars');

// Create local Strategy
const localOptions = { usernameField: 'username' };

// Setup localLogin Strategy
const localLogin = new LocalStrategy(
	localOptions,
	async (username, password, done) => {
		try {
			// Verify email and password, call done with user
			// if it is the correct email and password
			// otherwise, call done with false
			const user = await User.findOne({ username: username });

			//compare passwords - is supplied password === user.password?
			user.comparePassword(password, (err, isMatch) => {
				if (err || !isMatch) return done(null, false);

				return done(null, user);
			});
		} catch (err) {
			return done(null, false);
		}
	}
);

// Setup options for jwt Strategy
const jwtOptions = {
	// tell Strategy where to look (from header authorization)
	jwtFromRequest: ExtractJwt.fromHeader('authorization'),
	secretOrKey: config.secret
};

// Create JWT Strategy || payload = jwt token (sub: user.id and iat: timestamp )
const jwtLogin = new JwtStrategy(jwtOptions, async (payload, done) => {
	try {
		// See if the user ID in payload exists
		// If it does, call 'done' with user => authenticated
		// otherwise, call done without a user object => not authenticated
		const user = await User.findById(payload.sub);

		// tell passport found user
		return done(null, user);
	} catch (err) {
		return done(err, false);
	}
});

// Tell passport to use this Strategy
passport.use(jwtLogin);
passport.use(localLogin);
