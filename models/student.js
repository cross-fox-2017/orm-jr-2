"use strict"

class Student {
  constructor(first_name, last_name, cohort_id,  id) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.cohort_id = cohort_id;
    this.id = id
  }

  static add (db, obj) {
    var QUERY_ADD = `INSERT INTO students (first_name, last_name, cohort_id) VALUES ('${obj.first_name}', '${obj.last_name}', '${obj.cohort_id}' )`;
      db.run(QUERY_ADD, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log("STUDENT added");
        }
      });
    // Student.add(dbModel.connection, new Student("endy","santoso","8"))
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
    // Student.change(dbModel.connection, "ruth", "gunawan", "8", "2")
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
    // Student.where(dbModel.connection, "first_name = 'windy' ")
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

  static findAll (db, obj, callback) {
    var QUERY_FINDALL = `SELECT * FROM students LIMIT ${obj.limit} OFFSET ${obj.offset}`;
    console.log(QUERY_FINDALL);
    db.all(QUERY_FINDALL, function(err, rows) {
      callback(rows, err)
    })
    // Student.findAll(dbModel.connection, {limit: 2, offset: 1}, function(data, err) {
    //   if(!err) {
    //     for (var i = 0; i < data.length; i++) {
    //       console.log(data[i]);
    //     }
    //   } else {
    //     console.log("ERROR COY");
    //   }
    // });
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
  // Student.findOrCreate(dbModel.connection, new Student("kucing","wafer","2"))

  static help () {
    console.log(`
      Student.add => for adding data
        ex => Student.add(dbModel.connection, new Student("endy","santoso","8"))

      Student.delete => for delete data
        ex => Student.delete(dbModel.connection, "1")

      Student.change => for changing data
        ex => Student.change(dbModel.connection, "ruth", "gunawan", "8", "2")
        
      Student.show => for show all data
        ex => Student.show(dbModel.connection)`);
  }
}

export default Student
