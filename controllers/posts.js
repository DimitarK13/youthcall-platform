const Post = require('../models/Post');

const getPosts = async (req, res) => {
  try {
    const { type, username } = req.query;

    if (!type && !username) {
      const allPosts = await Post.find({});
      return res.status(200).json({
        success: true,
        data: allPosts,
      });
    }

    let filteredPosts = [];

    if (username) {
      const allPosts = await Post.find({});
      filteredPosts = allPosts.filter((data) => {
        return data.username === username;
      });

      if (filteredPosts.length === 0) {
        return res.status(404).json({
          success: false,
          data: `No posts found for username ${username}`,
        });
      }
    }

    if (type) {
      const postsByType = await Post.find({ type });
      filteredPosts = filteredPosts.length
        ? filteredPosts.filter((post) =>
            postsByType.some((p) => p._id.toString() === post._id.toString())
          )
        : postsByType;

      if (filteredPosts.length === 0) {
        return res.status(404).json({
          success: false,
          data: {
            message: `Во моментот нема активни проекти од овој вид. Ве молиме обидете се со друг вид на проекти.`,
            header: type,
          },
        });
      }
    }

    return res.status(200).json({
      success: true,
      data: {
        filteredPosts,
        header: type,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      data: 'Server Error',
    });
  }
};

const newPost = async (req, res) => {
  try {
    const post = await Post.create(req.body);

    res.status(201).json({
      succes: true,
      data: `Успешно креиран нов пост (${post.name}).`,
    });
  } catch (err) {
    console.error(err);
  }
};

const deletePost = async (req, res) => {
  try {
    const { id: postID } = req.params;
    const post = await Post.findOneAndDelete({ _id: postID });

    if (!post)
      return res
        .status(404)
        .json({ success: false, msg: `no post with id ${postID}` });

    res.status(200).json({
      success: true,
      data: `Пост ${post.name} беше успешно избришан.`,
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports = { getPosts, newPost, deletePost };
