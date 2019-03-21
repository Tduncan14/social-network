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
    console.log("Creating Post",post);
}
