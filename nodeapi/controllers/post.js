const Post = require('../models/post');
const formidable =require('formidable');
const _ = require('lodash');

const fs = require('fs')



exports.postById = (req,res,next,id) =>{
    Post.findById(id)
    .populate("postedBy","_id name")
    .exec((err,post) =>{
        if(err || !post){
            res.status(400).json({
                err:err
            })
        }
        req.post = post
        next();
    })
}






exports.getPosts =(req,res,)=>{
  
    const posts = Post.find()
    // gets the users name for the post
     .populate("postedBy","_id name")
    .select(" _id title body")
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

      console.log("req.profile:", req.profile)
      req.profile.hashed_password = undefined;
      req.profile.salt = undefined;

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
 };

 exports.postByUser = (req,res) =>{
     Post.find({postedBy:req.profile._id})
         .populate("postedBy","_id name")
         .sort("_created")
         .exec((err,posts) =>{
             if(err){
                 return res.status(400).json({
                     error:err
                 })
              
             }
             res.json(posts);
         })
 }


 // if poster the correct poster allow to delete or not
 exports.isPoster =(req,res,next) =>{
     let isPoster = req.post && req.auth && req.post.postedBy._id == req.auth._id;

     if(!isPoster){
         return res.status(403).json({err:"user is not authorized"})
     }

     next();
 }

// update the user post

exports.updatePost = (req,res,next) =>{
    let post = req.post
    post = _.extend(post,req.body)
    post.updated = Date.now()
    post.save((err) =>{
        if(err){
            return res.status(400).json({
                error:err
            })
        }
        res.json(post)
    })
   
}



// delete the post
exports.deletePost = (req,res) =>{
    let post = req.post;

    console.log("req post", req.post);
    console.log("req auth", req.auth);
    console.log("req.post.postedBy._id", req.post.postedBy._id);
    console.log("req.auth._id", req.auth._id);

    post.remove((err,post)=>{ 
       if(err || !post){
           res.status(400).json({
               err:err,
           })
       }
       res.json({msg:"post deleted"})
    });
}


