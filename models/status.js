const mongoose = require('mongoose');

const statusSchema = new mongoose.Schema({
  text: String,
  price: String,
  date: Date,
  geo: String,
  userName: String,
  userId: String,
});

module.exports = mongoose.model('Status', statusSchema);
