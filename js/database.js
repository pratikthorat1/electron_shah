// Initialize the database
// var Datastore = require('nedb');
// db = new Datastore({ filename: 'db/persons.db', autoload: true });

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./dbfinal.db');


exports.createtable = function() {
  db.run("create table if not exists customers (user_info)");
  alert("tabel created");
}

var stringarray=[]
// Adds a person
exports.addPerson = function(stringarray) {

  // Create the person object
  var person = {
    "firstname": firstname,
    "lastname": lastname
  };

 
  // Save the person to the database
  //db.insert(person, function(err, newDoc) {
    // Do nothing
var sql = `INSERT INTO customers(user_info,accountno,name) VALUES(?,?,?)`;
  // insert one row into the langs table
  db.run(sql, stringarray, function(err) {
    if (err) {
      return console.log(err.message);
    }
    // get the last insert id
    console.log(`A row has been inserted with rowid ${this.lastID}`);
  });
  //});
};

// Returns all persons
exports.getPersons = function(fnc) {

  db.all("SELECT * from customers", function(err, rows) {
    fnc(rows);
  });
  // Get all persons from the database
  // db.find({}, function(err, docs) {

  //   // Execute the parameter function
  //   fnc(docs);
  // });
}

// Deletes a person
exports.deletePerson = function(id) {

// //  db.remove({ _id: id }, {}, function(err, numRemoved) {
//     // Do nothing

//   });
db.run(`DELETE FROM customers WHERE accountno=?`, id, function(err) {
  if (err) {
    return console.error(err.message);
  }
  console.log(`Row(s) deleted ${this.changes}`);
});
}

// exports.selectall=function(per){
//    db.all("SELECT * from customers", function(err, rows) {
//   per(rows);
//    alert("hurry");
//   });
// }
 