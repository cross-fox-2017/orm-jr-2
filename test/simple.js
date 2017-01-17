import DBModel from "../models/db_model.js";
import Student from "../models/student.js";

var db = new DBModel("./db/test.db")

function testStudentCreate(){
  var mockup = {
    firstname: 'Masbro',
    lastname: 'Gante',
    cohort_id: 1
  }
  Student.create(db.connection, new Student(mockup.firstname, mockup.lastname, mockup.cohort_id))
  cek(mockup, "create")
}
function testStudentUpdate(){
  var mockup = {
    firstname: 'Masbro',
    lastname: 'Gante',
    cohort_id: 1,
    id : 1
  }
  Student.update(db.connection, new Student(mockup.firstname, mockup.lastname, mockup.cohort_id, mockup.id))
  cek(mockup, "update")
}

function cek(mockup, type){
  var QUERY = `SELECT * FROM students WHERE firstname = '${mockup.firstname}' AND lastname = '${mockup.lastname}' AND cohort_id = '${mockup.cohort_id}'`

  db.connection.serialize(function(){
    db.connection.all(QUERY, function(err, rows){
      if (!err && rows.length > 0){
        console.log('test create student : success');
      } else {
        console.log('test' +type+ 'student : failed');
      }
    })
  })
}

testStudentCreate();
testStudentUpdate();
