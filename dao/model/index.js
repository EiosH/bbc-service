const mongoose = require('mongoose');

const {
    postSchema,
    userSchema,
    commentSchema,
    collectionSchema
} = require("../schema");

let DB_URL = 'mongodb://localhost:27017/mongoose';

mongoose.connect(DB_URL); /** * 连接成功 */

mongoose.connection.on('connected', function () {
    console.log('Mongoose connection open to ' + DB_URL); });

/** * 连接异常 */
mongoose.connection.on('error',function (err) {
    console.error('Mongoose connection error: ' + err);
});
/** * 连接断开 */

mongoose.connection.on('disconnected', function () {
    console.error('Mongoose connection disconnected');
});


const postModel = mongoose.model('post', postSchema);
const userModel = mongoose.model('user', userSchema);
const commentModel = mongoose.model('comment', commentSchema);
const collectionModel = mongoose.model('collection', collectionSchema);

module.exports = {
    postModel,
    userModel,
    commentModel,
    collectionModel
}