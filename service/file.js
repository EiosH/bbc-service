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

const uploadImg = async (file) => {
    const fileName = Date.now() +"_"+ file.name;
    const filePath = process.cwd()+ "/public/" + fileName;
    await saveFile(file.path, filePath);
    return filePath
}

module.exports = {
    uploadImg
};