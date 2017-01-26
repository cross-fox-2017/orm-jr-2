import DBModel from "../models/db_model.js";
import Student from "../models/student.js";

var db = new DBModel("./db/test.db")

function testStudentCreate() {
  let mockup = {
    firstname: 'BULOK',
    lastname: 'ISREAL',
    cohortId: 232
  }
  Student.createStudent(db.connection, new Student(mockup.firstname, mockup.lastname, mockup.cohortId))
  cek(mockup)
}

function cek(mockup, type) {
  let query = `SELECT * FROM students
  WHERE firstname = '${mockup.firstname}'
  AND lastname = '${mockup.lastname}' AND cohortId = ${mockup.cohortId}`

  db.connection.serialize(function () {
    db.connection.all(query, function (err, students) {
      if (!err && students.length > 0) {
        console.log('test create student : Success');
      }else {
        console.log('test '+type+' student : failed');
      }
    })
  })
}

testStudentCreate()
