const Router = require('@koa/router')


const  router = new Router()

const {addUser, deleteUser, findUser, modifyUser,findUserList, adminUserLogin, adminUserRegister} = require("../controller/user")
const {addPost, deletePost, findPostList,getPostListOfUser,modifyPost,watchPost,defrostPost} = require("../controller/post")
const {
    addCollection,
    deleteCollection,
    getCollectedPost,
    getIfCollected
} =  require("../controller/collection")
const {
    addComment,
    deleteComment,
    findCommentList,
    defrostComment
} =  require("../controller/comment")


//用户相关
router.post('/addUser', async ( ctx )=>{
    await addUser({
        ...ctx.request.body,
        ...ctx.request.files
    });
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

router.post('/login', async ( ctx )=>{
    await adminUserLogin(ctx.request.body)
})

router.post('/register', async ( ctx )=>{
    await adminUserRegister(ctx.request.body)
})

//帖子相关
router.post('/addPost', async ( ctx )=>{
    await addPost({
        ...ctx.request.body,
        ...ctx.request.files
    });
})

router.get('/getPostList', async ( ctx )=>{
    return await findPostList(ctx.query)
})

router.get('/getPostListOfUser', async ( ctx )=>{
    return await getPostListOfUser(ctx.query)
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

router.post("/defrostPost", async ( ctx )=>{
    await defrostPost(ctx.request.body)
})



//收藏相关
router.post('/addCollection', async ( ctx )=>{
    await addCollection(ctx.request.body);
})

router.get('/getCollectionList', async ( ctx )=>{
    return await getCollectedPost(ctx.query)
})

router.post('/deleteCollection', async ( ctx )=>{
    await deleteCollection(ctx.request.body);
})

router.post('/deleteCollection', async ( ctx )=>{
    await deleteCollection(ctx.request.body);
})

router.get('/getIfCollected', async ( ctx )=>{
    await getIfCollected(ctx.request.body);
})




//评论相关
router.post('/addComment', async ( ctx )=>{
    await addComment(ctx.request.body);
})

router.get('/getCommentList', async ( ctx )=>{
    return await findCommentList(ctx.query)
})

router.post('/deleteComment', async ( ctx )=>{
    await deleteComment(ctx.request.body);
})

router.post("/defrostComment", async ( ctx )=>{
    await defrostComment(ctx.request.body)
})





module.exports = router