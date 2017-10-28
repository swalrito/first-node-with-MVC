const fs=require('fs')

function addMapping(router,mapping){
    for(let url in mapping){
        //处理GET请求URL
        if(url.startsWith('GET')){
            let path=url.substring(4);
            router.get(path,mapping[url]);
            console.log(`register URL mapping: GET ${path}`);
        }
        //POST请求
        else if(url.startsWith('POST')){
            let path=url.substring(5);
            router.post(path, mapping[url]);
            console.log(`register URL mapping: POST ${path}`);
        }else {
            console.log(`invalid URL: ${url}`);
        }
    }
}

//读取每个controllers文件夹下的js文件，并为每个JS文件调用addMapping函数进行处理
function addController(router,dir){
    fs.readdirSync(__dirname+'/'+dir).filter((f)=>{
        return f.endsWith('.js');
    }).forEach((f)=>{
        console.log(`Process controllers ${f}......`);
        let mapping=require(__dirname+'/'+dir+'/'+f);
        addMapping(router,mapping);
    })
}

module.exports=function(dir){
    let controllers_dir=dir || 'controllers';
    const router=require('koa-router')();
    addController(router,controllers_dir);
    return router.routes();
}