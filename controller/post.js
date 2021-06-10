const {postServices} = require("../service")
const { uploadImg } = require("../service/file")
const {getPageData } = require("../utils")



const addPost = async (info)=>{
    const {author_id,content,type,img} = info;

    let img_src;

    if(img && img.length) {
        img_src = await Promise.all(img.map(v=>{
            return uploadImg(v)
        }))
    }

    if(author_id && content && type){
        await postServices.addPost({
            author_id,
            content,
            type,
            img_src,
            date: Date.now(),
        });
    }
    else {
        throw new Error("发布失败!")
    }
}

const modifyPost = (info)=>{
    const {id,newContent} = info;

    if (newContent){
        postServices.modifyPost({_id:id},{
            content:newContent,
            date: Date.now(),
        })
    }else {
        throw new Error("修改失败")
    }
}

const deletePost =async (info)=>{
    const {idList} = info
    if(idList && idList.length){
        for (let i of idList){
           await postServices.deletePost({_id:i});
        }
    }else {
        throw new Error("删除失败!")
    }
}

const findPostList = async (info)=>{
    const {page,pageList} = info;
    const data = await postServices.findPost();
    if(page && pageList){
        return getPageData(data,page,pageList)
    }else {
        return data
    }
}


const watchPost = async (info)=>{
    const {id} = info
    const postList = await postServices.findPost({
        _id:id
    });

    const post = postList[0]
    const read = Number(post.read) || 0

    if(id){
        postServices.modifyPost({_id: id},{
            read: read + 1
        })
    }
}

module.exports = {
    addPost,
    modifyPost,
    findPostList,
    deletePost,
    watchPost
}