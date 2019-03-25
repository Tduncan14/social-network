const Post = require('../models/post');


exports.getPosts =(req,res,)=>{
  
    const posts = Post.find().select("_id title body")
    .then((posts) =>{
        res.json({posts:posts})
    })
    .catch( err =>console.log(err)
    )

};

// creating and saving the post
exports.createPost =(req,res) =>{
    const post = new Post(req.body);
   // console.log("Creating Post",req.body);
//    post.save((err,result)=>{

//        res.status(200).json({
//            post: result
//        })
//    })
 post.save()
 .then(result =>{
     res.status(200).json({
         post:result
     })
 })
}
