let fs = require('fs');
let pathMap = new Map();

//同步读取文件名 返回一个装有文件名的数组
let files = fs.readdirSync('./web');

for (let i = 0; i < files.length; i++) {
    let temp = require('./web/' + files[i]);
    if (temp.path) {
        for (let [key, value] of temp.path) {
            if (pathMap.get(key) == null) {
                pathMap.set(key, value);
            } else {
                throw new Error('url path异常,url:' + key)
            }
        }
    }
}
module.exports = pathMap;