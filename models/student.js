"use strict"

class Student {
  constructor(id, firstname, lastname, cohort_id){
    this.id        = id;
    this.firstname = firstname;
    this.lastname  = lastname;
    this.cohort_id = cohort_id;
  }

  // CREATE Data Student
  static create(db, data) {
    let createDataStudent = `INSERT INTO students (firstname,lastname,cohort_id) VALUES ($firstname,$lastname,$cohort_id);`;
      db.serialize(function() {
        db.run(createDataStudent, {
          $firstname : data.firstname,
          $lastname  : data.lastname,
          $cohort_id : data.cohort_id
        },
        function(err) {
          if(err) {
            console.log(err);
          } else {
            console.log('CREATE');
          }
        });
      });
  }

  // UPDATE Data Student
  static update(db, data){
    let updateDataStudent = `UPDATE students SET firstname=$firstname, lastname=$lastname, cohort_id=$cohort_id WHERE id=$id;`;
      db.serialize(function() {
        db.run(updateDataStudent, {
          $firstname : data.firstname,
          $lastname  : data.lastname,
          $cohort_id : data.cohort_id,
          $id        : data.id
        },
        function(err, row) {
          if(err) {
            console.log(err);
          } else {
            console.log(row);
          }
        });
      });
  }

  // DELETE Data Student
  static delete(db, id) {
    let deleteDataStudent = `DELETE FROM students WHERE id=$id;`;
      db.serialize(function() {
        db.run(deleteDataStudent, {
          $id : id
        },
        function(err, row) {
        if(err) {
          console.log(err);
        } else {
          console.log(row);
        }
      });
    });
  }

  // FIND ID Data Student
  static findById(db, id) {
    let findDataStudent = `SELECT * FROM students WHERE id=$id;`;
      db.serialize(function() {
        db.each(findDataStudent, {
          $id : id
        },
        function(err, row) {
          if(err) {
            console.log(err);
          } else {
            console.log(`${row.id} | ${row.firstname} | ${row.lastname} | ${row.cohort_id}`);
          }
        });
      });
  }

  // FIND ALL Data Student
  static findAll(db, object, callback) {
    let findDataStudent = `SELECT * FROM students LIMIT ${object.limit} OFFSET ${object.Offset};`;
      db.serialize(function() {
        db.all(findDataStudent, function(err, row) {
          if(err) {
            callback(err);
          } else {
            callback(row);
          }
        });
      });
  }

  // WHERE Data Student
  static where(db, values, callback) {
    let whereDataStudent = 'SELECT * FROM students WHERE ${values}';
      db.serialize(function() {
        db.all(whereDataStudent, function(err, row) {
          if(err) {
            callback(err);
          } else {
            callback(row)
          }
        })
      });
  }

  // FIND LIMIT Data Student
  static findAllLimit(db,data,callback){
    let findAllLimitDataStudentt = `SELECT * FROM studnets LIMIT ${data.limit} OFFSET ${data.offset};`;
      db.serialize(function() {
        db.all(findAllLimitDataStudent, function(err,row) {
          if(err) {
            callback(err)
          } else {
            callback(row)
          }
        });
      });
  }

  // FIND OR CREATE Data Student
  static findOrCreate(db, data){
    let findOrCreateDataStudentt = `SELECT * FROM students WHERE firstname=$firstname AND lastname=$lastname AND cohort_id=$cohort_id;`
      db.serialize(function() {
        db.all(findOrCreateDataStudent,{
          $firstname : data.firstname,
          $lastname  : data.lastname,
          $cohort_id : data.cohort_id
        }, function(err,row) {
          if(!err && row.length > 0) {
            console.log('DATA IS AVAILABEL');
          } else {
            Student.create(db, data)
          }
        });
      });
  }
}

export default Student
