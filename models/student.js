"use strict"

class Student {
  constructor(firstname, lastname, cohort_id, id){
    this.firstname = firstname;
    this.lastname = lastname;
    this.cohort_id = cohort_id;
    this.id = id
  }
  static create(connection, student){
    let CREATE = "INSERT INTO students (firstname, lastname, cohort_id) VALUES (?, ?, ?)"
    connection.serialize(function(){
      connection.run(CREATE, student.firstname, student.lastname, student.cohort_id, function (err){
        if (!err){
          console.log('student created');
        } else {
          console.log(err);
        }
      })
    })
  }
  static update(connection, student){
    let UPDATE = "UPDATE students SET firstname= ?, lastname = ?, cohort_id = ? WHERE id = ?;"
    connection.serialize(function(){
      connection.run(UPDATE, student.firstname, student.lastname, student.cohort_id, student.id, function (err){
        if (!err){
          console.log(`student id ${student.id} updated`);
        } else {
          console.log(err);
        }
      })
    })
  }
  static delete(connection, id){
    let DELETE = "DELETE FROM students WHERE id = ?"
    connection.serialize(function(){
      connection.run(DELETE, id, function (err){
        if (!err){
          console.log(`student id ${id} deleted`);
        } else {
          console.log(err);
        }
      })
    })
  }
  static findById(connection, id){
    let FINDBYID = "SELECT * FROM students WHERE id = ?"
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
  static findAll(connection, param={limit:100,offset:0}){
    let FINDALL = "SELECT * FROM students LIMIT ? OFFSET ?"
    let that = this
    connection.serialize(function(){
      connection.all(FINDALL, param.limit, param.offset, that.cb)
    })
  }
  static where(connection, param, cb){
    let WHERE = `SELECT * FROM students WHERE ${param}`
    connection.serialize(function(){
      connection.all(WHERE, cb)
    })
  }
  static findOrCreate(connection, student){
    let CEK = `SELECT * FROM students WHERE firstname = '${student.firstname}' AND lastname = '${student.lastname}' AND cohort_id = '${student.cohort_id}'`
    let CREATE = "INSERT INTO students (firstname, lastname, cohort_id) VALUES (?, ?, ?)"
    connection.serialize(function(){
      connection.all(CEK, function(err, data){
        if (!err && data.length == 0){
          connection.run(CREATE, student.firstname, student.lastname, student.cohort_id, function (err){
            if (!err){
              console.log('student created');
            } else {
              console.log(err);
            }
          })
        } else if(!err){
          console.log(data);
        } else {
          console.log(err);
        }
      })
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
  static tes(log){
    console.log(log.limit);
  }
}

export default Student
