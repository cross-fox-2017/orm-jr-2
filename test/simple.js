"use strict"
import DBModel from "../models/db_model.js";
import Student from "../models/student.js";
var db = new DBModel("../db/test.db")



function testStudentCreate() {
  var tambahData = {
      firstname : "Desdus",
      lastname : "Kuskus",
      cohort_id : 1
  }
  Student.create(db.connection, new Student(tambahData.firstname, tambahData.lastname, tambahData.cohort_id))
  cek(tambahData)
}

function cek(tambahData) {
    var query = `SELECT * FROM students WHERE firstname='${tambahData.firstname}' AND lastname='${tambahData.lastname}' AND cohort_id='${tambahData.cohort_id}'`
    db.connection.all(query, function(err) {
        if (!err && Student.length > 0) {
            console.log("Test Students Create Sukses");
        } else {
            console.log("TEst Stduents Create Gagal");
        }
    })
}

testStudentCreate()
