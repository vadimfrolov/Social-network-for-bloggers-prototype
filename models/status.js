const mongoose = require('mongoose');

const statusSchema = new mongoose.Schema({
  date: Date,
  text: String,
  price: String,
  geo: String,
  userName: String,
  userId: String,
});

module.exports = mongoose.model('Status', statusSchema);
