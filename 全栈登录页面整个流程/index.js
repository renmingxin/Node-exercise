let http = require('http');
let url = require('url');
let fs = require('fs');
let globalConf = require('./config');
let loader = require('./loader');
let filterSet = require('./filterLoader');
let log = require('./log');

http.createServer((request,response)=>{
    let pathName = url.parse(request.url).pathname;//路径名
    log(pathName);
    for (let i = 0; i < filterSet.length; i++) {
        let flag = filterSet[i](request,response);
        if (!flag){
            return;
        }
    }

    let params = url.parse(request.url,true).query;//第二个参数传true 转换为object ?name=rmx&age=20 -> {name:'rmx',age:'20'}
    let isStatic = isStaticRequest(pathName)
    if(isStatic){//请求的静态的文件
        try {
            let fsData = fs.readFileSync(globalConf.page_path + pathName);
            response.writeHead(200);//状态码
            response.write(fsData);
            response.end();
        } catch (error) {
            response.writeHead(404);//状态码
            response.write('<html><body><h1>404 NOT FOUND</h1></body></html>');
            response.end();
        }
    }else{//请求的是动态的数据
        if(loader.get(pathName) != null){
            //避免程序内部出错 直接使得服务器停止
            try {
                //如果有的话 直接执行 且将request,response传进去
                loader.get(pathName)(request,response);
            } catch (error) {
                response.writeHead(500);//服务器的错误
                response.write('<html><body><h1>500</h1></body></html>');
                response.end();
            }
        }else {
            response.writeHead(404);//状态码
            response.write('<html><body><h1>404 NOT FOUND</h1></body></html>');
            response.end();
        }
    }
}).listen(globalConf.port);
console.log('服务已启动1，页面：login.html');
log('服务已启动');
//判断是否请求的是静态资源   用后缀来判断
function isStaticRequest(pathName){
    for (let i = 0; i < globalConf.static_file_type.length; i++) {
        let temp = globalConf.static_file_type[i];
        if(pathName.indexOf(temp) === (pathName.length - temp.length)){//判断后缀名在末尾
            return true
        }
    }
}