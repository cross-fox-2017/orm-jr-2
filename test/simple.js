import DBModel from "../models/db_model.js";
import Student from "../models/student.js";

let db = new DBModel("./db/test.db")

function testStudentCreate() {
  let mockup = {
    firstname: "Ida Bagus",
    lastname: "Chahya Dhegana",
    cohort_id: 3
  }

  Student.create(db.connection, new Student(mockup.firstname, mockup.lastname, mockup.cohort_id))
  check(mockup)
}

let check = (mockup, type) => {
  let query = `SELECT * FROM student
               WHERE firstname = '${mockup.firstname}' AND lastname = '${mockup.lastname}'
               AND cohort_id = ${mockup.cohort_id}`

   db.connection.serialize(function() {
     db.connection.all(query, function(err, student) {
       if(!err && student.length > 0) {
         console.log('test create student : success')
       } else {
         console.log(`test create student : failed`)
       }
     })
   })
}

testStudentCreate()
