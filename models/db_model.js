"use strict"
const sqlite = require("sqlite3").verbose();
var CREATE_COHORTS  = "CREATE TABLE IF NOT EXISTS cohorts (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, year INTEGER);"
var CREATE_STUDENTS = "CREATE TABLE IF NOT EXISTS students (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT NOT NULL, lastname TEXT, telepon INTEGER, cohort_id INTEGER, FOREIGN KEY (cohort_id) REFERENCES cohorts (id));"

class DBModel {
  constructor(file){
    this.connection = new sqlite.Database(file)
  }

  setup(){
    var db = this.connection;
      db.serialize(function(){
        db.run(CREATE_STUDENTS, function(err){
          if(err){
            console.log(err);
          }else{
            console.log('create students success!!');
          }
        });
      });

      db.serialize(function(){
        db.run(CREATE_COHORTS, function(err){
          if(err){
            console.log(err);
          }else{
            console.log('create cohorts success!!');
          }
        });
      });
  }
}

export default DBModel
