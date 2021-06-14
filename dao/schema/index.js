const db = require("../index")
var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
    author_id : { type:String },
    content: { type:String },
    type : { type:String},
    read : { type:String},
    img_src: { type:[String]},
    date:{ type:String},
    status:{type:Number, default:0}
});

var userSchema = new mongoose.Schema({
    nick_name : { type:String },
    sex  : { type:Number, default:0 },
    position: { type:String },
    avatar: { type:String },
    type: {type: Number, default:0},
    account: { type:String },
    password: { type:String },
    signature_id :{ type:String},
    freeze: { type:Boolean },
});

var commentSchema = new mongoose.Schema({
    post_id : { type:String },
    commenter_id: { type:String},
    date: { type:String},
    content:{ type:String},
    status:{type:Number, default:0}
});

var collectionSchema = new mongoose.Schema({
    post_id : { type:String},
    user_id: { type:String},
});

module.exports = {
    postSchema,
    userSchema,
    commentSchema,
    collectionSchema
}