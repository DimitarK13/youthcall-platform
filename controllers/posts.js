const { data } = require('../testData');

const getPosts = (req, res, next) => {
  res.status(200).json({
    success: true,
    data: data,
  });

  next();
};

module.exports = getPosts;
