"use strict"
const sqlite = require('sqlite3').verbose();
const fs = require('fs');

// let file = new DBModel('./db/student.db')



class DBModel {
  constructor(file){
    this.connection = new sqlite.Database(file)
  }
  setup(){
    let db = this.connection
    let CREATE_TABLE_STUDENTS = "CREATE TABLE IF NOT EXISTS students (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT NOT NULL, lastname TEXT NOT NULL, cohortId INTEGER)"
    let CREATE_TABLE_COHORTS = "CREATE TABLE IF NOT EXISTS cohorts (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL)"
    db.serialize(function() {
      db.run(CREATE_TABLE_STUDENTS, function(err) {
        if (err) {
          console.log(err);
        }else {
          console.log('Create Table Student Success');
        }
      })
    })
    db.serialize(function() {
      db.run(CREATE_TABLE_COHORTS, function (err) {
        if (err) {
          console.log(err);
        }else {
          console.log('Create Table Cohort Success');
        }
      })
    })
  }
}

export default DBModel
