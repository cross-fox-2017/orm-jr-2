"use strict"

//Student.create(dbModel.connection, new Student ("fadly", "kayo", "1"))

const fs = require("fs");
const sqlite = require('sqlite3').verbose();

// CREATE_TABLE
let CREATE_TABLE_STUDENTS = "CREATE TABLE IF NOT EXISTS students (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT NOT NULL, lastname TEXT, cohort_id INT NOT NULL, FOREIGN KEY(cohort_id) REFERENCES cohorts(id))";
let CREATE_TABLE_COHORTS = "CREATE TABLE IF NOT EXISTS cohorts (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL)";

class DBModel {
  constructor(file) {
    this.connection = new sqlite.Database(file)
  }

  setup() {
    let db = this.connection;
    let createStudent = () => {
      db.serialize(function () {
        db.run(CREATE_TABLE_STUDENTS, function (err) {
          if (err) {
            console.log(err);
          }
          else {
            console.log ("Create table contacts");
          }
        });
      });
    }

    let createCohort = () => {
      db.serialize(function () {
        db.run(CREATE_TABLE_COHORTS, function (err) {
          if (err) {
            console.log(err);
          }
          else {
            console.log ("Create table cohorts");
          }
        });
      });
    }
    createStudent();
    createCohort();
  }
}

export default DBModel
