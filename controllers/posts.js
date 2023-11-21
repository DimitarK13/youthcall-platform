const Post = require('../models/Post');
const multer = require('multer');

// Configure multer for handling multipart/form-data (file uploads)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('image');

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
    upload(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading
        console.error(err);
        return res.status(500).json({
          success: false,
          message: 'Error uploading image.',
        });
      } else if (err) {
        // An unknown error occurred when uploading
        console.error(err);
        return res.status(500).json({
          success: false,
          message: 'Something went wrong.',
        });
      }

      // Access uploaded image details from req.file
      const imageDetails = req.file;

      const newPostData = {
        type: req.body.type,
        name: req.body.name,
        image: {
          data: imageDetails.buffer, // assuming req.file.buffer contains the image buffer
          contentType: imageDetails.mimetype, // assuming req.file.mimetype contains the content type
        },
        where: req.body.where,
        when: req.body.when,
        who: req.body.who,
        link: req.body.link,
        deadline: req.body.deadline,
        description: req.body.description,
        username: req.body.username,
      };

      // Assuming 'Post' is your Mongoose model for posts with the provided schema
      const post = await Post.create(newPostData);

      res.status(201).json({
        success: true,
        data: `Успешно креиран нов пост (${post.name}).`,
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Server error.',
    });
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
