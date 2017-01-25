"use strict"
const sqlite = require('sqlite3').verbose();

class DBModel {
  constructor(file) {
    this.connection = new sqlite.Database(file);
  }

  setup() {
    var CREATE_STUDENTS = `CREATE TABLE IF NOT EXISTS students ( id INTEGER PRIMARY KEY AUTOINCREMENT, first_name TEXT NOT NULL, last_name TEXT NOT NULL, cohort_id INTEGER NOT NULL, FOREIGN KEY (cohort_id) REFERENCES cohorts(id))`;
    var CREATE_COHORTS = `CREATE TABLE IF NOT EXISTS cohorts (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL)`;
    let db = this.connection
    db.serialize(function() {
      db.run(CREATE_COHORTS, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log("COHORTS CREATED");
        }
      });
    });

    db.serialize(function() {
      db.run(CREATE_STUDENTS, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log("STUDENTS CREATED");
        }
      });
    });

  }

}

export default DBModel
