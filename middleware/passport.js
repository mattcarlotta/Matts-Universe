const mongoose = require('mongoose');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

const User = mongoose.model('users');
const config = require('../config/vars');

// Tell passport to use this Strategy
// passport.use(
// 	new JwtStrategy({
// 		jwtFromRequest: ExtractJwt.fromHeader('authorization'),
// 		secretOrKey: config.secret,
// 		},
// 		async (payload, done) => {
// 			console.log(payload, 'payload');
// 			// const user = await User.findById(payload.sub);
// 			//
// 			// if(!user) return done(null, false, 'NO TOKEN FUCKER!');
// 			//
// 			// return done(null, user);
// 		}
// 	)
// );

// Create JWT Strategy || payload = jwt token (sub: user.id and iat: timestamp )
passport.use(new JwtStrategy({
	// tell Strategy where to look (from header authorization)
	jwtFromRequest: ExtractJwt.fromHeader('authorization'),
	secretOrKey: config.secret
	}, async (payload, done) => {

			const user = await User.findById(payload.sub);

			if (!user) return done(err, false);

			// tell passport found user
			return done(null, user);
	})
)


passport.use(new LocalStrategy({
			usernameField: 'username',
		},
		async (username, password, done) => {
			const user = await User.findOne({ username: username });

			if (!user) return done(null, false);

			//compare passwords - is supplied password === user.password?
			user.comparePassword(password, (err, isMatch) => {
				if (err || !isMatch) {
					console.log('triggered');
					return done(null, false, 'What the fuck!');
				}

				return done(null, user);
			});
		}
	)
);
