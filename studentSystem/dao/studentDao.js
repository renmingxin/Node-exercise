let DBUtil = require('./DBUtil');

function queryAllStudent(success){
    let querySql = 'select * from student';
    let connection = DBUtil.createConnection();
    connection.connect();
    connection.query(querySql,[],(error,result)=>{
        if(error == null){
            success(result);
        }else {
            console.log(error);
        }
    });
    connection.end();
}

function queryStudentByName(name,success){
    let querySql = 'select * from student where name = ?;';
    let queryParams = [name];
    let connection = DBUtil.createConnection();
    connection.connect();
    connection.query(querySql,name,(error,result)=>{
        console.log(error)
        console.log(result);
        if(error){
            throw new Error(error);
        }else {
            success(result);
        }
    });
    connection.end();
}
module.exports = {
    queryAllStudent,
    queryStudentByName
};