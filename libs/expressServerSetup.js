const path = require('path');

module.exports = (app, express) => {
	//============================================================//
	/* PRODUCTION CONFIGS */
	//============================================================//
	if (process.env.NODE_ENV === 'production') {
		// Express will serve up production assets
		app.use(express.static('client/build'));

		// Express will serve up uploaded images
		app.use('/uploads', express.static('uploads'));

		// Express will serve up the front-end index.html file if it doesn't recognize the route
		app.get('*', (req, res) => {
			res.sendFile(path.resolve('client', 'build', 'index.html'));
		});
	}

	//============================================================//
	/* SHARE UPLOADED IMAGES */
	//============================================================//
	app.use('/uploads', express.static('uploads'));

	//============================================================//
	/* CREATE EXPRESS SERVER */
	//============================================================//
	const port = process.env.PORT || 5000;

	app.listen(port, () => {
		console.log('Server is now listening on port ' + port);
	});
};
