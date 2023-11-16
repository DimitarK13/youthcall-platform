const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  type: {
    type: String,
  },
  name: {
    type: String,
  },
  image: {
    type: String,
  },
  where: {
    type: String,
  },
  when: {
    type: String,
  },
  who: {
    type: String,
  },
  link: {
    type: String,
  },
  deadline: {
    type: String,
  },
  description: {
    type: String,
  },
  username: {
    type: String,
  },
});

module.exports = mongoose.model('Post', postSchema);
