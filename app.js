const Koa=require('koa')
const app = new Koa()
const bodypares=require('koa-bodyparser')
const controllers=require('./controllers')
const templating=require('./templating')
const static_file=require('./static_files')
const isProduction=process.env.NODE_ENV=='production'

//对每一个http请求做出回应
app.use(async (ctx,next)=>{
    console.log(`Process ${ctx.request.method},${ctx.request.url}……`);
    const start=new Date();
    await next();
    const end=new Date();
    const execTime=end-start;
    ctx.response.set('X-Response-Time',`${execTime}ms`);
})

//处理http请求的静态文件
if(!isProduction){
    app.use(static_file('/static/',__dirname+'/static'));
}

//加载koa-bodyparser
app.use(bodypares());

//渲染页面
app.use(templating('views',{
    noCach:!isProduction,
    watch:!isProduction

}))

//对URL请求进行处理
app.use(controllers());

app.listen(3000);
console.log("node is running at 30000 port…………");