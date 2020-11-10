'use strict';
'use esversion:6';
const mongoose = require('mongoose');

mongoose.connect(
  `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@${process.env.HOSTNAME}/${process.env.DATABASE}?retryWrites=true&w=majority`,
  { useNewUrlParser: true }
);

const database = mongoose.connection;

database.on('error', console.error.bind(console, 'connection error:'));
database.once('open', () => {
  console.info('database connection opened');
});

module.exports = {
  mongoose,
  database,
};
