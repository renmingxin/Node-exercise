let dbUtil = require('./dbUtil');

//查询所有学生
function queryAllStudent(success){
    let querySql = 'select * from student;';
    let connection = dbUtil.createConnection();
    connection.connect();
    connection.query(querySql,(error, result)=>{
        if(error){
            throw new Error(error);
        }else {
            //result是数组
            success(result)
        }
    });
    connection.end();
}

//查询班上的学生 根据班级和年龄
function queryStudentByClassAndAge(classNum,age,success){
    //防止sql注入 不能使用字符串拼接
    // let querySql = `select * from student where class = ${classNum};`;
    let querySql = 'select * from student where class = ? and age = ?;';
    let queryParams = [classNum,age];
    let connection = dbUtil.createConnection();
    connection.connect();
    connection.query(querySql, queryParams, (error, result)=>{
        if(error){
            throw new Error(error);
        }else {
            //result是数组
            success(result)
        }
    })
    connection.end();
}

//根据学号查询学生
function queryStudentByStuNum(stuNum,success){
    let querySql = 'select * from student where stu_num = ?;';
    let queryParams = [stuNum];
    let connection = dbUtil.createConnection();
    connection.connect();
    connection.query(querySql, stuNum, (error, result)=>{
        
        if(error){
            throw new Error(error);
        }else {
            //result是数组
            success(result)
        }
    })
    connection.end();
}

// queryStudentByClass(1,19);
// queryAllStudent();

//web->service->dao->db
module.exports = {
    queryAllStudent,
    queryStudentByClassAndAge,
    queryStudentByStuNum
};

