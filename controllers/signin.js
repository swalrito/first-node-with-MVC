//对登录页面发送的账号密码信息进行处理，核对并跳转到对应界面
module.exports={
    "POST /signin":async (ctx,next)=>{
        const email=ctx.request.body.email || '';
        const password=ctx.request.body.password ||'';
        //若账号密码正确，则渲染signin-success页面，反之渲染success_failed页面
        if(email === 'admin@example.com' && password === '123456'){
            ctx.render('signin-sucess.html',{
                title: 'Sign In OK',
                name: 'Mr Node'
            })
        }
        else{
            ctx.render('signin-falied.html',{
                title: 'Sign In Failed'
            })
        }
    }
}