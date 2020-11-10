const { mongoose, database } = require('./connection');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
});
