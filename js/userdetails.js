const database = require('./js/database');

window.onload = function() {
    var user = $_POST('user');
    console.log(user);
    // Populate the table
    populateTable();
    //tablecreate();

    // Add the add button click event
    document.getElementById('add').addEventListener('click', () => {

        // Retrieve the input fields
        var firstname = document.getElementById('firstname');
        var lastname = document.getElementById('lastname');

        var sql = `INSERT INTO customers(user_info,accountno,name) VALUES(?,?,?)`;
        var stringarr = [];
        stringarr[0] = firstname.value;
        stringarr[1] = 1111;
        stringarr[2] = lastname.value;
        // Save the person in the database
        database.addPerson(sql, stringarr);

        // Reset the input fields
        firstname.value = '';
        lastname.value = '';

        // Repopulate the table
        populateTable();
    });

    // Add the update button click event
    document.getElementById('update').addEventListener('click', () => {
        $("#myModal").modal('show');
        // Retrieve the input fields
        var firstname = document.getElementById('firstname');
        var lastname = document.getElementById('lastname');

        var sql = `Update customers set name=? where accountno=?`;

        var stringarr = [];
        stringarr[0] = lastname.value;
        stringarr[1] = firstname.value;
        // stringarr[2]=lastname.value;
        // Save the person in the database
        database.updatePerson(sql, stringarr);

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
            tableBody += '  <td><i class="fa fa-pencil" aria-hidden="true" onclick="updatePerson(\'' + persons[i].accountno + '\')" "></i>'
            tableBody += '  <td><i class="fa fa-trash" aria-hidden="true" onclick="deletePerson(\'' + persons[i].accountno + '\')" "></i></td>'
                //  tableBody += '  <input type="button" value="Delete" onclick="deletePerson(\'' + persons[i].accountno + '\')">'
                //  tableBody += '  <input type="button" class="icon " value="Update" onclick="updatePerson(\'' + persons[i].accountno + '\')"></td>'
            tableBody += '</tr>';

        }

        // Fill the table content
        document.getElementById('tablebody').innerHTML = tableBody;
    });
}

// Deletes a person
function deletePerson(id) {

    var x = confirm("Are you sure you want to delete?");
    if (x) {
        // Delete the person from the database
        database.deletePerson(id);
        return true;
    } else
        return false;



    // Repopulate the table
    populateTable();
}

function tablecreate() {
    database.createtable();
}

function updatePerson(id) {
    //update single user in table
    $("#myModal").modal('show');
    var firstname = document.getElementById('id');

    database.singlePerson(id, function(persons) {
        firstname.value = persons.name;

    });

}