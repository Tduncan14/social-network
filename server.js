var express =require('express');
var path = require('path');
var bodyParser =require('body-parser');
var expressSession =require('express-session');
var cookieParser = require('cookie-parser');
var Pusher = require('pusher');

var pusher = new Pusher({
    appId:'',
    key:'',
    secret:'',
    encrypted:true
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

module.exports = app;

var PORT = process.env.PORT || 5000


app.listen(PORT,function(){
    console.log(`listen on ${PORT}`)
})