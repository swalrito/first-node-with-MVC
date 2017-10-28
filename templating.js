const nunjucks=require('nunjucks')

//创建一个Env类
function createEnv(path,opts){
    const autoescape = opts.autoescape === undefined ? true : opts.autoescape;
    const noCache = opts.noCache || false;
    const watch=opts.watch || false;
    const throwOnUndefined = opts.throwOnUndefined || false;
    const env=new nunjucks.Environment(
        new nunjucks.FileSystemLoader(path, {
            noCache: noCache,
            watch: watch,
        }), {
            autoescape: autoescape,
            throwOnUndefined: throwOnUndefined
        });
        if (opts.filters) {
            for (var f in opts.filters) {
                env.addFilter(f, opts.filters[f]);
            }
        }
        return env; 
}

function templating(path,opts){
    const env=createEnv(path,opts);
    return async (ctx,next)=>{
        ctx.render=function(view,model){
            ctx.response.body=env.render(view, Object.assign({}, ctx.state || {}, model || {}));
            ctx.response.type="text/html";
        }
        await next();
    }
}

module.exports=templating;