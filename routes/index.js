const Router = require('@koa/router')


const  router = new Router()

const {addUser, deleteUser, findUser, modifyUser,findUserList} = require("../controller/user")
const {addPost, deletePost, findPostList,modifyPost,watchPost} = require("../controller/post")
const {
    addCollection,
    deleteCollection,
    findCollectionList
} =  require("../controller/collection")


router.post('/addUser', async ( ctx )=>{
    await addUser(ctx.request.body);
})

router.post('/modifyUser', async ( ctx )=>{
    await modifyUser(ctx.request.body)
})

router.post('/deleteUser', async ( ctx )=>{
    await deleteUser(ctx.request.body)
})

router.get('/getUserList', async ( ctx )=>{
   return await findUserList(ctx.query)
})

router.get('/getUser', async ( ctx )=>{
    return  await findUser(ctx.query)
})



router.post('/addPost', async ( ctx )=>{
    await addPost({
        ...ctx.request.body,
        ...ctx.request.files
    });
})

router.get('/getPostList', async ( ctx )=>{
    return await findPostList(ctx.query)
})

router.post('/deletePost', async ( ctx )=>{
    await deletePost(ctx.request.body);
})

router.post('/modifyPost', async ( ctx )=>{
    await modifyPost(ctx.request.body)
})

router.post('/watchPost', async ( ctx )=>{
    await watchPost(ctx.request.body)
})



router.post('/addCollection', async ( ctx )=>{
    await addPost({
        ...ctx.request.body,
        ...ctx.request.files
    });
})

router.get('/getCollection', async ( ctx )=>{
    return await findPostList(ctx.query)
})

router.post('/deleteCollection', async ( ctx )=>{
    await deletePost(ctx.request.body);
})



module.exports = router