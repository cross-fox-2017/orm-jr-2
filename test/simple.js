import DBModel from "../models/db_model.js";
import Student from "../models/student.js";

var db = new DBModel("./db/test.db")

function testStudentCreate() {
  var mockup = {
    firstname: "Halo",
    lastname: "Coba",
    cohort_id: "3",
  }

  Student.create(db.connection, new Student(mockup.firstname, mockup.lastname, mockup.cohort_id))
  cek(mockup, 'create')
}

function testStudentUpdate() {
  var mockup = {
    firstname: "Halo",
    lastname: "Coba",
    cohort_id: "3",
    id : 3
  }

  Student.update(db.connection, new Student(mockup.firstname, mockup.lastname, mockup.cohort_id, mockup.id))
  cek(mockup, "update")
}

function cek (mockup, type) {
  var query = `SELECT * FROM students
                WHERE firstname = ${mockup.firstname} AND lastname = ${mockup.lastname}
                AND cohort_id = ${mockup.cohort_id}`

  db.connection.serialize(function() {
    db.connection.all(query, function (err, students) {
      if (!err && students.length > 0) {
        console.log('test create : success');
      }else {
        console.log('test ' + type + ' student : failed');
      }
    })
  })
}

testStudentCreate();
testStudentUpdate();
