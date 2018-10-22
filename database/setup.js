//= ===========================================================//
//* MONGO DB CONFIG */
//= ===========================================================//
module.exports = (app) => {
  const bluebird = app.get('bluebird');
  const mongoose = app.get('mongoose');
  const db = app.get('database');

  mongoose.connect(
    db,
    { useCreateIndex: true, useNewUrlParser: true, useFindAndModify: false },
  ); // connect to our mongoDB database

  mongoose.Promise = bluebird; // bluebird for mongoose promises

  // eslint-disable-next-line no-console
  mongoose.connection.on('connected', () => console.log(`\u001b[32mConnected to ${db}\u001b[0m\n`));

  // eslint-disable-next-line no-console
  mongoose.connection.on('disconnected', () => console.log(`\n\u001b[36mDisconnected from ${db}\u001b[0m`));

  // eslint-disable-next-line no-console
  mongoose.connection.on('error', () => console.log(`\u001b[31mConnection error to ${db}\u001b[0m\n`));

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      // eslint-disable-next-line no-console
      console.log(
        `\u001b[35mConnection was manually terminated from ${db}\u001b[0m`,
      );
      process.exit(0);
    });
  });
};
