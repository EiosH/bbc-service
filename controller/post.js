const {postServices} = require("../service")
const { uploadImg } = require("../service/file")
const {getPageData,getIfIllegal } = require("../utils")
const {findCommentListByPost} = require("./comment")
const {getIfCollected} = require("./collection")
const {findUser} = require("./user")


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
            status: Number(getIfIllegal(content))
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



const getPostList = async (info)=>{
    const postInfoList = await postServices.findPost(info);

    const res = []

    for (let i = 0; i < postInfoList.length; i++){
        const {
            _id,
            content,
            type,
            date,
            status,
        } = postInfoList[i]


        try {
            const author = await findUser({_id: author_id})
            const comments = await getPostComment({
                post_id: postInfoList[i]._id
            })

            res.push({
                _id,
                author,
                content,
                type,
                date,
                status,
                comments
            })

        }catch (e) {
        }
    }

    return res
}

const getPostListByIdOfUser = async (id)=>{
    const res = await getPostList({
        _id: id,
        status: 0
    });

    return res[0]
}

const getPostListOfUser = async (info)=>{
    const {user_id} = info;

    const postList = await getPostList({
        status: 0
    });

    const res = []

    for (let i of postList){
        const ifCollected = await getIfCollected({
            user_id,
            post_id: i._id
        })
        const  {
            _id,
            author,
            content,
            type,
            date,
            status,
            comments
        } = i;

        res.push({
            _id,
            author,
            content,
            type,
            date,
            status,
            comments,
            collected: ifCollected
        })
    }

    return res
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


const updatePostStatus = (id,status)=>{
    if (status){
        postServices.modifyPost({_id:id},{
            status,
        })
    }else {
        throw new Error("更新状态失败")
    }
}

const getPostComment = async (info)=>{
    const { post_id} = info
    const comments = await findCommentListByPost({_id:post_id})
    const sortedComments = comments.sort((a,b)=>
         a.date - b.date
    )

    const res = []

    for (let comment of sortedComments){

        try {
            const user = await findUser({_id: comment.commenter_id})
            res.push({
                name: user.nick_name,
                content: comment.content
            })
        }catch (e){

        }

    }

    return res
}

// const freezePost = ()=>{
//
// }

const defrostPost = (info)=>{
    const {id} = info
    updatePostStatus(id,0)
}


module.exports = {
    addPost,
    modifyPost,
    findPostList,
    deletePost,
    watchPost,
    defrostPost,
    getPostListOfUser,
    getPostComment,
    getPostListByIdOfUser
}