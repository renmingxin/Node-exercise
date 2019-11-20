let fs = require('fs');
let globalConf = require('./config');

let fileName = globalConf.log_path + globalConf.log_name;
//(路径，内容，callback) 
//异步执行后就在目录路径下创建一个日志文件server.log 内容是asd
// fs.writeFile(fileName,'aaaaaaaaaaaaaa',function(){
//     console.log('异步')
// })
//同步比异步快 但是会被异步覆盖
// fs.writeFileSync(fileName,'333333')

function log(data){
    //第三个参数 flag如果是a 就会继续写入不会直接覆盖新值 
    fs.writeFile(fileName,data+'\r',{flag:'a'},function(a,b,c){
        // console.log('异步日志打印完毕:' + data )
    })
}
module.exports = log;