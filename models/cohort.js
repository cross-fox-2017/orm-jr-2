"use strict"

import Student from "./student.js";

class Cohort {
  constructor(name,id){
    this.name = name;
    this.id   = id;
  }

  static create(db, data){

    let CREATE = "INSERT INTO cohorts (name, id) VALUES ($name, $id);";
      db.serialize(function() {
        db.run(CREATE,{
          $name: data.name,
          $id: data.id
        }, function(err) {
          if(err) {
            console.log(err);
          } else {
            console.log('CREATED');
          }
        });
      });
  }
  static update(db, data){

    let UPDATE_TABLE = "UPDATE cohorts SET name=$name WHERE id=$id;";
      db.serialize(function() {
        db.run(UPDATE_TABLE,{
          $name: data.name,
          $id: data.id
        }, function(err) {
          if(err) {
            console.log(err);
          } else {
            console.log('UPDATED');
          }
        });
      });
  }
  static delete(db,id){

    let DELETE_TABLE = "DELETE FROM cohorts WHERE id=$id;";
      db.serialize(function() {
        db.run(DELETE_TABLE,{
          $id: id
        }, function(err) {
          if(err) {
            console.log(err);
          } else {
            console.log('DELETED');
          }
        });
      });
  }
  static findById(db, id){
    let FIND_TABLE = "SELECT * FROM cohorts WHERE id=$id;";
      db.serialize(function() {
        db.each(FIND_TABLE,{
          $id: id
        }, function(err,row) {
          if(err) {
            console.log(err);
          } else {
            console.log(`${row.id}|${row.name}`);
          }
        });
      });
  }

  static findAll(db,obj,callback){
    let SHOW_TABLE = `SELECT * FROM cohorts LIMIT ${obj.limit} OFFSET ${obj.offset};`;
      db.serialize(function() {
        db.all(SHOW_TABLE, function(err,row) {
          if(err) {
            callback(null, err)
          } else {
            callback(row,null)
          }
        });
      });
  }
  static where(db,attribute,callback){
    let WHERE_TABLE = `SELECT * FROM cohorts WHERE ${attribute};`;
      db.serialize(function() {
        db.all(WHERE_TABLE, function(err,row) {
          if(err) {
            callback(null, err)
          } else {
            callback(row,null)
          }
        });
      });
  }
  static findAllLimit(db,data,callback){
    let LIMIT_TABLE = `SELECT * FROM cohorts LIMIT ${data.limit} OFFSET ${data.offset};`;
      db.serialize(function() {
        db.all(LIMIT_TABLE, function(err,row) {
          if(err) {
            callback(null, err)
          } else {
            callback(row,null)
          }
        });
      });
  }

  static findOrCreate(db, data){
    let FIND   = `SELECT * FROM cohorts WHERE name = ${data.name}; `

      db.serialize(function() {
        db.all(FIND,{
          $name: data.name
        }, function(err,row) {
          if(!err && row.length > 0) {
            console.log('DATA IS AVAILABEL');
          } else {
            Cohort.create(db, data)
          }
        });
      });
  }



}

export default Cohort
