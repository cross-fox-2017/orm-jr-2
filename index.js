"use strict"

import DBModel from "./models/db_model.js";
import Cohort from "./models/cohort.js";
import Student from "./models/student.js";
const repl = require("repl")

let db = new DBModel("./db/student.db")

console.log(db.connection)
let pl= process.argv[2]

if(pl === "playtime"){
  let rpl = repl.start('> ')
  rpl.context.dbModel = db
  rpl.context.Student = Student
  rpl.context.Cohort = Cohort
}
