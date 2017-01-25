"use strict"

class Student {
  constructor(firstname,lastname,cohort_id,id){
    this.firstname = firstname;
    this.lastname  = lastname;
    this.cohort_id = cohort_id;
    this.id        = id;
  }

  static create(db, data){

    let CREATE = "INSERT INTO students (firstname, lastname, cohort_id) VALUES ($firstname,$lastname,$cohort_id);";
      db.serialize(function() {
        db.run(CREATE,{
          $firstname: data.firstname,
          $lastname: data.lastname,
          $cohort_id: data.cohort_id
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

    let UPDATE_TABLE = "UPDATE students SET firstname=$firstname, lastname=$lastname, cohort_id=$cohort_id WHERE id=$id;";
      db.serialize(function() {
        db.run(UPDATE_TABLE,{
          $firstname: data.firstname,
          $lastname: data.lastname,
          $cohort_id: data.cohort_id,
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

    let DELETE_TABLE = "DELETE FROM students WHERE id=$id;";
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
    let FIND_TABLE = "SELECT * FROM students WHERE id=$id;";
      db.serialize(function() {
        db.each(FIND_TABLE,{
          $id: id
        }, function(err,row) {
          if(err) {
            console.log(err);
          } else {
            console.log(`${row.id}|${row.firstname}|${row.lastname}|${row.cohort_id}`);
          }
        });
      });
  }
  static findAll(db,obj,callback){
    let SHOW_TABLE = `SELECT * FROM students LIMIT ${obj.limit} OFFSET ${obj.offset};`;
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
    let WHERE_TABLE = `SELECT * FROM students WHERE ${attribute};`;
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
    let LIMIT_TABLE = `SELECT * FROM students LIMIT ${data.limit} OFFSET ${data.offset};`;
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
    let FIND   = "SELECT * FROM students WHERE firstname=$firstname AND lastname=$lastname AND cohort_id=$cohort_id; "

      db.serialize(function() {
        db.all(FIND,{
          $firstname: data.firstname,
          $lastname: data.lastname,
          $cohort_id: data.cohort_id
        }, function(err,row) {
          if(!err && row.length > 0) {
            console.log('DATA IS AVAILABEL');
          } else {
            Student.create(db, data)
          }
        });
      });
  }

}

export default Student
