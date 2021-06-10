const {postModel} = require("../dao")


const addPost = (info)=> {
    return postModel.create(info);
}

const modifyPost = (origin,info)=>{
    postModel.updateMany(origin,info,(e=>{
        e && console.log(e)
    }))
}

const deletePost = (info)=>{
    postModel.deleteMany(info,()=>{});
}

const findPost = (info = {})=>{
    return new Promise((res,rej)=>{
        postModel.find(info,{},(e,info)=>{
            if(e){
                rej(e)
            }
            res(info)
        });
    })

}

module.exports = {
    addPost,
    modifyPost,
    deletePost,
    findPost
}

