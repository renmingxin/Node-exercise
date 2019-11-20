let url = require('url');

let globalConf = require('../config');

function loginFilter(request, response) {
    let pathName = url.parse(request.url).pathname;//第二个参数传true 转换为object ?name=rmx&age=20 -> {name:'rmx',age:'20'}
    //如果不是login.html 都拦截且跳转到login.html页面中
    if (pathName === '/login.html' || pathName === '/login' || isStaticRequest(pathName)){
        console.log('放行');
        return true;
    }
    //查看他是否有cookie 有的话做格式化
    if (request.headers.cookie){
        let cookieArr = request.headers.cookie.split('; ');
        let cookieObj = {};
        for (let i = 0; i < cookieArr.length; i++) {
            let key = cookieArr[i].split('=')[0];
            cookieObj[key] = cookieArr[i].split('=')[1];
        }
        if (cookieObj.stuNum) return true;
    }

    //浏览器处理
    console.log('拦截');
    response.writeHead(302,{'location':'/login.html'});
    response.end();
    return false;
}

function isStaticRequest(pathName){
    console.log(pathName);
    for (let i = 0; i < globalConf.static_file_type.length; i++) {
        let temp = globalConf.static_file_type[i];
        if (temp === '.html'){
            continue;
        }
        if(pathName.indexOf(temp) === (pathName.length - temp.length)){//判断后缀名在末尾
            return true
        }
    }
}
module.exports = loginFilter;