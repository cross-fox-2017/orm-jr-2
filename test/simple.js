
import DBModel from "../models/db_model.js";
import Student from "../models/student.js";

var db = new DBModel("./db/test.db")
//db.setup();

function insert (db, obj) {
  var QUERY_ADD = `INSERT INTO students (first_name, last_name, cohort_id) VALUES ('${obj.fist_name}', '${obj.last_name}', '${obj.cohort_id}' )`;
  db.run(QUERY_ADD, function(err) {
    if (err) {
      console.log(`error coy`);
    } else {
      console.log(`
        INSERTING NEW STUDENT
        Test create student: Sucess`);
    }
  })
}

function updateCoy (db, first_name, last_name, cohort_id, id ) {
  var QUERY_UPDATE = `UPDATE students SET first_name = '${first_name}', last_name = '${last_name}', cohort_id = '${cohort_id}'  WHERE id = '${id}'`;
  console.log(QUERY_UPDATE);
  db.run(QUERY_UPDATE, function(err) {
    if (err) {
      console.log(`error coy`);
    } else {
      console.log(`
        UPDATE DATA
        Test update student: Sucess`);
    }
  })
}

insert(db.connection, new Student("irwin","kucing","2"));
//updateCoy(db.connection, "ruth","gunawan","2",1);
