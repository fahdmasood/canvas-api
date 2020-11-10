'use strict';
'use esversion:6';
const mongoose = require('mongoose');
const UserSchema = require('./user');

const User = mongoose.model('user', UserSchema);

mongoose.connect(
  `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@${process.env.HOSTNAME}/${process.env.DATABASE}?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useCreateIndex: true, poolSize: 20, family: 4 }
);

const database = mongoose.connection;

database.on('error', console.error.bind(console, 'connection error:'));
database.once('open', () => {
  console.info('database connection opened');
});

module.exports = {
  database,
  User,
};
