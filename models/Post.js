const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  type: {
    type: String,
  },
  name: {
    type: String,
  },
  image: {
    data: Buffer,
    contentType: String,
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
  website: {
    type: String,
  },
  accountName: {
    type: String,
  },
});

module.exports = mongoose.model('Post', postSchema);
