"use strict"

import Student from "./student.js";

class Cohort {
  constructor(name, year,id){
    this.name   = name;
    this.year   = year;
    this.id     = id;
  }

  static create(db, dataCohort){
    let insertCohort  = `INSERT INTO cohorts(name, year) VALUES ('${dataCohort.name}',${dataCohort.year});`
    db.serialize(function(){
      db.run(insertCohort, function(err){
        if(err){console.log(err);
        }else{console.log("SEED INSERT SUCCSESS!!")
        }
      });
    });
  }

  static update(db, dataCohort){
    let updateCohort  = `UPDATE cohorts SET name = '${dataCohort.name}', year = ${dataCohort.year} WHERE id = '${dataCohort.id}';`
    db.serialize(function(){
      db.run(updateCohort, function(err){
        if (err) {console.log(err);
        }else{console.log("SEED UPDATE SUCCSESS!!")}
      });
    });
  }

  static delete (db, id){
    let deleteCohort  = `DELETE FROM cohorts WHERE id = ${id};`
    db.serialize(function(){
      db.run(deleteCohort, function(err){
        if (err) {console.log(err);
        }else{console.log(`SEED DELETE SUCCSESS!! ${id}`)}
      });
    });
  }

  //Driver Code test case
  // Cohort.findAll(dbModel.connection, {limit:1, offset:1},
  // function(err, data){
  //   if(!err){
  //     for(var i = 0; i < data.length; i++){
  //       console.log(data[i])
  //     }
  //   }else{
  //     console.log('Error')
  //   }
  // })
  static findAll(db, val, callBack){
    let viewCohort = "SELECT * FROM cohorts LIMIT ? OFFSET ?";
    db.serialize(function(){
      db.all(viewCohort, val.limit, val.offset, callBack)
    });
  }

//Driver Code test case
// Cohort.findOrCreate(dbModel.connection, new Cohort("angkatan ke 1",2017))
  static findOrCreate(db, newData){
    let findCreate = "SELECT * FROM cohorts WHERE name = ? AND year = ?";
    db.serialize(function(){
      db.all(findCreate, newData.name, newData.year, function(err, data){
        if(!err && data.length > 0){
          console.log("Cohort is already exists");
        }else {
          Cohort.create(db.newData)
        }
      })
    })
  }

  //Driver code
  //Cohort.findById(dbModel.connection, id)
  static findById(connection, id){
   let db = connection
  let find = `SELECT * FROM cohorts WHERE id LIKE '${id}';`;
   db.serialize(function() {
     db.each(find, function (err,row) {
       if (err) {
         console.log(err);
       }
       else {
         console.log(row);
       }
     })
   })
 }

//Driver code untuk test case
  // Cohort.where(dbModel.connection, "name = 'angkatan ke 1'", function(err, data){
  // if(!err){
  // for(var i = 0; i < data.length; i++){
  // console.log(data[i])
  // }
  // }else{
  // console.log(err)
  // }
  // })

  static where(db, val, callBack){
   let whereCohort = "SELECT * FROM cohorts WHERE ";
   db.serialize(function(){
     db.all(whereCohort + val, callBack)
   });
 }

}

export default Cohort
