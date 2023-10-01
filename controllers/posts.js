const { data } = require('../testData');

const getPosts = (req, res, next) => {
  res.status(200).json({
    success: true,
    data: data,
  });

  next();
};

const newPost = (req, res, next) => {
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

  res.status(200).send(`Post (${name}, id: ${id}) successfully created`);

  next();
};

module.exports = { getPosts, newPost };
