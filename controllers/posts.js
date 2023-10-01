const { data, allPosts } = require('../testData');

const getPosts = (req, res) => {
  res.status(200).json({
    success: true,
    data: data,
  });
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

  res
    .status(200)
    .json({
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
