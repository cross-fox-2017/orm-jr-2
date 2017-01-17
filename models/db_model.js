"use strict"
const sqlite = require('sqlite3').verbose();
let CREATE_TABLE_STUDENTS = "CREATE TABLE IF NOT EXISTS students (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT NOT NULL, lastname TEXT, cohort_id REFERENCES cohorts(id))";
let CREATE_TABLE_COHORTS = "CREATE TABLE IF NOT EXISTS cohorts (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL)";

class DBModel {
  constructor(file){
    this.connection = new sqlite.Database(file);
  }

  setup() {
    let db = this.connection;
    db.serialize(function() {
      db.run(CREATE_TABLE_STUDENTS, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log('CREATE TABLE STUDENTS');
        }
      })
    })
    db.serialize(function() {
      db.run(CREATE_TABLE_COHORTS, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log('CREATE TABLE COHORTS');
        }
      })
    })
  }

}

export default DBModel
