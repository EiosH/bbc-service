const {userModel} = require("../dao")


const addUser = (info)=> {
    return userModel.create(info);
}

const modifyUser = (origin,info)=>{
    userModel.updateMany(origin,info,(e=>{
        e && console.log(e)
    }))
}

const deleteUser = (info)=>{
    userModel.deleteMany(info,()=>{});
}

const findUser = (info = {})=>{
    return new Promise((res,rej)=>{
        userModel.find(info,{},(e,info)=>{
            if(e){
                rej(e)
            }
            res(info)
        });
    })

}

module.exports = {
    addUser,
    modifyUser,
    deleteUser,
    findUser
}

