"use strict"
const sqlite = require('sqlite3').verbose();
const faker = require('faker')

var CREATE_TABLE_STUDENTS = "CREATE TABLE IF NOT EXISTS students (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT NOT NULL, lastname TEXT, cohort_id INTEGER);";
var CREATE_TABLE_COHORTS = "CREATE TABLE IF NOT EXISTS cohorts (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL);";

class DBModel {
  constructor(file){
    this.connection = new sqlite.Database(file)
  }
  setup() {
    let connection = this.connection;
    this.connection.serialize(function() {
      connection.run(CREATE_TABLE_STUDENTS, function(err){
        if (err){
          console.log(err);
        } else {
          console.log('Create Table Students');
        }
      })
      connection.run(CREATE_TABLE_COHORTS, function(err){
        if (err){
          console.log(err);
        } else {
          console.log('Create Table Cohorts');
        }
      })
    })
  }
  seedFaker(number){
    let connection = this.connection;
    for (let i = 0; i <number; i++){
      let SEED = `INSERT INTO students (firstname, lastname, cohort_id) VALUES (?, ?, ?)`
      this.connection.serialize(function(){
        connection.run(SEED, faker.name.firstName(), faker.name.lastName(), Math.floor(Math.random()*10), function(err){
          if (err){console.log(err);
          } else {console.log(`${i} data seeded`);}
        })
      })
    }
  }
}

export default DBModel
