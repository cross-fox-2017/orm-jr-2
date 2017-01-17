"use strict"

import Student from "./student.js";

let ADD_DATA = "INSERT INTO cohorts (name) VALUES (?)"
let EDIT_DATA = "UPDATE cohorts SET name = ? WHERE id=?"
let DELETE_DATA = "DELETE FROM cohorts WHERE id=?"
let FIND_DATA = "SELECT * FROM cohorts WHERE id=?"
let FIND_ALL = "SELECT * FROM cohorts"
let WHERE = "SELECT * FROM cohorts WHERE "


class Cohort {
  constructor(name, id){
    this.name = name
    this.id = id
  }

  static create(connection, newCohort) {
    let db = connection;
    db.serialize(function() {
      db.run(ADD_DATA, newCohort.name, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log('ADD COHORT');
        }
      })
    })
  }

  static update(connection, newCohort) {
    let db = connection;
    db.serialize(function() {
      db.run(EDIT_DATA, newCohort.name, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log('EDIT COHORT');
        }
      })
    })
  }

  static delete(connection, id) {
    let db = connection;
    db.serialize(function() {
      db.run(DELETE_DATA, id, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log('DELETE COHORT');
        }
      })
    })
  }

  static findById(connection, id) {
    let db = connection;
    db.serialize(function() {
      db.each(FIND_DATA, id, function(err,row) {
        if (err) {
          console.log(err);
        } else {
          console.log(row);
        }
      })
    })
  }

  // Student.findAll(dbModel.connection, function(err,data) {
  //   if(!err) {
  //     for (var i = 0; i < data.length; i++) {
  //       console.log(data[i])
  //     }
  //   } else {
  //     console.log('Error')
  //   }
  // })

  static findAll(connection, cb) {
    let db = connection;
    db.serialize(function() {
      db.all(FIND_ALL, cb)
    })
  }

  // Student.where(dbModel.connection, "firstname = 'Windiana' ", function(err, data) {
  //   if(!err){
  //     for (var i = 0; i < data.length; i++) {
  //       console.log(data[i]);
  //     }
  //   } else{
  //     console.log(err);
  //   }
  // });

  static where(connection, val, cb) {
    let db = connection;
    db.serialize(function() {
      db.all(WHERE + val, cb)
    })
  }
}

export default Cohort
