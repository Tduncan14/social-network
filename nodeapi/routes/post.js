
const {getPosts, createPost }= require('../controllers/post');
const {createPostValidator} = require('../validator');
const{userById} = require("../controllers/user");
const{requireSignin} = require('../controllers/auth');
const express = require('express');
const router = express.Router();


router.get("/",getPosts);
router.post("/post/new/:userId",requireSignin,createPost,createPostValidator);


router.param("userId",userById);

module.exports = router;
