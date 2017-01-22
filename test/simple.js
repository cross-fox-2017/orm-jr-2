import DBModel from "../models/db_model.js";
import Student from "../models/student.js";

var db = new DBModel("./db/student.db")

function testStudentCreate() {
  var mockup = {
    firstname: 'Adam2',
    lastname : 'Levine',
    telepon  : '0876446',
    cohort_id: 1
  }

  Student.create(db.connection, new Student(mockup.firstname, mockup.lastname,mockup.telepon, mockup.cohort_id))
  cek(mockup)
}

function cek(mockup) {
  var query = `SELECT * FROM students WHERE firstname = '${mockup.firstname}' AND lastname = '${mockup.lastname}' AND telepon = '${mockup.telepon} ' AND cohort_id = '${mockup.cohort_id}'`
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

testStudentCreate()
