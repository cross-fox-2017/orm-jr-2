"use strict"

import Student from "./student.js";

class Cohort {
  constructor(cohortname, id) {
    this.cohortname = cohortname,
    this.id = id
  }

  static create(connection, data){
    let CREATE_COHORT = `INSERT INTO cohorts (cohortname) VALUES ('${data.cohortname}');`

    connection.serialize(function() {
        connection.run(CREATE_COHORT, function(err) {
          if(err) {
              console.log(err)
          } else {
            console.log('.:: SUCCESS CREATE DATA COHORT ::.')
          }
      })
    })
  }

  static update(connection, data){
    let UPDATE_COHORT = `UPDATE cohorts SET cohortname = '${data.cohortname}';`

    connection.serialize(function() {
        connection.run(UPDATE_COHORT, function(err) {
          if(err) {
              console.log(err)
          } else {
            console.log('.:: SUCCESS UPDATE DATA COHORT ::.')
          }
      })
    })
  }

  static delete(connection, id){
    let DELETE_COHORT = `DELETE FROM cohorts WHERE id = ${id};`

    connection.serialize(function() {
        connection.run(DELETE_COHORT, function(err) {
          if(err) {
              console.log(err)
          } else {
            console.log('.:: SUCCESS DELETE DATA COHORT ::.')
          }
      })
    })
  }

  static findById(connection, id){
    let FIND_ID_COHORT = `SELECT * FROM cohorts WHERE id = ${id};`

    connection.serialize(function() {
      connection.all(FIND_ID_COHORT, function(err, rows) {
        if(err) {
          console.log(err)
        } else {
          console.log(`TABLE COHORT\n_________________\n`)
          console.log("ID|\t\tName Cohort")
            for(let i = 0;i < rows.length;i++){
              console.log(rows[i].id+"\t\t"+rows[i].cohortname)
            }
        }
      })
    })
  }

  static findAll(connection){
    let FIND_ALL_COHORT = `SELECT * FROM cohorts;`

    connection.serialize(function() {
      connection.each(FIND_ALL_COHORT, function(err, rows) {
        if(err) {
          console.log(err)
        } else {
          console.log(`TABLE COHORT\n_________________\n`)
          console.log("ID|\t\tName Cohort")
            for(let i = 0;i < rows.length;i++){
              console.log(rows[i].id+"\t\t"+rows[i].cohortname)
            }
          }
      })
    })
  }
}
export default Cohort

// Cohort.create(dbModel.connection, new Cohort("Cross Fox"))
// Cohort.create(dbModel.connection, new Cohort("Bland Fox"))
// Cohort.update(dbModel.connection, new Cohort("Cross Fox 2016", 1))
// Cohort.delete(dbModel.connection, 2)
// Cohort.findById(dbModel.connection, 1)
