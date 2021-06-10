const {commentModel} = require("../dao")


const addComment = (info)=> {
    return commentModel.create(info);
}

const modifyComment = (origin,info)=>{
    commentModel.updateMany(origin,info,(e=>{
        e && console.log(e)
    }))
}

const deleteComment = (info)=>{
    commentModel.deleteMany(info,()=>{});
}

const findComment = (info = {})=>{
    return new Promise((res,rej)=>{
        commentModel.find(info,{},(e,info)=>{
            if(e){
                rej(e)
            }
            res(info)
        });
    })

}

module.exports = {
    addComment,
    modifyComment,
    deleteComment,
    findComment
}

