let http = require('http');
let url = require('url');
let fs = require('fs');
let req = require('request');//需要npm install request 引入这个模块

http.createServer((request,response)=>{
    let pathName = url.parse(request.url).pathname;
    let params = url.parse(request.url,true).query;
    let isStatic = isStaticRequest(pathName);
    if(isStatic){
        try {
            let fileData = fs.readFileSync('./page/'+pathName);
            response.writeHead(200);
            response.write(fileData);
            response.end();
        }catch (e) {
            response.writeHead(404);
            response.write('<html lang="en"><head><meta charset="UTF-8"><title>404</title></head><body><h1>404找不到</h1></body></html>');
            response.end();
        }
    }else {
        //请求/chat接口地址
        if(pathName === '/chat'){
            let data = {
                "reqType":0,
                "perception": {
                    "inputText": {
                        //输入的聊天信息
                        "text": params.text
                    },
                },
                "userInfo": {
                    "apiKey": "f47d97c80951440f9ded4d27fc4251ea",
                    "userId": "123456"
                }
            };
            let content = JSON.stringify(data);
            req({
                url:'http://openapi.tuling123.com/openapi/api/v2',
                method:'POST',
                headers:{
                    //因为图灵机器人的接口文档说 请求参数格式为 json 所以
                    'content-type':'application/json'
                },
                body: content
            },(error,res,body)=>{
                if(!error && res.statusCode === 200) {
                    //**********重点**********后端解决跨域问题
                    let head = {
                        "Access-Control-Allow-Origin": "*",//允许跨域所有人访问
                        "Access-Control-Allow-Methods":"GET",//允许跨域GET请求访问
                        "Access-Control-Allow-Headers":"x-requested-with,content-type",//允许跨域的请求头
                    };
                    let obj = JSON.parse(body);
                    if(obj && obj.results && obj.results.length > 0 && obj.results[0].values){
                        console.log(obj.results[0].values);
                        response.writeHead(200,head);
                        response.write(JSON.stringify(obj.results[0].values));
                        response.writableEnded(JSON.stringify(obj.results))
                        response.end();
                    }
                }else {
                    response.end();
                }
            })
        }
    }

}).listen(12306);

function isStaticRequest(pathName) {
    let staticName = ['.html','.js','.css','.jpg','.png','.gif','.ico','.txt'];
    for (let i = 0; i < staticName.length; i++) {
        let temp = staticName[i];
        //如何证明是后缀，一共有多长减去temp的后缀等于indexOf的值
        if(pathName.indexOf(temp) === (pathName.length - temp.length)){
            return true;
        }
    }
}