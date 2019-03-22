exports.createPostValidator =( req,res,next) =>{

    // This is for the title
    req.check('title',"Write a title").notEmpty();
    req.check('title','Title must be between 4 to 150 characters').isLength({
        min:4, max:150
    });
    
    //body
    req.check("body","Write a body").notEmpty();
    req.check("body","body must be between 4 to 200 characters").isLength({
        min:4,
        max:200
    });
    // Check for errors
    const errors = req.validationErrors();
    // if error show the first one as they happen

    if(errors){
        const firstError =errors.map((error) => error.msg)[0];
        return res.status(400).json({error:firstError});

      
    }
    // procceed to next middleware
    next();
};