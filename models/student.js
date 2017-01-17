"use strict"

let ADD_DATA ="INSERT INTO students(firstname,lastname,cohort_id) VALUES (?,?,?)"
let UPDATE_DATA = "UPDATE students SET firstname=?,lastname=? ,cohort_id=? WHERE id = ?"
let DELETE_DATA ="DELETE FROM students WHERE id = ?"
let SEARCH_ID = "SELECT * FROM students WHERE id= ?"

class Student {
  constructor(firstname,lastname,cohort_id,id){
    this.firstname = firstname
    this.lastname = lastname
    this.cohort_id = cohort_id
    this.id =id
  }

  static create(connection,student){
    let c = connection
    c.serialize(function(){
      c.run(ADD_DATA,student.firstname,student.lastname,student.cohort_id,function(err){
        if(err){
          console.log(err);
        } else{
          console.log('student added');
        }
      })
    })
  }

  static update(connection,student){
    let d = connection
    d.serialize(function(){
      d.run(UPDATE_DATA,student.firstname,student.lastname,student.cohort_id,student.id,function(err){
        if(err){
          console.log(err);
        } else{
          console.log('student updated');
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
          console.log('student deleted');
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
      c.all("SELECT * FROM students LIMIT ? OFFSET ?",obj.limit,obj.offset,call)
    })
  }

  static where(connection,what,cb){
    let c = connection
    c.serialize(function(){
      c.all(`SELECT * FROM students WHERE ${what}`,call)
    })
  }

  static findOrCreate(connection,student){
    var query= `SELECT * FROM students
                WHERE firstname ='${student.firstname}' AND lastname='${student.lastname}'
                AND cohort_id = ${student.cohort_id}`
    let c = connection

    c.serialize(function(){
      c.all(query,function(err,students){
        if(!err && students.length>0){
          console.log('data sudah ada')
        }
        else{
          c.serialize(function(){
            c.run(ADD_DATA,student.firstname,student.lastname,student.cohort_id,function(err){
              if(err){
                console.log(err);
              } else{
                console.log('student added');
              }
            })
          })
        }
      })
    })

  }





}

export default Student
