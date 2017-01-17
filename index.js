"use strict"

import DBModel from "./models/db_model.js";
import Cohorts from "./models/cohort.js";
import Student from "./models/student.js";
const repl = require('repl')
var db = new DBModel("./db/student.db")


var argv = process.argv[2]
if(argv == "playtime"){
  var run = repl.start('> ')
  run.context.dbModel = db
  run.context.Student = Student
  run.context.Cohorts = Cohorts
}
