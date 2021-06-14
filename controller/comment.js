const {commentServices} = require("../service")
const {getPageData,getIfIllegal } = require("../utils")
const {findUser} = require("./user")

const addComment=async (info)=>{
    const {
        post_id ,
        commenter_id,
        content,
    } = info;

    if (post_id && commenter_id && content){
        const status = Number(getIfIllegal(content))
        await commentServices.addComment({
            post_id,
            commenter_id,
            date: Date.now(),
            content,
            status
        })

        return status
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
    const {page,pageSize,...extra} = info;
    const data = await commentServices.findComment(extra);
    if(page && pageSize){
        return getPageData(data,page,pageSize)
    }else {
        return data
    }

}

const getCommentListWithJudgment = async ()=>{
    const commentList = await findCommentList({
        status: 1
    });

    const res = [];

    for (let i = 0; i < commentList.length; i++){
        const {
            _id,
            post_id ,
            commenter_id,
            date,
            content,
            status
        } = commentList[i]


        try {
            const author = await findUser({_id: commenter_id,freeze :{$ne : true}})
            if(author){
                res.push({
                    _id,
                    post_id ,
                    commenter_id,
                    date,
                    content,
                    status,
                    author
                })
            }
        }catch (e) {
        }
    }

    return res
}



const findCommentListByPost = async (info)=>{
    const {_id} = info;
    return findCommentList({post_id: _id,status:0});
}

const updateCommentStatus = (id,status)=>{
    if (!isNaN(status)){
        commentServices.modifyComment({_id:id},{
            status,
        })
    }else {
        throw new Error("更新评论状态失败")
    }
}


const defrostComment = (info)=>{
    const {_id} = info
    updateCommentStatus(_id,0)
}


module.exports = {
    addComment,
    deleteComment,
    findCommentListByPost,
    defrostComment,
    findCommentList,
    getCommentListWithJudgment
}