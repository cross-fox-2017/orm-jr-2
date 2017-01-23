"use strict"

import DBModel from "./models/db_model.js";
import Student from "./models/student.js";
import Cohort from "./models/cohort.js";

const repl = require("repl");

var db = new DBModel("./db/students.db")
var p  = process.argv[2]
// db.setup();

if(p == "playtime") {
  var r = repl.start("> ")
  r.context.dbModel = db;
  r.context.Student = Student;
  r.context.Cohort  = Cohort;
}
