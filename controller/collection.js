const {collectionServices} = require("../service")
const {getPostListByIdOfUser} = require("./post")

const addCollection= (info)=>{
    const {
        post_id,
        user_id,
    } = info;

    if (post_id && user_id){
        collectionServices.addCollection({
            post_id,
            user_id,
        })
    }else {
        throw new Error("收藏失败!")
    }
}

const deleteCollection= (info)=>{
    if(info._id){
        collectionServices.deleteCollection(info);
    }else {
        throw new Error("收藏记录不存在")
    }
}

const findCollectionList = async (info)=>{
    return  collectionServices.findCollection(info);
}

const getCollectedPost = async (info)=>{
    const {user_id} = info

    const mapList = await findCollectionList({
        user_id
    })

    const postIdList = mapList.map(v=>v.post_id)
    const res = []

    for (let id of postIdList){
        const post  = await getPostListByIdOfUser(id)
        if(post) res.push(post)
    }
    return  res
}



const getIfCollected = async (info)=>{
    const { user_id , post_id} = info
    return Boolean(collectionServices.findCollection({
        post_id,
        user_id,
    }))
}

module.exports = {
    addCollection,
    deleteCollection,
    getCollectedPost,
    getIfCollected
}