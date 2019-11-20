let fs = require('fs');
let globalConf = require('./config');

let controllerSet = [];
let pathMap = new Map();
let files = fs.readdirSync(globalConf.web_path); //返回一个文件的数组

for (let i = 0; i < files.length; i++) {
    let temp = require('./' + globalConf.web_path + '/' + files[i]);
    if(temp.path){
        //map结构可以用此方法迭代
        for (let [k,v] of temp.path) {
            //不能有相同的接口存在 否则抛出异常
            if(pathMap.get(k) == null){
                //把接口和方法set进map里面
                pathMap.set(k,v)
            }else{
                let error = 'url接口异常,url:   ' + k;
                throw new Error(error);
            }
        }
        controllerSet.push(temp)
    }
}
module.exports = pathMap;