"use strict"

class Student {
  constructor(firstname, lastname, cohortId, id) {
    this.firstname = firstname
    this.lastname = lastname
    this.cohortId = cohortId
    this.id = id
  }

  static create (db, obj) {
    let INSERT_DATA = `INSERT INTO student(firstname,lastname, cohort_id) VALUES('${obj.firstname}', '${obj.lastname}', '${obj.cohortId}')`
    db.serialize(function() {
      db.run(INSERT_DATA, function(err) {
        if(err) {
          console.log(err)
        } else {
          console.log("Insert Student Success!")
        }
      })
    })
  }

  static update (db, obj) {
    let UPDATE_DATA = `UPDATE student SET firstname = '${obj.firstname}', lastname = '${obj.lastname}', cohort_id = '${obj.cohortId}' WHERE id = ${obj.id}`
    db.serialize(function() {
      db.run(UPDATE_DATA, function(err) {
        if(err) {
          console.log(err)
        } else {
          console.log(`Update Student Success!`)
        }
      })
    })
  }

  static delete (db, id) {
    let DELETE_DATA = `DELETE FROM student WHERE id = ${id}`
    db.serialize(function() {
      db.run(DELETE_DATA, function(err) {
        if(err) {
          console.log(err)
        } else {
          console.log(`Delete Student Success!`);
        }
      })
    })
  }

  static findById (db, id) {
    let SELECT_DATA = `SELECT * FROM student WHERE id = ${id}`
    db.serialize(function() {
      db.each(SELECT_DATA, function(err, row) {
        if(err) {
          console.log(err)
        } else {
          console.log(row)
        }
      })
    })
  }

  static findAll(db, obj, cb){
    let tmp = obj;
    let SELECT_ALL = `SELECT * FROM student LIMIT ${tmp.limit} OFFSET ${tmp.offset}`
    db.serialize(function() {
      db.all(SELECT_ALL, function(err, rows) {
        if(err) {
          cb(null, err)
        } else {
          cb(rows);
        }
      })
    })
  }

  static where(db, firstname, cb){
    let SELECT_ALL = `SELECT * FROM student WHERE ${firstname}`
    db.serialize(function() {
      db.all(SELECT_ALL, function(err, rows) {
        if(err) {
          cb(null, err)
        } else {
          cb(rows);
        }
      })
    })
  }

  static findOrCreate(db, obj){
    let FIND_CREATE = `INSERT OR IGNORE INTO student(firstname, lastname, cohort_id) VALUES('${obj.firstname}', '${obj.lastname}', '${obj.cohortId}')`
    db.serialize(function() {
      db.run(FIND_CREATE, function(err) {
        if(err) {
          console.log(err)
        } else {
          console.log("Find OR Create Student Success!")
        }
      })
    })
  }

}

// Student.create(dbModel.connection, new Student("Ida Bagus", "Chahya Dhegana", 1))
// Student.update(dbModel.connection, new Student("Rubi", "Henjaya", 2, 1))
// Student.delete(dbModel.connection, 1)
// Student.findById(dbModel.connection, 1)

/*
  Student.findAll(dbModel.connection, {limit: 6, offset: 0}, function(data, err){
    if(!err){
      for(let i = 0; i < data.length; i++) {
        console.log(data[i]);
      }
    } else {
      console.log("Error")
    }
  });

  Student.findOrCreate(dbModel.connection, new Student("Windi","Krismanuyar", 1))

  Student.where(dbModel.connection, "firstname = 'Windi'", function(data, err){
    if(!err){
      for (let i = 0; i < data.length; i++) {
        console.log(data[i]);
      }
    } else {
      console.log("Error")
    }
  });
*/

export default Student
