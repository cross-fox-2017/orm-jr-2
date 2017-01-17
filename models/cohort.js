"use strict"
class Cohorts {
    constructor(name, id) {
        this.name = name
        this.id = id;
    }
    static create(connection, input) {
        connection.serialize(function() {
            let query = `INSERT INTO cohorts(name) VALUES ('${input.name}')`;
            connection.run(query, function(err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("INSERT_DATA SUCCESS");
                }
            })
        })
        return true;
    }

    static update(connection, input) {
        connection.serialize(function() {
            let query = `UPDATE cohorts SET name='${input.name}' where id='${input.id}'`;
            connection.run(query, function(err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("UPDATE DATA SUCCESS");
                }
            })
        })
        return true;
    }

    static delete(connection, id) {
        connection.serialize(function() {
            let query = `DELETE from cohorts where id='${id}'`;
            connection.run(query, function(err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("DELETE DATA SUCCESS");
                }
            })
        })
        return true;
    }

    static findById(connection, id) {
        connection.serialize(function() {
            let query = `SELECT * from cohorts where id='${id}'`;
            connection.all(query, function(err, data) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(data);
                }
            })
        })
        return true;
    }

    static findAll(connection, params) {
        let search = function(err, data) {
            if (!err) {
                for (var i = params.offset; i <= params.limit; i++) {
                    console.log(data[i])
                }
            } else {
                console.log("Error");
            }
        }
        connection.serialize(function() {
            let query = `SELECT * from cohorts`;
            connection.all(query, search)
        })
        return true;
    }

    static findOrCreate(connection, input) {
        connection.serialize(function() {
            let query = `SELECT * from cohorts where name='${input.name}'`;
            connection.all(query, function(err, data) {
                if (err) {
                    console.log(err);
                } else {
                    if (data.length > 0) {
                        console.log(data);
                    } else {
                        let queryInsert = `INSERT INTO cohorts(name) VALUES ('${input.name}')`;
                        connection.run(queryInsert, function(err) {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log("INSERT_DATA SUCCESS");
                            }
                        })
                    }
                }
            })
        })
        return true;
    }

    where(connection,field){
      var search = function(err, data) {
          if (!err) {
              for (var i = 0; i < data.length; i++) {
                  console.log(data[i])
              }
          } else {
              console.log("Error");
          }
      }
      connection.serialize(function() {
          let query = `SELECT * from cohorts where ${field}`;
          connection.all(query, search)
      })
      return true;

    }


}

export default Cohorts
