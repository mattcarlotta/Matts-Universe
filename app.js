const express = require('express');
const app = express();
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
//============================================================//
/* REQUIRED ROUTES */
//============================================================//
// const Comment       = require("./models/comment");
const seedDB = require('./seeds');
// User          = require("./models/user");

// const commentRoutes    = require("./routes/comments");
const postRoutes = require('./routes/posts');
const projectRoutes = require('./routes/projects');
const authRoutes = require('./routes/authentication');

//============================================================//
//* SERVER & APP CONFIG */
//============================================================//
const port = process.env.PORT || 5000;
const db = require('./config/db');
const config = require('./config/vars');

// connect to our mongoDB database
// (uncomment after you enter in your own credentials in config/db.js)
mongoose.connect(db.url, { useMongoClient: true });
// Use bluebird for mongoose promises
mongoose.Promise = require('bluebird');
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
app.use(cors()); // middleware to handle domain and port connections
app.use(bodyParser.json({ type: '*/*' }));

app.set('json spaces', 2);
// seedDB();

//============================================================//
/* ROUTER PREFIX CONFIGS */
//============================================================//
app.use(authRoutes);
// appends all routes with "/campgrounds" in front of them
app.use(postRoutes);
app.use(projectRoutes);
// app.use("/campgrounds/:id/comment", commentRoutes);

// start app ===============================================
// http.createServer(app);
app.listen(port, () => {
	console.log('Server is now listening on port ' + port);
});
