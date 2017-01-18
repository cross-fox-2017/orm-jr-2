"use strict"

import Student from "./student.js";

class Cohort {
  constructor(name, id) {
    this.id = id;
    this.name = name;
  }

  static create(db, cohort) {
    let add = `INSERT INTO cohorts (name) VALUES ('${cohort.name}');`;
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

  static update (db, cohort) {
    let update = `UPDATE cohorts SET name = '${cohort.name}';`;
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
    let deleteData = `DELETE FROM cohorts WHERE id = ${id};`;
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
    let show = `SELECT * FROM cohorts WHERE id = ${id};`;
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
    let show = `SELECT cohorts.*, students.firstname, students.lastname, students.cohort_id FROM cohorts LEFT JOIN students ON students.cohort_id = cohorts.id LIMIT ${option.limit} OFFSET ${option.offset}`;
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

  static findOrCreate(db, cohorts) {
    let check = `SELECT * FROM cohorts WHERE name = '${cohorts.name}'`;
    let add = `INSERT INTO cohorts (name) VALUES ('${cohort.name}');`;
    db.serialize(function () {
      db.all(check, function (err, data) {
        if(!err && data.length > 0) {
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
    let show = `SELECT * FROM cohorts WHERE ${value};`;
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
    let show = `create(db, cohort)\nupdate(db, cohort)\ndelete(db, id)\nfindByID(db, id)\nfindAll(db, callback)\nwhere(db, value, callback) <value: "attribute = 'value' >"\nhelp()`;
    console.log(show);
  }

}

export default Cohort
