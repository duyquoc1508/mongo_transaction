const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  accountId: String, name: String, balance: Number
});

module.exports = mongoose.model('User', userSchema);
