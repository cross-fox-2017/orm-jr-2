import DBModel from "./models/db_model.js";
import Student from "./models/student.js";

let db = new DBModel("./db/test.db")

function testStudentCreate(){
  var mockup = {
    firstname: 'Didit',
    lastname: 'Levine',
    cohort_id: 1
  }

  Student.create(db.connection, new Student(mockup.firstname, mockup.lastname, mockup.cohort_id))
  cek(mockup)

}

function cek(mockup) {
  var QUERY = `SELECT * FROM students
              WHERE firstname = '${mockup.firstname}' AND lastname = '${mockup.lastname}' AND cohort_id = ${mockup.cohort_id}`

  db.connection.serialize(function() {
    db.connection.all(QUERY,function(err,students) {
      if(!err && students.length > 0) {
        console.log('test create student : success');
      } else {
        console.log('test create student : failed');
      }
    });
  });
}

testStudentCreate();
