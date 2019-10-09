const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  social: [],
  phone: String,
  friendList: [],
  avatar: String,
  regDate: String,
  bithDate: String,
});

module.exports = mongoose.model('User', userSchema);
