const morgan = require('morgan');
const bodyParser = require('body-parser');

//============================================================//
/* APP MIDDLEWARE */
//============================================================//
module.exports = app => {
	app.use(morgan('tiny')); // logging framework
	app.use(bodyParser.json({ limit: '10mb' })); // parse req.bodyParser
	app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
	app.set('json spaces', 2);
};
