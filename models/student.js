"use strict"
const sqlite = require("sqlite3").verbose();


class Student {
  constructor(firstname, lastname, telepon, cohort_id, id){
    this.firstname  = firstname;
    this.lastname   = lastname;
    this.telepon    = telepon;
    this.cohort_id  = cohort_id;
    this.id         = id;
  }
  // Student.create(dbModel.connection, new Student("yomi","sofwan",089694026806,1))
  static create(db, dataStudent){
    let insertStudent   = `INSERT INTO students(firstname, lastname, telepon, cohort_id) VALUES ('${dataStudent.firstname}','${dataStudent.lastname}',${dataStudent.telepon},${dataStudent.cohort_id});`
    db.serialize(function(){
      db.run(insertStudent, function(err){
        if(err){console.log(err);
        }else{console.log("SEED INSERT SUCCSESS!!")
        }
      });
    });
  }
  // Student.update(dbModel.connection, new Student("firstname","lastname",telepon,cohort_id))
  static update(db, dataStudent){
    let updateStudent  = `UPDATE students SET firstname = '${dataStudent.firstname}', lastname = '${dataStudent.lastname}', telepon = '${dataStudent.telepon}', cohort_id = '${dataStudent.cohort_id}' WHERE id = '${dataStudent.id}';`
    db.serialize(function(){
      db.run(updateStudent, function(err){
        if (err) {console.log(err);
        }else{console.log("SEED UPDATE SUCCSESS!!")}
      });
    });
  }
  // Student.delete(dbModel.connection, id)
  static delete (db, id){
    let deleteStudent  = `DELETE FROM students WHERE id = ${id};`
    console.log(deleteStudent);
    db.serialize(function(){
      db.run(deleteStudent, function(err){
        if (err) {console.log(err);
        }else{console.log(`SEED DELETE SUCCSESS!! ${id}`)}
      });
    });
  }

  // Student.findAll(dbModel.connection, function(err, data){
  //   if(!err){
  //     for(var i = 0; i < data.length; i++){
  //       console.log(data[i])
  //     }
  //   }else{
  //     console.log(err)
  //   }
  // })

  static findAll(db, callBack){
    let viewStudent = "SELECT * FROM students";
    db.serialize(function(){
      db.all(viewStudent, callBack)
    });
  }

  //Student.findById(dbModel.connection, id)
  static findById(connection, id){
   let db = connection
  let find = `SELECT * FROM students WHERE id LIKE '${id}';`;
   db.serialize(function() {
     db.each(find, function (err,row) {
       if (err) {
         console.log(err);
       }
       else {
         console.log(row);
       }
     })
   })
 }

  // Student.where(dbModel.connection, "firstname = 'yomi'", function(err, data){
  //   if(!err){
  //     for(var i = 0; i < data.length; i++){
  //       console.log(data[i])
  //     }
  //   }else{
  //     console.log(err)
  //   }
  // })

  static where(db, val, callBack){
   let whereStudent = "SELECT * FROM students WHERE ";
   db.serialize(function(){
     db.all(whereStudent + val, callBack)
   });
  }
  // Student.findOrCreate(dbModel.connection, new Student("yoma","sofwan",089694026806,1))
  static findOrCreate(db, newData){
    let findCreate = "SELECT * FROM students WHERE firstname = ? AND lastname = ? AND telepon = ? AND cohort_id = ?";
    db.serialize(function(){
      db.all(findCreate, newData.firstname, newData.lastname, newData.telepon, newData.cohort_id, function(err, data){
        if(!err && data.length > 0){
          console.log("Student is already exists");
        }else {
          Student.create(db.newData)
        }
      })
    })
  }
}

export default Student
