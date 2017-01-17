"use strict"

const sqlite = require('sqlite3').verbose()

class DBModel {
  constructor(file) {
    this.file = file || './db/student.db'
    this.connection = new sqlite.Database(this.file)
  }

  setup() {
    var db = this.connection

    var create_table_students = "CREATE TABLE IF NOT EXISTS students ( id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT NOT NULL, lastname TEXT, cohort_id INTEGER, FOREIGN KEY (cohort_id) REFERENCES cohorts(id));"
    var create_table_cohorts = "CREATE TABLE IF NOT EXISTS cohorts ( id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL);"

    db.serialize(function() {
      db.run(create_table_students, function (err) {
        if (err) {
          console.log(err);
        }
        else {
          console.log('TABLE student has been created');
        }
      })
    })

    db.serialize(function() {
      db.run(create_table_cohorts, function (err) {
        if (err) {
          console.log(err);
        }
        else {
          console.log('TABLE cohort has been created');
        }
      })
    })
  }


}

export default DBModel
