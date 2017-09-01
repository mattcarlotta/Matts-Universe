const express = require('express');
const app = express();
const mongoose = require('mongoose');

require('./libs/mongoSetup')(mongoose); // Set up Mongo Models and connect to the Mongo DB
require('./libs/expressMiddlewares')(app); // Hook up express middlewares (morgan/bodyParser)
require('./libs/expressRoutes')(app); // Hook up express routes
require('./libs/nodeServerSetup')(app); // Set up Node server for dev/prod
