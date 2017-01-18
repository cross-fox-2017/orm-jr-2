"use strict"
const repl = require('repl');
const sqlite = require('sqlite3').verbose();

import DBModel from "./models/db_model.js";
import Cohort from "./models/cohort.js";
import Student from "./models/student.js";

var db  = new DBModel("./db/students.db");
// db.setup();
console.log(`Jika bingung, silahkan input Student.help`);
var p = process.argv[2];
if (p == "playtime") {
  var r = repl.start('> ');
  r.context.dbModel = db
  r.context.Student = Student
  r.context.Cohort = Cohort
}
