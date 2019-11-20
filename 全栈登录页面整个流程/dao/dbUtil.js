let mysql = require("mysql");
// console.log(mysql)

function createConnection(){
//创建连接
    let connection = mysql.createConnection({
        host:'127.0.0.1',
        port:'3306',
        user:'root',
        password:'admin',
        database:'school',
    });
    return connection;
}

module.exports.createConnection = createConnection;