const {collectionServices} = require("../service")
const {getPageData } = require("../utils")

const addCollection= (info)=>{
    const {
        postId,
        userId,
    } = info;

    if (postId && userId){
        collectionServices.addCollection({
            postId,
            userId,
        })
    }else {
        throw new Error("收藏失败!")
    }
}

const deleteCollection= (info)=>{
    if(info._id){
        collectionServices.deleteCollection(info);
    }else {
        throw new Error("帖子 id 不存在")
    }
}

const findCollectionList = async (info)=>{
    const {page,pageList} = info;
    const data = await collectionServices.findCollection({});
    return getPageData(data,page,pageList)
}

module.exports = {
    addCollection,
    deleteCollection,
    findCollectionList
}