
const database = require('./js/database');

window.onload = function() {

  // Populate the table
  populateTable();
  //tablecreate();

  // Add the add button click event
  document.getElementById('add').addEventListener('click', () => {

    // Retrieve the input fields
    var firstname = document.getElementById('firstname');
    var lastname = document.getElementById('lastname');

    // Save the person in the database
    database.addPerson(firstname.value,1110, lastname.value);

    // Reset the input fields
    firstname.value = '';
    lastname.value = '';

    // Repopulate the table
    populateTable();
  });
}

// Populates the persons table
function populateTable() {

 // selectuser();

  // Retrieve the persons
  database.getPersons(function(persons) {
    
    // Generate the table body
    var tableBody = '';
    for (i = 0; i < persons.length; i++) {
      tableBody += '<tr>';
      tableBody += '  <td>' + persons[i].accountno + '</td>';
      tableBody += '  <td>' + persons[i].name + '</td>';
      tableBody += '  <td><input type="button" value="Delete" onclick="deletePerson(\'' + persons[i].accountno + '\')"></td>'
      tableBody += '</tr>';

    }

    // Fill the table content
    document.getElementById('tablebody').innerHTML = tableBody;
  });
}

// Deletes a person
function deletePerson(id) {

    var x = confirm("Are you sure you want to delete?");
    if (x){
          // Delete the person from the database
        database.deletePerson(id);
        return true;
    }
    else
      return false;

  

  // Repopulate the table
  populateTable();
}

function tablecreate(){
  database.createtable();
}

// function selectuser(){
//  facts= database.selectall();
//   alert(facts);
// }
