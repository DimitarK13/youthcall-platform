const express = require('express');
const router = express.Router();
const { getPosts, newPost } = require('../controllers/posts');

router.get('/', getPosts);
router.post('/', newPost);

module.exports = router;
