const mongoose = require('mongoose');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

const User = mongoose.model('users');
const config = require('../config/vars');

passport.use(new JwtStrategy({
		jwtFromRequest: ExtractJwt.fromHeader('authorization'),
		secretOrKey: config.secret
	}, async (payload, done) => {

		if (!payload || !payload.sub) return done(null, false, 'Unable to automatically sign in, please try logging in again.');

		const user = await User.findById(payload.sub);

		if (!user) return done(null, false, 'Unable to authenticate previous session, please try logging in again.');

		return done(null, user);
	})
)


passport.use(new LocalStrategy({
			usernameField: 'username',
		},
		async (username, password, done) => {
			const user = await User.findOne({ username: username });

			if (!user) return done(null, false, 'There was a problem with your login credentials. That username does not exist in our records.');

			user.comparePassword(password, (err, isMatch) => {
				if (err || !isMatch) return done(null, false, 'That username and/or password does not match!');

				return done(null, user);
			});
		}
	)
);
