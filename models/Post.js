const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    data: Buffer,
    contentType: String,
  },
  where: {
    type: String,
    required: true,
  },
  when: {
    type: String,
    required: true,
  },
  who: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  deadline: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  website: {
    type: String,
    required: true,
  },
  accountName: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Post', postSchema);
