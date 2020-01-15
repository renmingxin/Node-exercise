let url = require('url');

let studentServive = require('../service/studentService');
let path = new Map();

function getAllStudent(request, response){
    let params = url.parse(request.url,true).query;
    studentServive.queryAllStudent(success=>{
        response.writeHead(200,{'Content-Type':'application/json; charset=utf-8'});
        response.write(JSON.stringify({data:success}));
        response.end();
    })
}

function getStudentByName(request,response){
    let params = url.parse(request.url,true).query;
    let name = params.name;
    studentServive.queryStudentByName(name,success=>{
        response.writeHead(200);
        response.write(JSON.stringify(success));
        response.end();
    })
}

//如果你访问我这个路径'/getAllStudent'  我就返回这个getAllStudent方法
path.set('/getAllStudent',getAllStudent);
path.set('/getStudentByName',getStudentByName);
module.exports.path = path;