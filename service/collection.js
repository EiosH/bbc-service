const {collectionModel} = require("../dao")


const addCollection = (info)=> {
    return collectionModel.create(info);
}

const modifyCollection = (origin,info)=>{
    collectionModel.updateMany(origin,info,(e=>{
        e && console.log(e)
    }))
}

const deleteCollection = (info)=>{
    collectionModel.deleteMany(info,()=>{});
}

const findCollection = (info = {})=>{
    return new Promise((res,rej)=>{
        collectionModel.find(info,{},(e,info)=>{
            if(e){
                rej(e)
            }
            res(info)
        });
    })

}

module.exports = {
    addCollection,
    modifyCollection,
    deleteCollection,
    findCollection
}

