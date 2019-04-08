
const {postById,getPosts, createPost,postByUser, isPoster,deletePost,updatePost }= require('../controllers/post');
const {createPostValidator} = require('../validator');
const{userById} = require("../controllers/user");
const{requireSignin} = require('../controllers/auth');
const express = require('express');
const router = express.Router();


router.get("/",getPosts);
router.get("/posts/by/:userId",postByUser);
router.post("/post/new/:userId",requireSignin,createPost,createPostValidator);

router.put('/post/:postId',requireSignin,updatePost);

router.delete('/post/:postId',requireSignin,isPoster,deletePost)
// any route containing :userId, our app will first execute userById()
router.param("userId",userById);
// any route containing :postId, our app will first execute postsById()
router.param("postId",postById)

module.exports = router;
