let fs = require('fs');

let conf = fs.readFileSync('./server.config');
let configsArr = conf.toString().split('\r\n');

let globalConf = {};
for (let i = 0; i < configsArr.length; i++) {
    let temp = configsArr[i].split('=');
    if(temp.length < 2){
        continue
    }else{
        globalConf[temp[0]] = temp[1]
    }
}
if(globalConf.static_file_type){
    let typeArr = globalConf.static_file_type.split('|');
    globalConf.static_file_type = typeArr;
}else{
    throw new Error('配置静态资源异常，缺少static_file_type');
}
module.exports = globalConf;