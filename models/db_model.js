"use strict"

const sqlite = require('sqlite3').verbose()

class DBModel {
    constructor(file) {
        this.file = file || './db/student.db'
        this.connection = new sqlite.Database(this.file)
    }
    setup() {
        var CREATE_TABLE_STUDENTS = "CREATE TABLE IF NOT EXISTS students(id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT NOT NULL, lastname TEXT, cohort_id INTEGER, FOREIGN KEY(cohort_id) REFERENCES cohorts(id))"
        var CREATE_TABLE_COHORTS = "CREATE TABLE IF NOT EXISTS cohorts(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL)"
        let that = this
        this.connection.serialize(function() {
            that.connection.run(CREATE_TABLE_STUDENTS, function(err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Create Table Success CREATE_TABLE_STUDENTS");
                }
            })
        })
        this.connection.serialize(function() {
            that.connection.run(CREATE_TABLE_COHORTS, function(err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Create Table Success CREATE_TABLE_COHORTS");
                }
            })
        })
        return true;
    }
}

export default DBModel
