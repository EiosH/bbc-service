const {userServices} = require("../service")
const {getPageData } = require("../utils")


const addUser = (info)=>{
    const {
        nick_name,
        sex,
        position
    } = info;

    if (nick_name && !isNaN(Number(sex)) && position){
        userServices.addUser({
            nick_name,
            sex,
            position,
        })
    }else {
        throw new Error("用户信息错误或不完整")
    }
}

const modifyUser = (info)=>{
    const {id,newInfo} = info;
    const {
        nick_name,
        sex,
        position
    } = newInfo | {};

    if (nick_name && !isNaN(Number(sex)) && position){
        userServices.modifyUser({_id:id},{
            nick_name,
            sex,
            position,
        })
    }else {
        throw new Error("用户信息错误或不完整")
    }
}

const deleteUser = (info)=>{
    if(info._id){
        userServices.deleteUser(info);
    }else {
        throw new Error("用户 id 不存在")
    }
}

const findUser = async (info)=>{
    if(info._id){
        const res = await  userServices.findUser({_id:info._id})
        return res[0];
    }else {
        throw new Error("用户 id 不存在")
    }
}

const findUserList = async (info)=>{
    const {page,pageList} = info;
    const data = await userServices.findUser({});
    return getPageData(data,page,pageList)
}

module.exports = {
    addUser,
    modifyUser,
    findUser,
    deleteUser,
    findUserList
}