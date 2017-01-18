
import DBModel from "./models/db_model.js";
import Student from "./models/student.js";

var db = new DBModel("./db/test.db")
let tes = db.connection;
console.log(db);

function insert (obj) {
  console.log(db);
  var QUERY_ADD = `INSERT INTO students (name) VALUES ('${obj.name}')`;
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

insert( new Student("endy","kucing","1"));
