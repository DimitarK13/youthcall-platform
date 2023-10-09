const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  expirationDate: {
    type: String,
  },
  website: {
    type: String,
  },
});

module.exports = mongoose.model('Account', accountSchema);
