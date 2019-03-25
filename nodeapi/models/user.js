const mongoose = require('mongoose');
const uuidv1 = require('uuid/v1');
const crypto = require('crypto');


const userSchema = new mongoose.Schema({

    name:{
        type:String,
        trim:true,
        required:true
    },
    email:{
        type:String,
        trim:true,
        required:true
    },
    hashed_password:{
      type:String,
      required:true
    },
    salt:String,
    created:{
        type:Date,
        default:Date.now
    },
    updated:Date
});

/*
 Virtual fields are additonals fields for a given model
 Their values can be set manually or automatically with defined functionality.
 Keep in mind: virtual properties (password) dont get persisted in the database.
 They only exist logically and are not written to the document's collection


 // Virtual Field
*/
userSchema.virtual('password')
.set(function(password){
    //create temporary variable called _password
    this._password = password
    //generates a timestamp
    this.salt = uuidv1()
    // encrypt the password
    this.hashed_password = this.encryptedPassword(password)
})
.get(function(){
    return this._password
})

// methods
userSchema.methods = {
    encryptedPassword:function(password){
        if(!password) return"";
        try{
         return crypto.createHmac('sha1',this.salt)
         .update(password)
         .digest('hex');
        }
        catch(err){
           return " "
        }
    }
}

module.exports = mongoose.model("User",userSchema)