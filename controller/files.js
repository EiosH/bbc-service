const { uploadFile } = require("../service/file")


const uploadSingleFile = async (info)=>{
    const {file} = info
    if(file){
        const src = uploadFile(file)
        return src
    }else {
        throw new Error("无文件!")
    }
}


module.exports = {
    uploadSingleFile
}