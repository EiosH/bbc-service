const {userServices} = require("../service")
const {getPageData} = require("../utils")
const {uploadImg} = require("../service/file")


const addUser = async (info) => {

    const {
        nick_name,
        sex,
        position,
        avatar,
        signature_id,
    } = info;

    const hasUser = await userServices.findUser({signature_id})
    if(hasUser[0]){
        throw new Error("该用户已注册!")
        return;
    }

    if (nick_name && !isNaN(Number(sex)) && signature_id) {

        const avatarPath = avatar ? await uploadImg(avatar) : "default.png"
        const data = await userServices.addUser({
            nick_name,
            sex,
            position: position || "",
            avatar: avatarPath,
            signature_id,
            type: 0
        })
        return data
    } else {
        throw new Error("用户信息错误或不完整")
    }
}

const modifyUser = async (info) => {
    const {
        _id,
        nick_name,
        sex,
        position,
        avatar
    } = info;


    if (nick_name && !isNaN(Number(sex))) {
        const data = {
            nick_name,
            sex,
            position: position || "",
        }
        let avatar_url = ""
        if(avatar){
            avatar_url = await uploadImg(avatar)
        }
        userServices.modifyUser({_id}, {
            ...data,
            avatar:avatar_url ||  "default.png"
        })
    } else {
        throw new Error("用户信息错误或不完整")
    }
}

const deleteUser = (info) => {
    if (info._id) {
        userServices.modifyUser({_id:info._id}, {
            freeze: true
        })
    } else {
        throw new Error("用户 id 不存在")
    }
}

const defrostUser = (info) => {
    if (info._id) {
        userServices.modifyUser({_id:info._id}, {
            freeze: false
        })
    } else {
        throw new Error("用户 id 不存在")
    }
}

const findUser = async (info) => {
    if (info._id) {
        const res = await userServices.findUser({_id: info._id , freeze :{$ne : true}})
        return res[0];
    } else {
        throw new Error("用户 id 不存在")
    }
}

const getUserInfo = async (info) => {
    if (info.signature_id) {
        const res = await userServices.findUser({signature_id: info.signature_id})
        return res[0];
    }
}

const findUserList = async (info = {}) => {
    const {page, pageSize, ...extra} = info;
    const data = await userServices.findUser(extra);
    if (page && pageSize) {
        return getPageData(data, page, pageSize)
    }
    return data
}

const getUserList = async () => {
    return findUserList({
        type: 0,
    })
}


const adminUserRegister = async (info) => {
    const {
        account,
        password,
    } = info;

    if (account && password) {
        const res = await userServices.findUser({account});
        const user = res[0];
        if (user) {
            throw new Error("账号已存在!")
        }
    }
    userServices.addUser({
        account,
        password,
        type: 1
    })

}

// adminUserRegister({
//     account:1,
//     password:1,
// })


const adminUserLogin = async (info) => {
    const {
        account,
        password,
    } = info
    if (account && password) {

        const res = await userServices.findUser({
            account,
            password,
            type: 1
        })

        const isSuccess = Boolean(res && res.length)

        if (!isSuccess) {
            throw new Error("用户名或密码错误!")
        }
    } else {
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
    adminUserRegister,
    getUserList,
    getUserInfo,
    defrostUser

}