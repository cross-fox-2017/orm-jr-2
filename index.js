"use strict"

import DBModel from "./models/db_model.js";
import Cohort from "./models/cohort.js";
import Student from "./models/student.js";

class Help {
  static help() {
    console.log("dbModel = view ")
    console.log("dbModel.setup() = cretae table");
  }
}

const repl  = require("repl");
var db      = new DBModel("./db/student.db")
var argv    = process.argv[2]

if(argv == "playtime"){
  var replStart  = repl.start('> ')
  replStart.context.dbModel = db
  replStart.context.Student = Student
  replStart.context.Cohort  = Cohort
  replStart.context.help    = Help.help
}
