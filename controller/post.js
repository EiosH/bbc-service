const {postServices,collectionServices }= require("../service")
const {uploadImg} = require("../service/file")
const {getPageData, getIfIllegal} = require("../utils")
const {findCommentListByPost} = require("./comment")
const {findUser} = require("./user")


const addPost = async (info) => {
    const {author_id, content, type, img, imgPathList} = info;

    let img_src;

    if(imgPathList && imgPathList.length){
        img_src = imgPathList
    }else if (img && img.length) {
        img_src = await Promise.all(img.map(v => {
            return uploadImg(v)
        }))
    }
    const status = Number(getIfIllegal(content))


    if (author_id && content && type) {
        await postServices.addPost({
            author_id,
            content,
            type,
            img_src,
            date: Date.now(),
            status,
            read: 0
        });
        return status

    } else {
        throw new Error("发布失败!")
    }
}

const modifyPost = (info) => {
    const {id, newContent} = info;

    if (newContent) {
        postServices.modifyPost({_id: id}, {
            content: newContent,
            date: Date.now(),
        })
    } else {
        throw new Error("修改失败")
    }
}

const deletePost = async (info) => {
    const {_id} = info
    if (_id) {
        await postServices.deletePost({_id});
    } else {
        throw new Error("删除失败!")
    }
}

const findPostList = async (info) => {
    const {page, pageSize, ...extra} = info;
    let data = await postServices.findPost(extra);

    data = data.sort((a,b)=>{
        return  Number(b.date) - Number(a.date)
    })

    if (page && pageSize) {
        return getPageData(data, page, pageSize)
    } else {
        return data
    }
}


const getPostList = async (info) => {
    const postInfoList = await findPostList(info);

    const res = []

    for (let i = 0; i < postInfoList.length; i++) {
        const {
            _id,
            content,
            type,
            date,
            status,
            author_id,
            img_src,
            read
        } = postInfoList[i]


        try {
            const author = await findUser({_id: author_id})
            const comments = await getPostComment({
                post_id: postInfoList[i]._id
            })

            if (author) {
                res.push({
                    _id,
                    content,
                    type,
                    date,
                    status,
                    comments,
                    img_src,
                    read,
                    author
                })
            }
        } catch (e) {
        }
    }

    return res
}


const getPostListForManager = async () => {
    return [
        ...await getPostList({
            status: 2,
        }),
        ...await getPostList({
            status: 0,
        })
    ]
}

const getPostListWithJudgment = async () => {
    return await getPostList({
        status: 1
    })
}

const getPostListByIdOfUser = async (id) => {
    const res = await getPostList({
        _id: id,
        status: 0
    });

    return res[0]
}

const getIfCollected = async (info)=>{
    const { user_id , post_id } = info
    const res = await collectionServices.findCollection({
        post_id,
        user_id,
    })
    return Boolean(res && res.length)
}


const getPostListOfUser = async (info, user_id) => {

    const postList = await getPostList({
        status: 0,
        ...info
    });

    let res = []

    for (let i of postList) {
        const ifCollected = await getIfCollected({
            user_id,
            post_id: i._id
        })
        const {
            _id,
            author,
            content,
            type,
            date,
            status,
            comments,
            img_src,
            read
        } = i;

        res.push({
            _id,
            content,
            type,
            date,
            status,
            comments,
            collected: ifCollected,
            author,
            img_src,
            read
        })
    }

    res = res.sort((a,b)=>{
        const aa = ((Number(a.date)) / 1000 / 86400 ) + (Number(a.read) / 5)
        const bb = ((Number(b.date)) / 1000 / 86400) + (Number(b.read) / 5)

        return  bb - aa
    })

    return res
}

const getPostDetailOfUser = async (info) => {
    const {post_id,user_id} = info
    if(post_id && user_id){
        return getPostListOfUser({
            _id : post_id
        },user_id)
    }else {
        throw new Error("用户或帖子不存在!")
    }
}

const getPostListOfUserForSomeone = async (info) => {
    const {user_id} = info
    if( user_id){
        return getPostListOfUser({
            author_id : user_id
        },user_id)
    }else {
        throw new Error("用户或帖子不存在!")
    }
}
const getMyJudgmentPostList = async (info) => {
    const {user_id} = info
    if(user_id){
        return getPostList({
            author_id : user_id,
            status: 1
        })
    }else {
        throw new Error("用户或帖子不存在!")
    }
}


const getPosts = async (info) => {
    const {user_id,...extra} = info
    return getPostListOfUser(extra, user_id)
}




const watchPost = async (info) => {
    const {id} = info
    const postList = await postServices.findPost({
        _id: id
    });


    const post = postList[0]
    const read = Number(post.read) || 0

    if (id) {
        postServices.modifyPost({_id: id}, {
            read: read + 1
        })
    }
}


const updatePostStatus = (id, status) => {
    if (!isNaN(status)) {
        postServices.modifyPost({_id: id}, {
            status,
        })
    } else {
        throw new Error("更新状态失败")
    }
}

const getPostComment = async (info) => {
    const {post_id} = info
    const comments = await findCommentListByPost({_id: post_id})
    const sortedComments = comments.sort((a, b) =>
        a.date - b.date
    )

    const res = []

    for (let comment of sortedComments) {

        try {
            const user = await findUser({_id: comment.commenter_id})
            res.push({
                name: user.nick_name,
                content: comment.content
            })
        } catch (e) {

        }

    }

    return res
}

// const freezePost = ()=>{
//
// }

const defrostPost = (info) => {
    const {_id} = info
    updatePostStatus(_id, 0)
}
const frozenPost = (info) => {
    const {_id} = info
    updatePostStatus(_id, 2)
}


module.exports = {
    addPost,
    modifyPost,
    deletePost,
    watchPost,
    defrostPost,
    getPostListOfUser,
    getPostComment,
    getPostListByIdOfUser,
    getPostListWithJudgment,
    getPostList,
    frozenPost,
    getPostListForManager,
    getPostDetailOfUser,
    getPostListOfUserForSomeone,
    getPosts,
    getMyJudgmentPostList
}