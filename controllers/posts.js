const { allPosts } = require('../testData');
const Post = require('../models/Post');

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

const newPost = async (req, res) => {
  const post = await Post.create(req.body);

  res.status(201).json({
    succes: true,
    data: `Post (${post.name}) successfully created`,
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
