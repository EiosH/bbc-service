const Router = require('@koa/router')

const router = new Router()

const {
    addUser,
    deleteUser,
    findUser,
    modifyUser,
    getUserList,
    adminUserLogin,
    adminUserRegister,
    getUserInfo,
    defrostUser
} = require("../controller/user")
const {
    addPost,
    deletePost,
    getPostListForManager,
    getPostListOfUser,
    getPostListWithJudgment,
    modifyPost,
    watchPost,
    defrostPost,
    frozenPost,
    getPostDetailOfUser,
    getPostListOfUserForSomeone,
    getMyJudgmentPostList,
    getPosts
} = require("../controller/post")
const {
    addCollection,
    deleteCollection,
    getCollectedPost,
    getIfCollected
} = require("../controller/collection")
const {
    addComment,
    deleteComment,
    getCommentListWithJudgment,
    defrostComment,
    findCommentList
} = require("../controller/comment")
const {
    uploadSingleFile
} = require("../controller/files")


const BASE_PATH = "/api"

//用户相关
router.post(BASE_PATH + '/addUser', async (ctx) => {
    return await addUser({
        ...ctx.request.body,
        ...ctx.request.files
    });
})


router.post(BASE_PATH + '/modifyUser', async (ctx) => {
    await modifyUser({
        ...ctx.request.body,
        ...ctx.request.files
    })
})

router.post(BASE_PATH + '/deleteUser', async (ctx) => {
    await deleteUser(ctx.request.body)
})

router.post(BASE_PATH + '/defrostUser', async (ctx) => {
    await defrostUser(ctx.request.body)
})

router.get(BASE_PATH + '/getUserList', async (ctx) => {
    return await getUserList(ctx.query)
})

router.get(BASE_PATH + '/getUser', async (ctx) => {
    return await findUser(ctx.query)
})

router.get(BASE_PATH + '/getUserInfo', async (ctx) => {
    return await getUserInfo(ctx.query)
})

router.post(BASE_PATH + '/login', async (ctx) => {
    await adminUserLogin(ctx.request.body)
})

router.post(BASE_PATH + '/register', async (ctx) => {
    await adminUserRegister(ctx.request.body)
})

//帖子相关
router.post(BASE_PATH + '/addPost', async (ctx) => {
    return await addPost({
        ...ctx.request.body,
        ...ctx.request.files
    });
})

router.get(BASE_PATH + '/getPostList', async (ctx) => {
    return await getPostListForManager(ctx.query)
})

router.get(BASE_PATH + '/getPostListWithJudgment', async (ctx) => {
    return await getPostListWithJudgment(ctx.query)
})


router.get(BASE_PATH + '/getPostListOfUser', async (ctx) => {
    return await getPostListOfUser({},ctx.query.user_id)
})


router.post(BASE_PATH + '/deletePost', async (ctx) => {
    await deletePost(ctx.request.body);
})

router.post(BASE_PATH + '/modifyPost', async (ctx) => {
    await modifyPost(ctx.request.body)
})

router.post(BASE_PATH + '/watchPost', async (ctx) => {
    await watchPost(ctx.request.body)
})

router.post(BASE_PATH + '/defrostPost', async (ctx) => {
    await defrostPost(ctx.request.body)
})

router.post(BASE_PATH + '/frozenPost', async (ctx) => {
    await frozenPost(ctx.request.body)
})

router.get(BASE_PATH + '/getPostDetail', async (ctx) => {
    return await getPostDetailOfUser(ctx.query)
})
router.get(BASE_PATH + '/getMyPostList', async (ctx) => {
    return await getPostListOfUserForSomeone(ctx.query)
})
router.get(BASE_PATH + '/getMyJudgmentPostList', async (ctx) => {
    return await getMyJudgmentPostList(ctx.query)
})


router.get(BASE_PATH + '/getPosts', async (ctx) => {
    return await getPosts(ctx.query)
})



//收藏相关
router.post(BASE_PATH + '/addCollection', async (ctx) => {
    await addCollection(ctx.request.body);
})

router.get(BASE_PATH + '/getCollectionList', async (ctx) => {
    return await getCollectedPost(ctx.query)
})

router.post(BASE_PATH + '/deleteCollection', async (ctx) => {
    await deleteCollection(ctx.request.body);
})



router.get(BASE_PATH + '/getIfCollected', async (ctx) => {
    await getIfCollected(ctx.request.body);
})


//评论相关
router.post(BASE_PATH + '/addComment', async (ctx) => {
    const res = await addComment(ctx.request.body);
    return  res
})

router.get(BASE_PATH + '/getCommentList', async (ctx) => {
    return await findCommentList(ctx.query)
})

router.get(BASE_PATH + '/getCommentListWithJudgment', async (ctx) => {
    return await getCommentListWithJudgment(ctx.query)
})

router.post(BASE_PATH + '/deleteComment', async (ctx) => {
    await deleteComment(ctx.request.body);
})

router.post(BASE_PATH + '/defrostComment', async (ctx) => {
    await defrostComment(ctx.request.body)
})

router.post(BASE_PATH + '/upload', async (ctx) => {
   return  await uploadSingleFile(ctx.request.files)
})


module.exports = router