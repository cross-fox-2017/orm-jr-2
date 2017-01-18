import DBModel from "../models/db_model.js";
import Student from "../models/student.js";

var db = new DBModel("./db/test.db");

function testStudentCreate() {
  let mockup = {
    firstname: "Fadly",
    lastname: "Kayo",
    cohort_id: 1
  }

  Student.create(db.connection, new Student(mockup.firstname, mockup.lastname, mockup.cohort_id))
  check(mockup)
}

function testStudentUpdate() {
  let mockup = {
    firstname: "Fadly",
    lastname: "Kaioo",
    cohort_id: 1,
    id: 1
  }

  Student.update(db.connection, new Student(mockup.firstname, mockup.lastname, mockup.cohort_id, mockup.id))
  check(mockup)
}

function check(mockup, type) {
  var query = `SELECT * FROM students
              WHERE firstname = '${mockup.firstname}' AND lastname = '${mockup.lastname}'
              AND cohort_id = ${mockup.cohort_id}`
  console.log(query);
  db.connection.serialize(function () {
    db.connection.all(query, function (err, data) {
      if (!err && data.length > 0) {
        console.log('test create student : success');
      }
      else {
        console.log('test ' + type + ' student : failed');
      }
    })
  })
}

testStudentCreate();
testStudentUpdate();
