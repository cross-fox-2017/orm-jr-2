"use strict"

import DBModel from "./models/db_model.js";
import Cohort from "./models/cohort.js";
import Student from "./models/student.js";

const repl = require('repl');
const sqlite = require('sqlite3').verbose();

let file = new DBModel('./db/student.db')

let argv = process.argv[2]
if (argv == 'playtime') {
  let start = repl.start('> ')
  start.context.dbModel = file
  start.context.Student = Student
  start.context.Cohort = Cohort
}
