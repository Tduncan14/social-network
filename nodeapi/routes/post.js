
const {getPosts, createPost }= require('../controllers/post');
const {createPostValidator} = require('../validator');
const express = require('express');
const router = express.Router();


router.get('/',getPosts);
router.post("/post",createPostValidator,createPost);



module.exports = router;
