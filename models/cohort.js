"use strict"

import Student from "./student.js";

let ADD_DATA ="INSERT INTO cohorts (name) VALUES (?)"
let UPDATE_DATA = "UPDATE cohorts SET name=? WHERE id = ?"
let DELETE_DATA ="DELETE FROM cohorts WHERE id = ?"
let SEARCH_ID = "SELECT * FROM cohorts WHERE id= ?"

class Cohort {
  constructor(name,id){
    this.name = name
    this.id =id
  }

  static create(connection,cohort){
    let c = connection
    c.serialize(function(){
      c.run(ADD_DATA,cohort.name,function(err){
        if(err){
          console.log(err);
        } else{
          console.log('cohort added');
        }
      })
    })
  }

  static update(connection,cohort){
    let d = connection
    d.serialize(function(){
      d.run(UPDATE_DATA,cohort.name,cohort.id,function(err){
        if(err){
          console.log(err);
        } else{
          console.log('cohort updated');
        }
      })
    })
  }

  static delete(connection,id){
    let d = connection
    d.serialize(function(){
      d.run(DELETE_DATA,id,function(err){
        if(err){
          console.log(err);
        } else{
          console.log('cohort deleted');
        }
      })
    })
  }

  static findById(connection,id){
  let d = connection
  d.serialize(function(){
    d.each(SEARCH_ID,id,function(err,row){
      if(err){
        console.log(err);
      } else{
        console.log(row);
      }
    })
  })
  }

  static cb (err,data){
      if(!err){
        for(var i=0; i<data.length;i++){
          console.log(data[i])
        }
      } else{
        console.log("error")
      }
  }


  static findAll(connection,obj,call){
    let c = connection
    c.serialize(function(){
      c.all("SELECT * FROM cohorts LIMIT ? OFFSET ?",obj.limit,obj.offset,call)
    })
  }

  static where(connection,what,call){
    let c = connection
    c.serialize(function(){
      c.all(`SELECT * FROM cohorts WHERE ${what}`,call)
    })
  }

  static findOrCreate(connection,cohort){
    var query= `SELECT * FROM cohorts
                WHERE name ='${cohort.name}'`
    let c = connection

    c.serialize(function(){
      c.all(query,function(err,cohorts){
        if(!err && cohorts.length>0){
          console.log('data sudah ada')
        }
        else{
          c.serialize(function(){
            c.run(ADD_DATA,cohort.name,function(err){
              if(err){
                console.log(err);
              } else{
                console.log('cohort added');
              }
            })
          })
        }
      })
    })

  }

}

export default Cohort
