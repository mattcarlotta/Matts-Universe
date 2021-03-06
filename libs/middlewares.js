const bcrypt = require('bcrypt');
const bluebird = require('bluebird');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const cors = require('cors');
const fs = require('fs');
const isEmpty = require('lodash/isEmpty');
const LocalStrategy = require('passport-local').Strategy;
const map = require('lodash/map');
const moment = require('moment');
const mongoose = require('mongoose');
const morgan = require('morgan');
const multer = require('multer');
const passport = require('passport');
const sharp = require('sharp');
const config = require('../env');

const env = process.env.NODE_ENV;
const currentENV = () => {
  const envirnoment = config[env];
  const keys = Object.keys(envirnoment);
  const values = Object.values(envirnoment);

  let variables = '';
  for (let i = 0; i < keys.length; i += 1) {
    variables += `\x1b[33m• ${keys[i].toUpperCase()}\x1b[0m: ${values[i]} \n `;
  }
  return variables;
};

// eslint-disable-next-line no-console
console.log(
  `\n[ \x1b[1m${env.toUpperCase()} ENVIRONMENT\x1b[0m ]\n ${currentENV()}`,
);

if (env !== 'development') {
  // eslint-disable-next-line no-console
  console.log(
    `\n\x1b[1mYour application is running on: ${config[env].portal}\x1b[0m`,
  );
}
//= ===========================================================//
/* APP MIDDLEWARE */
//= ===========================================================//
module.exports = (app) => {
  // / CONFIGS ///
  app.set('env', env); // sets current env mode (development, production or test)
  app.set('APIURL', config[env].APIURL); // sets localhost or remote host
  app.set('database', config[env].database); // sets database name
  app.set('port', config[env].port); // current listening port
  app.set('portal', config[env].portal); // sets current front-end url

  // / FRAMEWORKS ///
  app.set('bcrypt', bcrypt); // framework for hashing/salting passwords
  app.set('bluebird', bluebird); // promise library
  app.set('fs', fs); // file system library
  app.set('isEmpty', isEmpty); // lodash isEmpty function
  app.set('LocalStrategy', LocalStrategy); // passport framework for handling local authentication
  app.set('map', map); // lodash map function
  app.set('moment', moment); // framework for managing time
  app.set('mongoose', mongoose); // MongoDB
  app.set('passport', passport); // framework for authenticating users
  app.set('sharp', sharp); // image manipulation library
  app.use(
    cors({
      credentials: true,
      origin: config[env].portal,
    }),
  ); // allows receiving of cookies from front-end
  app.use(morgan('tiny')); // logging framework
  app.use(bodyParser.json()); // parses header requests (req.body)
  app.use(bodyParser.urlencoded({ extended: true })); // allows objects and arrays to be URL-encoded
  app.use(cookieParser()); // parses header cookies
  app.use(
    cookieSession({
      // sets up a cookie session as req.session ==> set in passport local login strategy
      name: 'Authorization',
      maxAge: 30 * 24 * 60 * 60 * 1000, // expire after 30 days, 30days/24hr/60m/60s/1000ms
      keys: [config[env].cookieKey], // unique cookie key to encrypt/decrypt
    }),
  );
  app.use(
    multer({
      limits: {
        fileSize: 10240000,
        files: 1,
      },
      fileFilter: (req, file, next) => {
        if (!/\.(jpe?g|png|gif|bmp)$/i.test(file.originalname)) {
          req.err = 'That file extension is not accepted!';
          next(null, false);
        }
        next(null, true);
      },
    }).single('file'),
  );
  app.use(passport.initialize()); // initialize passport routes to accept req/res/next
  app.set('json spaces', 2); // sets JSON spaces for clarity
};
