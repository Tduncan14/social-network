
exports.getPosts =(req,res,next)=>{

    res.json({
        posts:[
            {
                treek:"you are awesome"
            },
            {
                keepmovingforward:"Keep moving forward"
            }
        ]
    });
}
