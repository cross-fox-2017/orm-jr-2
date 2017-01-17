"use strict"

import DBModel from "./models/db_model.js";
import Cohort from "./models/cohort.js";
import Student from "./models/student.js";

const repl = require('repl')
const db = new DBModel('./db/student.db')

let play = process.argv[2]
if (play = 'playtime'){
  let repled = repl.start('> ').context
  repled.dbModel = db
  repled.Student = Student
  repled.Cohort = Cohort
}
