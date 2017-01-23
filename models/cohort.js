"use strict"

import Student from "./student.js";

class Cohort {
  constructor(firstname, lastname, cohort_id, id){
    this.firstname  = firstname;
    this.lastname   = lastname;
    this.cohort_id  = cohort_id;
    this.id         = id;
  }

  // CREATE Data Cohort
  static create(db, data) {
    let createDataCohort = `INSERT INTO cohorts (firstname,lastname,cohort_id) VALUES ($firstname,$lastname,$cohort_id);`;
      db.serialize(function() {
        db.each(createDataCohort, {
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

  // UPDATE Data Cohort
  static update(db, data){
    let updateDataCohort = `UPDATE cohorts SET name=$name WHERE id=$id;`;
      db.serialize(function() {
        db.each(updateDataCohort, {
          $name : data.name,
          $id   : data.id,
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

  // DELETE Data Cohort
  static delete(db, id) {
    let deleteDataCohort = `DELETE FROM students WHERE id=$id;`;
      db.serialize(function() {
        db.run(deleteDataStudent, {
          $id : id
        },
        function(err) {
        if(err) {
          console.log(err);
        } else {
          console.log('DELETE');
        }
      });
    });
  }

  // FIND ID Data Cohort
  static findById(db, id) {
    let findDataCohort = `SELECT * FROM cohorts WHERE id=$id;`;
      db.serialize(function() {
        db.each(findDataCohort, {
          $id : id
        },
        function(err, row) {
        if(err) {
          console.log(err);
        } else {
          console.log(`${row.id} | ${row.name}`);
        }
      });
    });
  }

  // FIND ALL Data Cohort
  static findAll(db, object, callback) {
    let findDataCohort = `SELECT * FROM cohorts LIMIT ${object.limit} OFFSET ${object.Offset};`;
      db.serialize(function() {
        db.all(findDataCohort, function(err, row) {
          if(err) {
            callback(err)
          } else {
            callback(row)
          }
        });
    });
  }

  // WHERE Data Cohort
  static where(db, values, callback) {
    let whereDataCohort = 'SELECT * FROM cohorts WHERE ${values};';
      db.serialize(function() {
        db.all(whereDataCohort, function(err, row) {
          if(err) {
            callback(err)
          } else {
            callback(row)
          }
        });
    });
  }

  // FIND LIMIT Data Cohort
  static findAllLimit(db,data,callback){
    let findAllLimitDataCohort = `SELECT * FROM cohorts LIMIT ${data.limit} OFFSET ${data.offset};`;
      db.serialize(function() {
        db.all(findAllLimitDataCohort, function(err,row) {
          if(err) {
            callback(err)
          } else {
            callback(row)
          }
        });
      });
  }

  // FIND OR CREATE Data Cohort
  static findOrCreate(db, data){
    let findOrCreateDataCohort = `SELECT * FROM cohorts WHERE name = ${data.name};`
      db.serialize(function() {
        db.all(findOrCreateDataCohort,{
          $name: data.name
        }, function(err,row) {
          if(!err && row.length > 0) {
            console.log('DATA IS AVAILABEL');
          } else {
            Cohort.create(db, data)
          }
        });
      });
  }
}

export default Cohort
