const { allPosts } = require('../testData');
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
    type: String,
    required: true,
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
});

const Post = mongoose.model('Post', postSchema);

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({});
    res.status(200).json({
      success: true,
      data: posts,
    });
  } catch (err) {
    console.error(err);
  }
};

const newPost = (req, res) => {
  const {
    id,
    type,
    name,
    image,
    where,
    when,
    who,
    link,
    deadline,
    description,
  } = req.body;

  const newPost = {
    id,
    type,
    name,
    image,
    where,
    when,
    who,
    link,
    deadline,
    description,
  };

  console.log(newPost);

  res.status(200).json({
    succes: true,
    data: `Post (${name}, id: ${id}) successfully created`,
  });
};

const deletePost = (req, res) => {
  const post = allPosts.find((post) => post.id === Number(req.params.id));

  if (!post) {
    return res
      .status(404)
      .json({ success: false, msg: `no post with id ${req.params.id}` });
  }

  const newPosts = allPosts.filter((post) => post.id !== Number(req.params.id));

  return res.status(200).json({ success: true, data: newPosts });
};

module.exports = { getPosts, newPost, deletePost };
