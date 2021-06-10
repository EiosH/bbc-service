const {keywords} = require("../assets/keywords")

const getPageData = (data ,page = 1,pageSize = 10)=>{
    page = Number(page)
    pageSize = Number(pageSize)
    const start = (page - 1) * pageSize;
    const end = start + pageSize
    return data.slice(start,end)
}

const getIfIllegal = (content="")=> {
    const keywordList = keywords.split("，")
    let isIllegal = false;
    for (let i of keywordList){
        if(content.includes(i)){
            isIllegal = true;
            break;
        }
    }
    return isIllegal
}


module.exports = {
    getPageData,
    getIfIllegal
}