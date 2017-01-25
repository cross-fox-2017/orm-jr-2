"use strict"
const sqlite = require('sqlite3').verbose();

class DBModel {
  constructor(file){
    this.connection = new sqlite.Database(file);


  }

  setup(){
    var CREATE_COHORTS   = "CREATE TABLE IF NOT EXISTS cohorts ( id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL);";
    var CREATE_STUDENTS = "CREATE TABLE IF NOT EXISTS students ( id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT NOT NULL, lastname TEXT NOT NULL, cohort_id INTEGER NOT NULL, FOREIGN KEY (cohort_id) REFERENCES cohorts(id));"
    let db = this.connection;
    db.serialize(function() {
      db.run(CREATE_COHORTS,function(err) {
        if(err) {
          console.log(err);
        } else {
          console.log('CREATE_TABLE_COHORTS');
        }
      });
    });

    db.serialize(function() {
      db.run(CREATE_STUDENTS,function(err) {
        if(err) {
          console.log(err);
        } else {
          console.log('CREATE_TABLE_STUDENTS');
        }
      });
    });
  }

  }


export default DBModel
