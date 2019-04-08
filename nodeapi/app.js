const express = require('express');
const app = express();
const morgan = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const expressValidator = require('express-validator');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fs = require('fs');

dotenv.config()

mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true })
.then(() =>{
    console.log(" db successful connection")
})

mongoose.connection.on('error', err =>{
console.log(`DB connection error:${err.message}`)
});
//bring in routes
const postRoutes = require('./routes/post');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

//apiDocs
app.get("/",(req,res) =>{
  fs.readFile('docs/apiDocs.json', (err,data) =>{
      if(err){
          res.status(400).json({
              err:err
          })
      }
       const docs = JSON.parse(data)
       res.json(docs)
  });
})

// Using the  middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use('/',postRoutes);
app.use('/',authRoutes);
app.use('/', userRoutes);

app.use(function(err,req,res,next){
    if(err.name === 'UnauthorizedError'){
        res.status(401).json({
            error:"Unauthorized!"
        })
    }
})


const port = process.env.PORT || 8080;


app.listen(port,(req,res,next) =>{
 console.log(`listen on port ${port}`);
});