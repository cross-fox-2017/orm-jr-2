"use strict"

import DBModel from "./db_model.js";

class Student {
  constructor(firstname, lastname, cohort_id, id) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.cohort_id = cohort_id;
  }

  static create(db, student) {
    let add = `INSERT INTO students (firstname, lastname, cohort_id) VALUES ('${student.firstname}', '${student.lastname}', '${student.cohort_id}');`;
    db.serialize(function () {
      db.run(add, function (err) {
        if (err) {
          console.log(err);
        }
        else {
          console.log(add);
        }
      });
    });
  }

  static update (db, student) {
    let update = `UPDATE students SET firstname = '${student.firstname}', lastname = '${student.lastname}', cohort_id = '${student.cohort_id}' WHERE id = ${student.id};`;
    db.serialize(function () {
      db.run(update, function (err) {
        if (err) {
          console.log(err);
        }
        else {
          console.log(update);
        }
      });
    });
  }

  static delete (db, id) {
    let deleteData = `DELETE FROM students WHERE id = ${id};`;
    db.serialize(function () {
      db.run(deleteData, function (err) {
        if (err) {
          console.log(err);
        }
        else {
          console.log(deleteData);
        }
      });
    });
  }

  static findByID (db, id) {
    let show = `SELECT * FROM students WHERE id = ${id};`;
    db.serialize(function () {
      db.each(show, function (err, row) {
        if (err) {
          console.log(err);
        }
        else {
          console.log(row);
        }
      });
    });
  }

  static findAll (db, option = {limit: 100, offset: 0}, callback) {
    let show = `SELECT students.*, cohorts.name FROM students LEFT JOIN cohorts ON students.cohort_id = cohorts.id LIMIT ${option.limit} OFFSET ${option.offset}`;
    // var = 0 itu offset, i < data.length itu limitnya
    db.serialize(function () {
      db.all(show, function (err, row) {
        if (err) {
          callback(null,err);
        }
        else {
          callback(row); // penulisannya function (data,err) jadi -> callback(row)
        }
      });
    });
  }

  static findOrCreate(db, student) {
    let check = `SELECT * FROM students WHERE firstname = '${student.firstname}' AND lastname = '${student.lastname}' AND cohort_id = '${student.cohort_id}'`;
    let add = `INSERT INTO students (firstname, lastname, cohort_id) VALUES ('${student.firstname}', '${student.lastname}', '${student.cohort_id}');`;
    db.serialize(function () {
      db.all(check, function (err, data) {
        if(!err && data.length > 0) { // TODO belajar lagi
          console.log('Data already exist.');
        }
        else {
          db.serialize(function () {
            db.run(add, function (err, data) {
              if (err) {
                console.log(err);
              }
              else {
                console.log(add);
              }
            });
          });
        }
      });
    });
  }

  static where (db, value, callback) {
    let show = `SELECT * FROM students WHERE ${value};`;
    db.serialize(function () {
      db.all(show, function (err, row) {
        if (err) {
          callback(null,err);
        }
        else {
          callback(row);
        }
      });
    });
  }

  static help () {
    let show = `create(db, student)\nupdate(db, student)\ndelete(db, id)\nfindByID(db, id)\nfindAll (db, option = {limit: 100, offset: 0}, callback)\nwhere(db, value, callback) <value: "attribute = 'value' >"\nhelp()`;
    console.log(show);
  }
}

export default Student


/*
Student.findAll(dbModel.connection, {limit: 2, offset: 0}, function (data, err) {
  if (!err) {
    for (var i = 0; i < data.length; i++) {
      console.log(data[i]);
    }
  }
  else {
      console.log('Error');
  }
})

Student.findOrCreate(dbModel.connection, new Student("Fadly","Kayo",1))
Student.delete(dbModel.connection, 4)
*/
