const getPageData = (data,page,pageSize = 10)=>{
    page = Number(page)
    pageSize = Number(pageSize)
    const start = (page - 1) * pageSize;
    const end = start + pageSize
    return data.slice(start,end)
}


module.exports = {
    getPageData
}