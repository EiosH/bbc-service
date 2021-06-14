const fs = require("fs")

//保存文件
const saveFile = (file, path) => {
    return new Promise((resolve, reject) => {
        let render = fs.createReadStream(file);
        // 创建写入流
        let upStream = fs.createWriteStream(path);
        render.pipe(upStream);
        upStream.on('finish', () => {
            resolve(path)
        });
        upStream.on('error', (err) => {
            reject(err)
        });
    })
}

const uploadFile = async (file)=>{
    const fileName = Date.now() +"_"+ file.name;
    const filePath =  "/public/" + fileName;
    await saveFile(file.path, process.cwd() + filePath);
    return fileName;
}

const uploadImg = async (file) => {
    return await uploadFile(file)
}

module.exports = {
    uploadImg,
    uploadFile
};