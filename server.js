

var express= require('express');
var path = require('path');
var bodyParser =require('body-parser');
var expressSession =require('express-session');
var cookieParser = require('cookie-parser');
var Pusher = require('pusher');

var pusher = new Pusher({
    appId: '716002',
  key: 'a59fa61dc60112bac0a9',
  secret: 'cf0d8acf51091973f205',
  cluster: 'us2',
  encrypted: true
});



var app = express();


// cookie parser
app.use(cookieParser());


app.use(expressSession({
    secret:'<some-secret-token-here>',
    resave:true,
    saveUninitialized:true

}));

// turns the  data or information and attach it to bodyParser and turns into a json through bodyparser

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// learns this line
app.use(express.static(path.join(__dirname,'public')));


// error handle for 404 pages
app.use(function(req,res,next){
    var error = new Error('Route Not Found');
    error.status = 404;
    next(error);
});



// creating a post to get the information from the req.body user and store it on the register route
app.post('/register',function(req,res){
    console.log(req.body);
    if(req.body.username && req.body.username)
    {
        var newMember ={
            username:req.body.username,
            status: req.body.status
        }
     req.session.user = newMember;
     res.json({
         success:true,
         error:false
     });
    }
     else{
         res.json({
             success:false,
             error:true,
             message:'Incomplete information: username and status required'
         });
     }
});

// authorizing the api on the server side/ enables and client subscribing to Pusher private and presence channels


app.post('/usersystem/auth',function(req,res){
    var socketId = req.body.socket_id;
    var channel = req.body.channel_name;
    var currentMember = req.session.user;
    var presenceData ={
        user_id:currentMember.username,
        user_info:{
            status:currentMember.status,
        }
    };
    var auth = pusher.authenticate(socketId,channel,presenceData);
    res.send(auth);
});

// creating and api route to see if the user is logged in.

app.get('/isLoggedIn', function(req,res){
    if(req.session.user){
        res.send({
            authenticate:true
        });}
    else{
       res.send({authenticated:false});
    }
});


// to logout of the session api

app.get('/logout',function(req,res){
    if(req.session.user){
        req.session.user = null;
    }
    res.redirect('/');
});





module.exports = app;

var PORT = process.env.PORT || 5000


app.listen(PORT,function(){
    console.log(`listen on ${PORT}`)
})