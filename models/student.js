"use strict"

class Student {
  constructor(firstname, lastname, cohortId, id){
    this.firstname = firstname
    this.lastname = lastname
    this.cohortId = cohortId
    this.id = id
  }
  static createStudent(db, obj){
    let ADD_STUDENT = `INSERT INTO students (firstname, lastname, cohortId)
    VALUES ('${obj.firstname}', '${obj.lastname}', '${obj.cohortId}')`
    db.serialize(function () {
      db.run(ADD_STUDENT, function (err) {
        if (err) {
          console.log(err);
        }else {
          console.log('Add Student Success');
        }
      })
    })
  }
  static updateStudent(db, obj, id){
    let UPDATE_STUDENT = `UPDATE students SET firstname = '${obj.firstname}', lastname = '${obj.lastname}', cohortId = '${obj.cohortId}' WHERE id = ${obj.id}`
    // console.log(UPDATE_STUDENT);
    db.serialize(function () {
      db.run(UPDATE_STUDENT, function (err) {
        if (err) {
          console.log(err);
        }else {
          console.log('Update Student Success');
        }
      })
    })
  }
  static deleteStudent(db, id){
    let DELETE_STUDENT = "DELETE FROM students WHERE id = ?"
    // console.log(DELETE_STUDENT);
    db.serialize(function () {
      db.run(DELETE_STUDENT,id, function (err) {
        if (err) {
          console.log(err);
        }else {
          console.log(`has been deleted`);
        }
      })
    })
  }
  static findById(db, id){
    let FIND_ID = "SELECT * FROM students WHERE id = ?"
    console.log(FIND_ID);
    db.serialize(function () {
      db.all(FIND_ID,id, function (err, data) {
        if (err) {
          console.log(err);
        }else {
          console.log(data);
        }
      })
    })
  }
  static findAll(db, obj){
    let find = function (err, data) {
      if (!err) {
        for (var i = obj.offset; i < obj.limit; i++) {
          console.log(data[i]);
        }
      }else {
        console.log('Error');
      }
    }
    db.serialize(function() {
      let FIND_ALL = `SELECT * FROM students`;
        db.all(FIND_ALL, find)
     })
    //  return true
  }
  static where(db, field){
    let find = function (err, data) {
      if (!err) {
        for (var i = 0; i < data.length; i++) {
          console.log(data[i]);
        }
      }else {
        console.log('Error');
      }
    }
    db.serialize(function () {
      let WHERE_STUDENT = `SELECT * FROM students WHERE ${field}`
      db.all(WHERE_STUDENT, find)
    })
    // return true
  }
  static findOrCreate(connection, input) {
      connection.serialize(function() {
          let query = `SELECT * FROM students WHERE firstname='${input.firstname}' and lastname='${input.lastname}' and cohortId='${input.cohortId}'`;
          connection.all(query, function(err, data) {
              if (err) {
                  console.log(err);
              } else {
                  if (data.length > 0) {
                      console.log(data);
                  } else {
                      let queryInsert = `INSERT INTO students(firstname, lastname, cohortId) VALUES ('${input.firstname}','${input.lastname}','${input.cohortId}')`;
                      connection.run(queryInsert, function(err) {
                          if (err) {
                              console.log(err);
                          } else {
                              console.log("INSERT_DATA SUCCESS");
                          }
                      })
                  }
              }
          })
      })
      return true;
  }
  where(connection, field) {
      var search = function(err, data) {
          if (!err) {
              for (var i = 0; i < data.length; i++) {
                  console.log(data[i])
              }
          } else {
              console.log("Error");
          }
      }
      connection.serialize(function() {
          let query = `SELECT * from students where ${field}`;
          connection.all(query, search)
      })
      return true;
  }
}
export default Student
