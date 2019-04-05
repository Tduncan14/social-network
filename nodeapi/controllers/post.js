const Post = require('../models/post');
const formidable =require('formidable');
const fs = require('fs')
exports.getPosts =(req,res,)=>{
  
    const posts = Post.find().select("_id title body")
    .then((posts) =>{
        res.json({posts:posts})
    })
    .catch( err =>console.log(err)
    )

};

// creating and saving the post
exports.createPost =(req,res,next) =>{
   let form = new formidable.IncomingForm()
   form.keepExtensions = true
   form.parse(req,(err,fields,files) =>{
     if(err){
         res.status(400).json({error:"Image could not be uploaded"})
     }
      post = new Post(fields)
      post.postedBy = req.profile
      if(files.photo){
          post.photo.data = fs.readFileSync(files.photo.path);
          post.photo.contentType =files.photo.type
      }
      post.save((err,result) =>{
          if(err){
              res.status(400).json({error:err})
          }
          res.json(result)
    })

   })

//     const post = new Post(req.body);
//    // console.log("Creating Post",req.body);
// //    post.save((err,result)=>{

// //        res.status(200).json({
// //            post: result
// //        })
// //    })
//  post.save()
//  .then(result =>{
//      res.status(200).json({
//          post:result
//      })
//  })
 }
