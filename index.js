"use strict"

import DBModel from "./models/db_model.js";
import Cohort from "./models/cohort.js";
import Student from "./models/student.js";
const repl = require('repl');

let db = new DBModel('./db/students.db');

class Help {
  static help() {
    console.log("dbModel --> to view connection")
    console.log("dbModel.setup() --> to create students and cohorts tables");
  }
}

let p = process.argv[2]
if (p == "playtime") {
  let r = repl.start('> ')
  r.context.dbModel = db
  r.context.Student = Student
  r.context.Cohort = Cohort
  r.context.help = Help.help
}
