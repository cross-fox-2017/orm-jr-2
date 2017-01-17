"use strict"
const sqlite = require('sqlite3').verbose()

let CREATE_STUDENT = "CREATE TABLE IF NOT EXISTS students (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT NOT NULL, lastname TEXT,cohort_id INTEGER)"
let CREATE_COHORT = "CREATE TABLE IF NOT EXISTS cohorts (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL)"
let TABLE=[CREATE_STUDENT,CREATE_COHORT]
class DBModel {
  constructor(file){
    this.connection = new sqlite.Database(file)
  }
  setup(){
    let connection = this.connection
    connection.serialize(function(){
      for(var i=0;i<TABLE.length;i++){
      connection.run(TABLE[i],function(err){
        if(err){
          console.log(err);
        } else{
          console.log('TABLE CREATED');
        }
      })
    }
  })
  }
}


export default DBModel
