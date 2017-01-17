"use strict"

import Student from "./student.js";

class Cohort {
  constructor(name,id) {
    this.name = name
    this.id = id
  }

  static create(connection, input){
    let db = connection
    let add = `INSERT INTO cohorts (name) VALUES ('${input.name}');`
    db.serialize(function() {
      db.run(add, function (err) {
        if (err) {
          console.log(err);
        }
        else {
          console.log('new cohort has been created');
        }
      })
    })
 }

 static update(connection, input){
   let db = connection
   let update = `UPDATE cohorts SET name = '${input.name}' WHERE id = '${input.id}';`
   db.serialize(function() {
     db.run(update, function (err) {
       if (err) {
         console.log(err);
       }
       else {
         console.log('cohort has been updated');
       }
     })
   })
 }

 static delete(connection, input){
   let db = connection
   let remove =`DELETE FROM cohorts WHERE id = '${input}';`;
   db.serialize(function() {
     db.run(remove, function (err) {
       if (err) {
         console.log(err);
       }
       else {
         console.log('cohort has been removed');
       }
     })
   })
 }

 static findById(connection, id){
   let db = connection
  let find = `SELECT * FROM cohorts WHERE id LIKE '${id}';`;
   db.serialize(function() {
     db.each(find, function (err,row) {
       if (err) {
         console.log(err);
       }
       else {
         console.log(`cohort found : \n\nID : ${row.id}\nName : ${row.name}\n`);
       }
     })
   })
 }

 static findAll(connection, val, cb) {
    let db = connection;
    let find_all = "SELECT * FROM cohorts LIMIT ? OFFSET ?"
    db.serialize(function() {
      db.all(find_all,val.limit, val.offset, cb)
    })
  }

 static where(connection, val, cb){
   let db = connection
   let where = `SELECT * FROM cohorts WHERE `
   db.serialize(function() {
     db.all(where + val, cb)
     console.log(where);
   })
 }

 static findOrCreate(connection, newCohort) {
  let db = connection;
  let findCreate = "SELECT * FROM cohorts WHERE name=?"
  db.serialize(function() {
    db.all(findCreate, newCohort.firstname, newCohort.lastname, newCohort.cohort_id, function(err, data) {
      if (!err && data.length > 0) {
        console.log('Student found');
      } else {
        Cohort.create(db, newCohort)
      }
    })
  })
}

}

export default Cohort
