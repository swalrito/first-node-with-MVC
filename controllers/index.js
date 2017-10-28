//对首页路由'/'的get请求做出处理
module.exports={
    "GET /":async (ctx,next)=>{
        ctx.render('signin.html',{
            title:'hello koa'
        })
    }
}