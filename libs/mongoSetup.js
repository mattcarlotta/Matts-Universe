const db = require('../config/db');
const config = require('../config/vars');

//============================================================//
//* MONGO DB CONFIG */
//============================================================//
module.exports = mongoose => {
	require('../models/user')(mongoose); // Mongo User Model
	require('../models/post')(mongoose); // Mongo Post Model
	require('../models/project')(mongoose); // Mongo Project Model
	// require('../models/comment')(mongoose); // Mongo Comment Model

	mongoose.connect(db.url, { useMongoClient: true }); // connect to our mongoDB database
	mongoose.Promise = require('bluebird'); // bluebird for mongoose promises

	mongoose.connection.on('connected', () => {
		console.log('Connected to ' + db.url);
	});

	mongoose.connection.on('disconnected', () => {
		console.log('Diconnected from ' + db.url);
	});

	mongoose.connection.on('error', () => {
		console.log('Connection Error');
	});

	process.on('SIGINT', () => {
		mongoose.connection.close(() => {
			console.log('Mongoose Diconnected =)');
			process.exit(0);
		});
	});
};
