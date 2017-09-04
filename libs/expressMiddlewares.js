const morgan = require('morgan');
const bodyParser = require('body-parser');

//============================================================//
/* APP MIDDLEWARE */
//============================================================//
module.exports = app => {
	app.use(morgan('tiny')); // logging framework
	app.use(bodyParser.json()); // parse req.bodyParser
	app.use(bodyParser.urlencoded({ extended: true }));
	app.set('json spaces', 2);
};
