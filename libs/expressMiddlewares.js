const morgan = require('morgan');
const bodyParser = require('body-parser');
//============================================================//
/* APP MIDDLEWARE */
//============================================================//
module.exports = app => {
	app.use(morgan('tiny')); // logging framework
	app.use(bodyParser.json({ type: '*/*' })); // parse req.body
	app.set('json spaces', 2);
};
