let studentDao = require('../dao/studentDao');

function queryAllStudent(success){
    studentDao.queryAllStudent(success);
}

function queryStudentByName(name,success){
    studentDao.queryStudentByName(name,success);
}

module.exports = {
    queryAllStudent,
    queryStudentByName
};