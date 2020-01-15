let mysql = require('mysql');

function createConnection(){
    let connection = mysql.createConnection({
        host:'localhost',
        port:'3306',
        user:'root',
        password:'admin',
        database:'school'
    });
    return connection;
}

module.exports.createConnection = createConnection;