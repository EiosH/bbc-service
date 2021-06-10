const {commentServices} = require("../service")
const {getPageData,getIfIllegal } = require("../utils")

const addComment= (info)=>{
    const {
        post_id ,
        commenter_id,
        content,
    } = info;

    if (post_id && commenter_id && content){
        commentServices.addComment({
            post_id,
            commenter_id,
            date: Date.now(),
            content,
            status: Number(getIfIllegal(content))
        })
    }else {
        throw new Error("评论失败!")
    }
}

const deleteComment= (info)=>{
    if(info._id){
        commentServices.deleteComment(info);
    }else {
        throw new Error("评论不存在")
    }
}

const findCommentList = async (info)=>{
    const {page,pageList} = info;
    const data = await commentServices.findComment({});
    return getPageData(data,page,pageList)
}

const findCommentListByPost = async (info)=>{
    const {_id} = info;
    return commentServices.findComment({post_id: _id,status:0});
}

const updateCommentStatus = (id,status)=>{
    if (status){
        commentServices.modifyComment({_id:id},{
            status,
        })
    }else {
        throw new Error("更新评论状态失败")
    }
}


const defrostComment = (info)=>{
    const {id} = info
    updateCommentStatus(id,0)
}


module.exports = {
    addComment,
    deleteComment,
    findCommentList,
    findCommentListByPost,
    defrostComment
}