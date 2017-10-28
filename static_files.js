const path=require('path')
const mime = require('mime')
const fs=require('mz/fs')

//对每个请求的静态文件请求进行处理
function static_file(url,dir){
    //返回一个供Koa使用的async函数
    return async(ctx,next)=>{
        //请求文件路径
        let rpath=ctx.request.path;
        //判断请求文件是否为静态文件
        if(rpath.startsWith(url)){
            //文件的绝对路径
            let fp=path.join(dir,rpath.substring(url.length));
            //若绝对路径中存在请求文件，则返回读取的文件内容
            if(await fs.exists(fp)){
                //返回请求文件类型
                ctx.response.type = mime.getType(rpath);
                //通过读取文件内容作为返回的内容
                ctx.response.body=await fs.readFile(fp);
            }
            else{
                console.log(`404 ${fp} is not found`);
                ctx.response.state=404;
            }  
        }
        else{
            await next();
        }
    }
}

module.exports=static_file;