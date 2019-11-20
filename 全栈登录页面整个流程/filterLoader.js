let fs = require('fs');
let globalConf = require('./config');

let filterSet = [];
let files = fs.readdirSync(globalConf.filter_path); //返回一个文件的数组

for (let i = 0; i < files.length; i++) {
    let temp = require('./' + globalConf.filter_path + '/' + files[i]);
    filterSet.push(temp)
}

module.exports = filterSet;