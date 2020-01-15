let http = require('http');
let url = require('url');
let fs = require('fs');

let loader = require('./loader');

http.createServer((request,response)=>{
    let pathName = url.parse(request.url).pathname;
    let isStatic = isStaticPage(pathName);
    if (isStatic){//请求页面
        try{
            let fileData = fs.readFileSync("./page" + pathName);
            response.writeHead(200);
            response.write(fileData);
            response.end();
        }catch (e) {
            response.writeHead(404);
            response.write('<html><body><h1>404</h1></body></html>');
            response.end();
        }
    }else {//来请求数据了
        for (let temp of loader){
            //如果接口地址和 访问的地址名相同(且必须以正则规则) 则执行接口的方法
            if(new RegExp('^' + temp[0] + '$').test(pathName)){
                temp[1](request,response);
                return
            }
        }
        response.writeHead(404);
        response.write('<html><body><h1>404</h1></body></html>');
        response.end();
    }
}).listen(12306);
/*
*  @params {String} 访问的文件名加后缀
* */
function isStaticPage(pathName) {
    let statics = ['.html','.css','.js','.jpg','.png'];
    for(let item of statics){
        if (pathName.indexOf(item) === pathName.length - item.length){
            return true;
        }else {
            return  false
        }
    }
}