import DBModel from "../models/db_model.js";
import Student from "../models/student.js";

var db = new DBModel("./db/test.db")

function testStudentCreate() {
  var mockup = {
    firstname: 'Adam2',
    lastname: 'Levine',
    cohort_id: 1
  }

  Student.create(db.connection, new Student(mockup.firstname, mockup.lastname, mockup.cohort_id))
  cek(mockup)
}

function testStudentUpdate() {
  var mockup = {
    firstname: 'Muhammad',
    lastname: 'Iqbal',
    cohort_id: 20,
    id: 7
  }

  Student.update(db.connection, new Student(mockup.firstname, mockup.lastname, mockup.cohort_id, mockup.id))
  cek(mockup)
}

function cek(mockup) {
  var query = `SELECT * FROM students WHERE firstname = '${mockup.firstname}' AND lastname = '${mockup.lastname}' AND cohort_id = '${mockup.cohort_id}'`
  db.connection.serialize(function(){
    db.connection.all(query, function(err, students) {
      if(!err || students.length > 0) {
        console.log('test success');
      } else {
        console.log('test failed');
      }
    })
  })

}

// testStudentCreate()
testStudentUpdate()
