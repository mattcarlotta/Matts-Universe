const express = require('express');

const app = express();
const consign = require('consign');

consign({ locale: 'en-us', verbose: false })
  .include('libs/middlewares.js')
  .then('shared')
  .then('models')
  .then('database')
  .then('services')
  .then('controllers')
  .then('routes')
  .then('libs/server.js')
  .into(app);
