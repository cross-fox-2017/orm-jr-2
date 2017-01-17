"use strict"

import Student from "./student.js";

class Cohort {
  constructor(name){
    this.name = name;
  }
  static create(connection, cohort){
    let CREATE = `INSERT INTO cohorts (name) VALUES (?)`
    connection.serialize(function(){
      connection.run(CREATE, cohort.name, function (err){
        if (!err){
          console.log('cohort created');
        } else {
          console.log(err);
        }
      })
    })
  }
  static update(connection, cohort){
    let UPDATE = "UPDATE cohorts SET name= ? WHERE id = ?;"
    connection.serialize(function(){
      connection.run(UPDATE, cohort.name, function (err){
        if (!err){
          console.log(`cohort updated`);
        } else {
          console.log(err);
        }
      })
    })
  }
  static delete(connection, id){
    let DELETE = "DELETE FROM cohorts WHERE id = ?"
    connection.serialize(function(){
      connection.run(DELETE, id, function (err){
        if (!err){
          console.log(`cohort id ${id} deleted`);
        } else {
          console.log(err);
        }
      })
    })
  }
  static findById(connection, id){
    let FINDBYID = "SELECT * FROM cohorts WHERE id = ?"
    connection.serialize(function(){
      connection.each(FINDBYID, id, function (err, rows){
        if (!err){
          console.log(rows);
        } else {
          console.log(err);
        }
      })
    })
  }
  static findAll(connection, cb){
    let FINDALL = "SELECT * FROM cohorts"
    connection.serialize(function(){
      connection.all(FINDALL, cb)
    })
  }
  static where(connection, cohort, cb){
    let WHERE = `SELECT * FROM cohorts WHERE ${param}`
    connection.serialize(function(){
      connection.all(WHERE, cb)
    })
  }
  static cb(err, data){
    if(!err){
      for (let i = 0; i < data.length; i++){
        console.log(data[i]);
      }
    } else {
      console.log(err);
    }
  }
}

export default Cohort
