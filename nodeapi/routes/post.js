
const {getPosts, createPost }= require('../controllers/post');
const {createPostValidator} = require('../validator');
const{userById} = require("../controllers/user");
const{requireSignin} = require('../controllers/auth');
const express = require('express');
const router = express.Router();


router.get("/",getPosts);
router.post("/post",requireSignin,createPostValidator,createPost);



module.exports = router;
