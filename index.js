"use strict"

import DBModel from "./models/db_model.js";
import Cohort from "./models/cohort.js";
import Student from "./models/student.js";

class Help {
  static help() {
    console.log('SHOW ALL STUDENTS/COHORT......: lihat Drive code untuk test case!!');
    console.log('FIND STUDENT/COHORT BY NAME...: lihat Driver code untuk test case!!');
    console.log('ADD NEW STUDENT/COHORT........: insert(\'firstname\', \'lastname\', \'telepon\')');
    console.log('REMOVE STUDENT/COHORT.........: delete(id)  ');
    console.log('UPDATE STUDENT\'s DETAIL.......: update(\'firstname\', \'lastname\', \'telepon\', \'id\')  ');
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
