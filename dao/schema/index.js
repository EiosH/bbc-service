const db = require("../index")
var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
    author_id : { type:Number },
    content: { type:String },
    type : { type:String},
    read : { type:String},
    img_src: { type:[String]},
    date:{ type:String},
});

var userSchema = new mongoose.Schema({
    nick_name : { type:String },
    sex  : { type:Number, default:0 },
    position: { type:String },
});

var commentSchema = new mongoose.Schema({
    postId : { type:Number },
    commenter_id: { type:String},
    date: { type:String},
    content:{ type:String},
});

var collectionSchema = new mongoose.Schema({
    post_id : { type:Number },
    user_id: { type:String},
});

module.exports = {
    postSchema,
    userSchema,
    commentSchema,
    collectionSchema
}