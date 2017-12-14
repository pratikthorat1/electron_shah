const database = require('./js/database');

window.onload = function() {
<<<<<<< HEAD
    // var user = $_GET('user');
    //user id from URL
    //  var url = "http://www.example.com/index.php?myParam=384&login=admin"; // or window.location.href for current url
    //  var captured = /myParam=([^&]+)/.exec(url)[1]; // Value is in [1] ('384' in our case)
    //  var result = captured ? captured : 'myDefaultValue';

    var myParam = location.search.split('user=')[1];
    console.log(myParam);
    // Populate the table
    populateProgressTable(myParam);
    populateMeasurementTable(myParam);
    // populateTable();
=======
    var user = $_POST('user');
    console.log(user);
    // Populate the table
    populateTable();
>>>>>>> da9effcbebaf1015163e240c65311654cca1dfa2
    //tablecreate();

    // Add the add button click event
    document.getElementById('add').addEventListener('click', () => {

<<<<<<< HEAD
        // // Retrieve the input fields
        var firstname = document.getElementById('firstname').value;
        // var lastname = document.getElementById('lastname');

        // var sql=`INSERT INTO customers(user_info,accountno,name) VALUES(?,?,?)`;
        // var stringarr=[];
        // stringarr[0]=firstname.value;
        // stringarr[1]=1111;
        // stringarr[2]=lastname.value;
        // // Save the person in the database
        // database.addPerson(sql,stringarr);

        // // Reset the input fields
        // firstname.value = '';
        // lastname.value = '';

        // // Repopulate the table
        // populateTable();
        populateProgressTable(firstname);
=======
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
>>>>>>> da9effcbebaf1015163e240c65311654cca1dfa2
    });

    // Add the update button click event
    document.getElementById('update').addEventListener('click', () => {
        $("#myModal").modal('show');
        // Retrieve the input fields
        var firstname = document.getElementById('firstname');
        var lastname = document.getElementById('lastname');

        var sql = `Update customers set name=? where accountno=?`;

        var stringarr = [];
<<<<<<< HEAD
        stringarr[0] = document.getElementById('firstname').value;
        stringarr[1] = ocument.getElementById('lastname').value;
=======
        stringarr[0] = lastname.value;
        stringarr[1] = firstname.value;
>>>>>>> da9effcbebaf1015163e240c65311654cca1dfa2
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
<<<<<<< HEAD

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

function populateProgressTable(id) {

    // selectuser();

    // Retrieve the persons
    database.getPersonsProgress(id, function(persons) {
        console.log(persons.length);
=======

    // Retrieve the persons
    database.getPersons(function(persons) {

>>>>>>> da9effcbebaf1015163e240c65311654cca1dfa2
        // Generate the table body
        var tableBody = '';
        for (i = 0; i < persons.length; i++) {
            tableBody += '<tr>';
<<<<<<< HEAD
            tableBody += '  <td>' + persons[i].prog_date + '</td>';
            tableBody += '  <td>' + persons[i].prog_weight + '</td>';
            tableBody += '  <td>' + persons[i].foodpkt + '</td>';
            tableBody += '  <td>' + persons[i].recip1 + '</td>';
            tableBody += '  <td>' + persons[i].recip2 + '</td>';
            tableBody += '  <td>' + persons[i].recip3 + '</td>';
            tableBody += '  <td>' + persons[i].recip4 + '</td>';
            tableBody += '  <td>' + persons[i].total_recip + '</td>';
            tableBody += '  <td>' + persons[i].prog_food + '</td>';
            tableBody += '  <td>' + persons[i].total_food + '</td>';
            tableBody += '  <td>' + persons[i].month + '</td>';
            tableBody += '  <td>' + persons[i].weight_lose + '</td>';
            tableBody += '  <td>' + persons[i].total_wlose + '</td>';
            tableBody += '  <td>' + persons[i].BMI + '</td>';
            tableBody += '  <td width="300px";>' + persons[i].remark + '</td>';
            tableBody += '  <td><i class="fa fa-pencil" aria-hidden="true" onclick="updatePersonProgress(\'' + persons[i].memberno + '\')" "></i>'
            tableBody += '  &nbsp; &nbsp;<i class="fa fa-trash" aria-hidden="true" onclick="deletePersonProgress(\'' + persons[i].memberno + '\',\'' + persons[i].prog_date + '\')" "></i></td>'
=======
            tableBody += '  <td>' + persons[i].accountno + '</td>';
            tableBody += '  <td>' + persons[i].name + '</td>';
            tableBody += '  <td><i class="fa fa-pencil" aria-hidden="true" onclick="updatePerson(\'' + persons[i].accountno + '\')" "></i>'
            tableBody += '  <td><i class="fa fa-trash" aria-hidden="true" onclick="deletePerson(\'' + persons[i].accountno + '\')" "></i></td>'
>>>>>>> da9effcbebaf1015163e240c65311654cca1dfa2
                //  tableBody += '  <input type="button" value="Delete" onclick="deletePerson(\'' + persons[i].accountno + '\')">'
                //  tableBody += '  <input type="button" class="icon " value="Update" onclick="updatePerson(\'' + persons[i].accountno + '\')"></td>'
            tableBody += '</tr>';

        }

        // Fill the table content
        document.getElementById('tablebody').innerHTML = tableBody;
    });
}
<<<<<<< HEAD


// Deletes a person
function deletePersonProgress(id, dt) {
    console.log(id, dt);
    var x = confirm("Are you sure you want to delete?");
    if (x) {
        // Delete the person from the database
        database.deletePersonProgress(id, dt);
        // Repopulate the table
        populateProgressTable(id);
        //  return true;
    } else {
        return false;
    }



=======

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
>>>>>>> da9effcbebaf1015163e240c65311654cca1dfa2
}

function tablecreate() {
    database.createtable();
}

<<<<<<< HEAD
function updatePersonProgress(id) {
    //update single user in table
    $("#myModal").modal('show');
    var firstname = document.getElementById('id');

    database.singlePerson(id, function(persons) {
        // console.log(persons);
        firstname.value = persons.person_nm;

    });

}

function populateMeasurementTable(id) {

    // selectuser();

    // Retrieve the persons
    database.getPersonsMeasurement(id, function(persons) {
        //console.log(persons.length);
        // Generate the table body
        var tableBody = '';
        for (i = 0; i < persons.length; i++) {
            tableBody += '<tr>';
            tableBody += '  <td>' + persons[i].mgt_date + '</td>';
            tableBody += '  <td>' + persons[i].mgt_height + '</td>';
            tableBody += '  <td>' + persons[i].mgt_weight + '</td>';
            tableBody += '  <td>' + persons[i].mgt_neck + '</td>';
            tableBody += '  <td>' + persons[i].mgt_sholder + '</td>';
            tableBody += '  <td>' + persons[i].mgt_midarm + '</td>';
            tableBody += '  <td>' + persons[i].mgt_chest + '</td>';
            tableBody += '  <td>' + persons[i].mgt_waist + '</td>';
            tableBody += '  <td>' + persons[i].mgt_hips + '</td>';
            tableBody += '  <td>' + persons[i].mgt_wbyh + '</td>';
            tableBody += '  <td>' + persons[i].total_inch + '</td>';
            tableBody += '  <td>' + persons[i].inch_diff + '</td>';
            tableBody += '  <td>' + persons[i].total_inch_diff + '</td>';
            tableBody += '  <td>' + persons[i].weight_diff + '</td>';
            tableBody += '  <td>' + persons[i].total_weight_diff + '</td>';
            tableBody += '  <td>' + persons[i].BMI + '</td>';
            tableBody += '  <td><i class="fa fa-pencil" aria-hidden="true" onclick="updatePersonMeasurement(\'' + persons[i].memberno + '\')" "></i>'
            tableBody += '  &nbsp; &nbsp;<i class="fa fa-trash" aria-hidden="true" onclick="deletePersonMeasurement(\'' + persons[i].memberno + '\',\'' + persons[i].prog_date + '\')" "></i></td>'
                //  tableBody += '  <input type="button" value="Delete" onclick="deletePerson(\'' + persons[i].accountno + '\')">'
                //  tableBody += '  <input type="button" class="icon " value="Update" onclick="updatePerson(\'' + persons[i].accountno + '\')"></td>'
            tableBody += '</tr>';

        }

        // Fill the table content
        document.getElementById('tablebodymgt').innerHTML = tableBody;
    });
}

//update persons Measurement
function updatePersonMeasurement(id) {
    //update single user in table
    $("#myModal").modal('show');
    var firstname = document.getElementById('id');

    database.singlePerson(id, function(persons) {
        // console.log(persons);
        firstname.value = persons.person_nm;

=======
function updatePerson(id) {
    //update single user in table
    $("#myModal").modal('show');
    var firstname = document.getElementById('id');

    database.singlePerson(id, function(persons) {
        firstname.value = persons.name;

>>>>>>> da9effcbebaf1015163e240c65311654cca1dfa2
    });

}