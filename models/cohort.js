"use strict"

import Student from "./student.js";

class Cohort {
  constructor(name, id) {
    this.name = name
    this.id = id
  }

  static create (db, obj) {
    console.log(db,obj);
    let INSERT_DATA = `INSERT INTO cohort(name) VALUES('${obj.name}')`
    db.serialize(function() {
      db.run(INSERT_DATA, function(err) {
        if(err) {
          console.log(err)
        } else {
          console.log("Insert Cohort Success!")
        }
      })
    })
  }

  static update (db, obj) {
    let UPDATE_DATA = `UPDATE cohort SET name = '${obj.name}' WHERE id = ${obj.id}`
    db.serialize(function() {
      db.run(UPDATE_DATA, function(err) {
        if(err) {
          console.log(err)
        } else {
          console.log(`Update Cohort Success!`)
        }
      })
    })
  }

  static delete (db, id) {
    let DELETE_DATA = `DELETE FROM cohort WHERE id = ${id}`
    db.serialize(function() {
      db.run(DELETE_DATA, function(err) {
        if(err) {
          console.log(err)
        } else {
          console.log(`Delete Cohort Success!`);
        }
      })
    })
  }

  static showAll (db) {
    let SELECT_ALL = `SELECT * FROM cohort`
    db.serialize(function() {
      db.each(SELECT_ALL, function(err, rows) {
        if(err) {
          console.log(err)
        } else {
          console.log(rows);
        }
      })
    })
  }

}

// Cohort.create(dbModel.connection, new Cohort("Blanford Fox 2016"))
// Cohort.update(dbModel.connection, new Cohort("Cross Fox 2016", 1))
// Cohort.delete(dbModel.connection, 1)
// Cohort.showAll(dbModel.connection)

export default Cohort
