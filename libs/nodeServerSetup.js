const path = require('path');

module.exports = (app, express) => {
	//============================================================//
	/* PRODUCTION CONFIGS */
	//============================================================//
	if (process.env.NODE_ENV === 'production') {
		// Express will serve up production assets
		// like our main.js file, or main.css file
		app.use(express.static('client/build'));

		// Express will serve up the index.html file
		// if it doesn't recognize the route

		app.get('*', (req, res) => {
			res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
		});
	}

	//============================================================//
	/* CREATE NODE SERVER */
	//============================================================//
	const port = process.env.PORT || 5000;

	app.listen(port, () => {
		console.log('Server is now listening on port ' + port);
	});
};
