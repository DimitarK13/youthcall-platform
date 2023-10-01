const express = require('express');
const router = express.Router();
const { getPosts, newPost, deletePost } = require('../controllers/posts');

router.get('/', getPosts);
router.post('/', newPost);
router.delete('/:id', deletePost);

module.exports = router;
