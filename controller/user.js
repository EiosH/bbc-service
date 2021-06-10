const {userServices} = require("../service")
const {getPageData } = require("../utils")
const { uploadImg } = require("../service/file")


const addUser = async (info)=>{
    const {
        nick_name,
        sex,
        position,
        avatar
    } = info;

    if (nick_name && !isNaN(Number(sex)) && position && avatar){
        userServices.addUser({
            nick_name,
            sex,
            position,
            avatar: await uploadImg(avatar)
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
        const res = await userServices.findUser({_id: info._id})
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



const adminUserRegister = async (info)=>{
    const {
        account,
        password
    } = info;

    if (account && password){
        userServices.addUser({
            account,
            password,
            type : 1
        })
    }else {
        throw new Error("注册失败！")
    }
}

const adminUserLogin =async (info)=>{
    const {
        account,
        password,
    } = info
    if(account && password){
        const isSuccess =  Boolean(await userServices.findUser({
            account,
            password
        }))
        if(!isSuccess){
            throw new Error("用户名或密码错误!")
        }
    }else {
        throw new Error("请输入账号和密码!")
    }


}

module.exports = {
    addUser,
    modifyUser,
    findUser,
    deleteUser,
    findUserList,
    adminUserLogin,
    adminUserRegister
}