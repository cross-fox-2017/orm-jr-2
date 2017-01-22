"use strict"

const fs = require('fs')
const sqlite = require('sqlite3').verbose()

let CREATE_TABLE_STUDENT = "CREATE TABLE IF NOT EXISTS students (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT NOT NULL, lastname TEXT, cohort_id INTEGER);"
let CREATE_TABLE_COHORT = "CREATE TABLE IF NOT EXISTS cohorts (id INTEGER PRIMARY KEY AUTOINCREMENT, cohortname TEXT NOT NULL);"

class DBModel {
  constructor(file) {
    this.connection = new sqlite.Database(file)
  }

  setup() {
    let db = this.connection
    let createStudent = () => {
      db.serialize(function(){
        db.run(CREATE_TABLE_STUDENT, function(err) {
          if(err) {
            console.log(err);
          } else {
            console.log('CREATE TABLE STUDENT: SUCCESS!');
          }
        });
      });
    }

    let createCohort = () => {
      db.serialize(function(){
        db.run(CREATE_TABLE_COHORT, function(err) {
          if(err) {
              console.log(err);
            } else {
              console.log('CREATE TABLE COHORT: SUCCESS!');
            }
        });
      });
    }
    createStudent()
    createCohort()
  }
}

export default DBModel
