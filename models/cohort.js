"use strict"

import Student from "./student.js";

class Cohort {
  constructor(name, id) {
    this.name = name
    this.id = id
  }

  static add (db, obj) {
    var QUERY_ADD = `INSERT INTO cohorts (name) VALUES ('${obj.name}')`;
      db.run(QUERY_ADD, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log("COHORTS added");
        }
      });
  }

  static delete (db, id) {
    var QUERY_DELETE = `DELETE FROM cohorts WHERE id = ${id}`;
      db.run(QUERY_DELETE, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log("COHORTS delete");
        }
      });
  }

  static change (db, name ,id) {
    var QUERY_CHANGE = `UPDATE cohorts SET name = '${name}' WHERE id = '${id}'`;
      db.run(QUERY_CHANGE, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log("COHORTS changed");
        }
      });
  }

  static show (db) {
    var QUERY_SHOW = `SELECT * FROM cohorts`;
    db.each(QUERY_SHOW, function(err, row) {
      if (err) {
        console.log(err);
      } else {
        console.log(row);
      }
    });
  }

  static findAll (db, callback) {
    db.all("SELECT * FROM cohorts;", function(err, rows) {
      callback(rows, err)
    })
  }

  static where (db, str, callback) {
    db.all(`SELECT * FROM cohorts WHERE ${str} ;`, function(err, rows) {
      callback(rows, err)
    })
  }

  static findId(db, id) {
    var QUERY_SHOW = `SELECT * FROM cohorts where id = '${id}'`;
    db.each(QUERY_SHOW, function(err, row) {
      if (err) {
        console.log(err);
      } else {
        console.log(row);
      }
    });
  }

  static findAll (db, obj, callback) {
    var QUERY_FINDALL = `SELECT * FROM cohorts LIMIT ${obj.limit} OFFSET ${obj.offset}`;
    console.log(QUERY_FINDALL);
    db.all(QUERY_FINDALL, function(err, rows) {
      callback(rows, err)
    })
  }

  static findOrCreate(db, obj) {
    var QUERY_INSERT = `INSERT INTO cohorts (name) VALUES ('${obj.first_name}' )`;
    var QUERY_CHECK = `SELECT * FROM cohorts WHERE name = '${obj.first_name}' `;

    db.all(QUERY_CHECK, function(err, row) {
      console.log(row);
      if (row.length) {
        console.log("data already exists");
      } else {
        db.run(QUERY_INSERT, function(err) {
          if (err) {
            console.log(err);
          } else {
            console.log("COHORT added");
          }
        });
      }
    });
  }
}

export default Cohort
