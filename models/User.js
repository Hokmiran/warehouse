const mongoose = require('mongoose');
const tz = require('mongoose-timezone');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    max: 100,
  },
  email: {
    type: String,
    required: [true, "Please add a email"],
    unique: true,
    trim: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please enter a valid emaial",
    ],
    min: 6,
    max: 100,
  },
  password: {
    type: String,
    max: 1024,
    required: [true, "Please add a password"],
    minLength: [8, "Password must be up to 8 characters"],
  },
  role: {
    type: String,
    required: true,
    max: 30,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.plugin(tz);
module.exports = mongoose.model('User', userSchema);
