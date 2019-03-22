const Post = require('../models/post');


exports.getPosts =(req,res,)=>{

    res.json({
        posts:[{ treek:"you are awesome" }, { keepmovingforward:"Keep moving forward"
            }
        ]
    });
};

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
