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
  website: {
    type: String,
  },
});

module.exports = mongoose.model('Account', accountSchema);
