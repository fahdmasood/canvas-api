const { Schema } = require('mongoose');

const UserSchema = new Schema({
  username: {
    unique: true,
    sparse: true,
    type: String,
    maxlength: 32,
    required: true,
  },
  password: {
    type: String,
    required: true,
    sparse: true,
  },
  email: {
    type: String,
    unique: true,
    sparse: true,
    required: true,
    maxlength: 256,
  },
  created: {
    type: Date,
    sparse: true,
    required: true,
  },
  updated: {
    type: Date,
    sparse: true,
    required: true,
  },
  lastActive: {
    type: Date,
    sparse: true,
    required: true,
  },
});

module.exports = UserSchema;
