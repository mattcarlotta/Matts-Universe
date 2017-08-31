const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const seedDB = require('./seeds');
//============================================================//
/* REQUIRED ROUTES */
//============================================================//
const postRoutes = require('./routes/posts');
const projectRoutes = require('./routes/projects');
const authRoutes = require('./routes/authentication');

//============================================================//
//* SERVER & APP CONFIG */
//============================================================//
const port = process.env.PORT || 5000;
const db = require('./config/db');
const config = require('./config/vars');

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

//============================================================//
/* APP CONFIGS */
//============================================================//
app.use(morgan('tiny')); // logging framework
app.use(bodyParser.json({ type: '*/*' })); // parse req.body
app.set('json spaces', 2);
// seedDB();

//============================================================//
/* ROUTER PREFIX CONFIGS */
//============================================================//
app.use(authRoutes);
app.use(postRoutes);
app.use(projectRoutes);

//============================================================//
/* CREATE NODE SERVER */
//============================================================//
app.listen(port, () => {
	console.log('Server is now listening on port ' + port);
});
