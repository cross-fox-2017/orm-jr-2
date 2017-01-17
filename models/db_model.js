"use strict"

const sqlite3 = require('sqlite3').verbose();
let CREATE_STUDENT = "CREATE TABLE student(id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT NOT NULL UNIQUE, lastname TEXT, cohort_id INTEGER, FOREIGN KEY(cohort_id) REFERENCES cohort(id))"
let CREATE_COHORT = "CREATE TABLE cohort(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL)"


class DBModel {
  constructor(file){
    this.connection = new sqlite3.Database(file);
  }

  setup(){
  let db = this.connection;
  let createStudent = () => {
    db.serialize(function() {
      db.run(CREATE_STUDENT, function(err) {
        if(err) {
          console.log(err)
        } else {
          console.log("Insert Data to Contact Success!")
        }
      })
    })
  }

  let createCohort = () => {
    db.serialize(function() {
      db.run(CREATE_COHORT, function(err) {
        if(err) {
          console.log(err)
        } else {
          console.log("Insert Data to Contact Success!")
        }
      })
    })
  }
  createStudent()
  createCohort()
  }
}

export default DBModel
