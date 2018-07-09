const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: {type: String, unique: true, required: true, dropDups: true},
  password: {type: String, required: true},
  displayName: {type: String, unique: true, required: true, dropDups: true}
});

const User = mongoose.model('User', userSchema);

module.exports = User;
