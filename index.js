"use strict"

import DBModel from "./models/db_model.js";
import Cohort from "./models/cohort.js";
import Student from "./models/student.js";
const repl = require("repl");

let db = new DBModel("./db/students.db")

let argv = process.argv[2];

if(argv.toLowerCase() == "playtime"){
  let r = repl.start("> ")

  r.context.dbModel    = db;
  r.context.Student    = Student;
  r.context.Cohort     = Cohort;

}
