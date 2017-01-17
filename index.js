"use strict"

import DBModel from "./models/db_model.js";
import Cohort from "./models/cohort.js";
import Student from "./models/student.js";
const repl = require('repl')

var db = new DBModel("./db/student.db");

var argv = process.argv[2]
  if (argv == 'playtime') {
    var r = repl.start('> ');
    r.context.dbModel = db
    //r.context.student = Student
    r.context.Student = Student
    r.context.Cohort = Cohort
  }


// Cohort.findAll(dbModel.connection, {limit: 1, offset: 1}, function(err,data) {
//   if (!err) {
//     for (var i = 0; i < data.length; i++) {
//       console.log(data[i]);
//     }
//   }else {
//     console.log('Error');
//   }
// })

// Cohort.findOrCreate(dbModel.connection, new Cohort('arabianFox'))
