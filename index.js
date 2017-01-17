"use strict"

import DBModel from "./models/db_model.js";
import Cohort from "./models/cohort.js";
import Student from "./models/student.js";

const repl = require('repl');
const sqlite3 = require('sqlite3').verbose();

let file = new DBModel('db/student.db');

let argv = process.argv[2];
if(argv === 'playtime'){
  let command = repl.start("> ");

  command.context.dbModel = file;
  command.context.Student = Student;
  command.context.Cohort = Cohort;
}
