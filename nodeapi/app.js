const express = require('express');
const app = express();
const morgan = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const expressValidator = require('express-validator');
const bodyparser = require('body-parser');

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

// Using the  middleware
app.use(morgan('dev'));
app.use(bodyparser.json());
app.use(expressValidator());
app.use('/',postRoutes);
app.use('/',authRoutes);


const port = process.env.PORT || 8080;


app.listen(port,(req,res,next) =>{
 console.log(`listen on port ${port}`);
});