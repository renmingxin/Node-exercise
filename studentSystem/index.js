let http = require('http');
let url = require('url');
let fs = require('fs');

http.createServer((request,response)=>{
    let pathName = url.parse(request.url).pathname, fileData = '';
    console.log(pathName)
    if (pathName !== '/favicon.ico') fileData = fs.readFileSync("./page" + pathName);
    try{
        response.writeHead(200);
        response.write(fileData);
        response.end();
    }catch (e) {
        response.writeHead(404);
        response.write('<html><body><h1>404</h1></body></html>');
        response.end();
    }


}).listen(12306);