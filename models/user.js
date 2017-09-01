const bcrypt = require('bcrypt-nodejs');

module.exports = mongoose => {
	// Define model
	const userSchema = new mongoose.Schema({
		god: { type: Boolean, default: false },
		email: { type: String, unique: true, lowercase: true },
		username: { type: String, unique: true, lowercase: true },
		password: String
	});

	// On save hook, encrypt password
	// before saving a model (pre-save), run func
	userSchema.pre('save', function(next) {
		// get access to instance of user model
		const user = this; // user.email or user.password

		// generate a salt(randomly generated string of characters) then run callback
		bcrypt.genSalt(10, (err, salt) => {
			if (err) {
				return next(err);
			}

			// hash(encrypt) our password using the salt
			bcrypt.hash(user.password, salt, null, (err, hash) => {
				if (err) {
					return next(err);
				}

				// overwrite plain text password with encrypted password
				user.password = hash;
				next();
			});
		});
	});

	// Give access to method props
	userSchema.methods.comparePassword = function(candidatePassword, callback) {
		bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
			if (err) {
				return callback(err);
			}

			callback(null, isMatch);
		});
	};

	// Create model class
	mongoose.model('users', userSchema);
};
