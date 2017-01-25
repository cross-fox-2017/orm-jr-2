"use strict"

class Student {
  constructor(first_name, last_name, cohort_id,  id) {
    this.fist_name = first_name;
    this.last_name = last_name;
    this.cohort_id = cohort_id;
    this.id = id
  }

  static add (db, obj) {
    var QUERY_ADD = `INSERT INTO students (first_name, last_name, cohort_id) VALUES ('${obj.fist_name}', '${obj.last_name}', '${obj.cohort_id}' )`;
      db.run(QUERY_ADD, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log("STUDENT added");
        }
      });
    // Student.add(dbModel.connection, new Student("irwin","pratajaya","3"))
  }

  static delete (db, id) {
    var QUERY_DELETE = `DELETE FROM students WHERE id = ${id}`;
      db.run(QUERY_DELETE, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log("STUDENT delete");
        }
      });
    // Student.delete(dbModel.connection, "1")
  }

  static change (db, first_name , last_name, cohort_id, id) {
    var QUERY_CHANGE = `UPDATE students SET first_name = '${first_name}', last_name = '${last_name}', cohort_id = '${cohort_id}'  WHERE id = '${id}'`;
      db.run(QUERY_CHANGE, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log("COHORTS changed");
        }
      });
    // Student.change(dbModel.connection, "irwin", "pratajaya", "3", "1")
  }

  static show (db) {
    var QUERY_SHOW = `SELECT * FROM students`;
    db.each(QUERY_SHOW, function(err, row) {
      if (err) {
        console.log(err);
      } else {
        console.log(row);
      }
    });
    // Student.show(dbModel.connection)
  }

  static findAll (db, callback) {
    db.all("SELECT * FROM students;", function(err, rows) {
      callback(rows, err)
    })
  /*
  Student.findAll(dbModel.connection,
  function(data,err) {
    if (!err) {
      for (var i = 0; i < data.length; i++) {
        console.log(data[i]);
      }
    } else {
      console.log("error");
    }
  })
   */
  }

  static where (db, str, callback) {
    db.all(`SELECT * FROM students WHERE ${str} ;`, function(err, rows) {
      callback(rows, err)
    })
    // Student.where(dbModel.connection, "first_name = 'irwin' ")
  }

  static findId(db, id) {
    var QUERY_SHOW = `SELECT * FROM students where id = '${id}'`;
    db.each(QUERY_SHOW, function(err, row) {
      if (err) {
        console.log(err);
      } else {
        console.log(row);
      }
    });
    // Student.findId(dbModel.connection, "3" )
  }

  static findOrCreate(db, obj) {
    var QUERY_INSERT = `INSERT INTO students (first_name, last_name, cohort_id) VALUES ('${obj.first_name}', '${obj.last_name}', '${obj.cohort_id}' )`;
    var QUERY_CHECK = `SELECT * FROM students WHERE first_name = '${obj.first_name}' AND last_name = '${obj.last_name}' `;

    db.all(QUERY_CHECK, function(err, row) {
      console.log(row);
      if (row.length) {
        console.log("data sudah ada coy");
      } else {
        db.run(QUERY_INSERT, function(err) {
          if (err) {
            console.log(err);
          } else {
            console.log("STUDENT added");
          }
        });
      }
    });
  }
  // Student.findOrCreate(dbModel.connection, new Student("irwin","pratajaya","3"))

  static help () {
    console.log(`
      Student.add => add data
        Student.add(dbModel.connection, new Student("irwin","pratajaya","3"))

      Student.delete => delete data
        Student.delete(dbModel.connection, "1")

      Student.change => change data
        Student.change(dbModel.connection, "irwin", "pratajaya", "3", "1")

      Student.show => show all data
        Student.show(dbModel.connection)`);
  }
}

export default Student
