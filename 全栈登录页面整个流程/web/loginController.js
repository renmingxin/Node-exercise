let url = require('url');

let studentService = require('../service/studentService');

let path = new Map();

function getData(request,response){
    // throw new Error();
    let obj = {
        msg:200,
        data:[
            {name:'rmx',age:20},
            {name:'lq',age:23}
        ]
    };
    response.writeHead(200);//状态码
    response.write(JSON.stringify(obj));
    response.end();
}
function getData2(request,response){
    studentService.queryAllStudent(result=>{
        response.writeHead(200);//状态码
        response.write(JSON.stringify(result));
        response.end();
    });
}
function login(request,response){
    //用'GET'方式传输，拿到params值
    // let params = url.parse(request.url,true).query;//第二个参数传true 转换为object ?name=rmx&age=20 -> {name:'rmx',age:'20'}

    //用'POST'方式传输，用request.on('data',data=>{})回调data拿到二进制数据，用toString()取得正确的值
    request.on('data',data=>{
        let stuNum = data.toString().split('&')[0].split('=')[1];
        let password = data.toString().split('&')[1].split('=')[1];
        studentService.queryStudentByStuNum(stuNum, result=>{
            let res = '';
            if(result == null || result.length === 0){
                res = 'fail'
            }else {
                if(result[0].pwd === password){
                    res = 'ok'
                }else {
                    res = 'fail';
                }
            }
            response.write(res);
            response.end();
        })
    })

}
path.set('/getData',getData)
path.set('/getData2',getData2)
path.set('/login',login)
module.exports.path = path;