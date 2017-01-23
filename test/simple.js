import DBModel from "../models/db_model.js";
import Student from "../models/student.js";

var db = new DBModel("./db/test.db")

function testCreateStudent() {
  let testing = {
    firstname: "Karina",
    lastname: "Ina",
    cohort_id: 1
  }

  Student.create(db.connection, new Student(testing.firstname, testing.lastname, testing.cohort_id))
  trying(testing)
}

function testUpdateStudent() {
  let testing = {
    firstname: "Isumi",
    lastname: "Karina",
    cohort_id: 1,
    id: 1
  }

  Student.update(db.connection, new Student(testing.firstname, testing.lastname, testing.cohort_id, testing.id))
  trying(testing)
}

function trying(testing, type) {
  let query = `SELECT * FROM students WHERE firstname = '${testing.firstname}' AND lastname = '${testing.lastname}' AND cohort_id = ${testing.cohort_id}`
  //console.log(query)

  db.connection.serialize(function(){
    db.connection.all(query, function (err, data) {
      if(!err && data.length > 0) {
        console.log(':: Test create student: success ::')
      } else {
        console.log(':: Test '+type+ 'student: failed ::');
      }
    })
  })
}

testCreateStudent()
testUpdateStudent()
