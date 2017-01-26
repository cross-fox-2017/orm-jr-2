"use strict"

import Student from "./student.js";

class Cohort {
  constructor(name, id){
    this.name = name
    this.id = id
  }
  static createCohort(db, input){
    let CREATE_COHORT = `INSERT INTO cohorts(name) VALUES ('${input.name}')`
    db.serialize(function () {
      db.run(CREATE_COHORT, function (err) {
        if (err) {
          console.log(err);
        }else {
          console.log('Insert Cohort Success');
        }
      })
    })
  }
  static updateCohort(db, input, id){
    let UPDATE_COHORT = `UPDATE cohorts SET name = '${input.name}
    WHERE id = ${input.id}'`
    db.serialize(function () {
      db.run(UPDATE_COHORT, function (err) {
        if (err) {
          console.log(err);
        }else {
          console.log('Update Cohort Success');
        }
      })
    })
  }
  static deleteCohort(db,id){
    let DELETE_COHORT = `DELETE FROM cohorts WHERE id = ${id}`
    db.serialize(function () {
      db.run(DELETE_COHORT, function (err) {
        if (err) {
          console.log(err);
        }else {
          console.log('Delete Cohort Success');
        }
      })
    })
  }
  static findById(db, id){
    let FIND_COHORT_ID = `SELECT * FROM cohorts WHERE id = ?`
    db.serialize(function () {
      db.all(FIND_COHORT_ID, id, function (err, data) {
        if (err) {
          console.log(err);
        }else {
          console.log(data);
        }
      })
    })
  }
  static findAll(db){
    let find = function (err, data) {
      if (!err) {
        for (var i = 0; i < data.length; i++) {
          console.log(data[i])
        }
      }else {
        console.log('Error');
      }
    }
    db.serialize(function () {
      let FIND_ALL = `SELECT * FROM cohorts`
      db.all(FIND_ALL, find)
    })
  }
}

export default Cohort
