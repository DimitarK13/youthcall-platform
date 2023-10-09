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
  try {
    const post = await Post.create(req.body);

    res.status(201).json({
      succes: true,
      data: `Post (${post.name}) successfully created`,
    });
  } catch (err) {
    console.error(err);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const { id: postID } = req.params;
    const post = await Post.findOneAndDelete({ _id: postID });

    if (!post)
      return res
        .status(404)
        .json({ success: false, msg: `no post with id ${postID}` });

    res.status(200).json({ success: true, data: `Deleted ${post.name}` });
  } catch (err) {
    console.error(err);
  }
};

module.exports = { getPosts, newPost, deletePost };
