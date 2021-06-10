const Koa = require('koa');
const path = require('path');
const koaBody = require('koa-body');
const app = new Koa();
const static = require('koa-static')

const staticPath = './public'

app.use(koaBody({
    multipart: true, // 允许上传多个文件
    encoding:'gzip',
    formidable: {
        keepExtensions: true, //  保存图片的扩展名
    }
}))


const router = require("./routes")


app.use(static(
    path.join(__dirname,staticPath)
))


app.use(async (ctx,next)=>{
    try {
        const data = await next() || "";

        ctx.body =  {
            code:"0",
            description:"",
            data,
        }
    }catch (e){
        ctx.body =  {
            code:"1",
            description:e.toString(),
        }
    }
})

app.use(router.routes()).use(router.allowedMethods())




app.listen(3000);