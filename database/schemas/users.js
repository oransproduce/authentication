const mongoose = require('../index.js');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  salt: String,
});

const Users = mongoose.model('Users', userSchema);

module.exports = Users;
