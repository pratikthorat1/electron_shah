const database = require('./js/database');

var userid;

window.onload = function() {
    // var user = $_GET('user');
    //user id from URL
    //  var url = "http://www.example.com/index.php?myParam=384&login=admin"; // or window.location.href for current url
    //  var captured = /myParam=([^&]+)/.exec(url)[1]; // Value is in [1] ('384' in our case)
    //  var result = captured ? captured : 'myDefaultValue';

    userid = location.search.split('user=')[1];
    console.log(userid);


    console.log('age: ' + getAge("05-01-1991"));
    console.log('height in feet' + getHeightincm(4, 10));
    console.log('BMI cal - ' + getBMI(getHeightincm(5, 10), 80));
    // Populate the table
    populateProgressTable(userid);
    populateMeasurementTable(userid);
    populateImagesTable(userid)
        // populateTable();
        //tablecreate();

    // Add the add button click event
    document.getElementById('add').addEventListener('click', () => {

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
    });

    // Add the update button click event
    document.getElementById('update').addEventListener('click', () => {
        $("#myModal").modal('show');
        // Retrieve the input fields
        var firstname = document.getElementById('firstname');
        var lastname = document.getElementById('lastname');

        var sql = `Update customers set name=? where accountno=?`;

        var stringarr = [];
        stringarr[0] = document.getElementById('firstname').value;
        stringarr[1] = ocument.getElementById('lastname').value;
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

function populateProgressTable(id) {

    // selectuser();

    // Retrieve the persons
    database.getPersonsProgress(id, function(persons) {
        console.log(persons.length);
        // Generate the table body
        var tableBody = '';
        for (i = 0; i < persons.length; i++) {
            tableBody += '<tr>';
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
                //  tableBody += '  <input type="button" value="Delete" onclick="deletePerson(\'' + persons[i].accountno + '\')">'
                //  tableBody += '  <input type="button" class="icon " value="Update" onclick="updatePerson(\'' + persons[i].accountno + '\')"></td>'
            tableBody += '</tr>';

        }

        // Fill the table content
        document.getElementById('tablebody').innerHTML = tableBody;
    });
}


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



}

function tablecreate() {
    database.createtable();
}

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

    });

}
//get photos from database for this user
function populateImagesTable(id) {

    database.getPersonsImages(id, function(persons) {


        if ((persons.img2) != null && (persons.img4) != "") {
            var data = persons.img2;
            var bytes = new Uint8Array(data.length / 2);
            for (var j = 0; j < data.length; j += 2) {
                bytes[j / 2] = parseInt(data.substring(j, j + 2), /* base = */ 16);
            }
            // Make a Blob from the bytes
            var blob = new Blob([bytes], { type: 'image/bmp' });
            document.getElementById('img1').src = URL.createObjectURL(blob);
        } else {
            document.getElementById('img1').src = "img/user.png";
        }
        if ((persons.img3) != null && (persons.img4) != "") {
            var data = persons.img3;
            var bytes = new Uint8Array(data.length / 2);
            for (var j = 0; j < data.length; j += 2) {
                bytes[j / 2] = parseInt(data.substring(j, j + 2), /* base = */ 16);
            }
            // Make a Blob from the bytes
            var blob = new Blob([bytes], { type: 'image/bmp' });

            document.getElementById('img2').src = URL.createObjectURL(blob);;
        } else {
            document.getElementById('img2').src = "img/user.png";
        }
        if ((persons.img4) != null && (persons.img4) != "") {
            var data = persons.img4;
            var bytes = new Uint8Array(data.length / 2);
            for (var j = 0; j < data.length; j += 2) {
                bytes[j / 2] = parseInt(data.substring(j, j + 2), /* base = */ 16);
            }
            // Make a Blob from the bytes
            var blob = new Blob([bytes], { type: 'image/bmp' });

            document.getElementById('img3').src = URL.createObjectURL(blob);;
        } else {
            document.getElementById('img3').src = "img/user.png";
        }
        // console.log(persons);
    });
}

//upload image to the photos page with three diffrent images
function previewFile(id) {
    var _URL = window.URL || window.webkitURL;
    var file;
    var image = document.getElementById('img' + id);
    if ((file = $("#input" + id)[0].files[0])) {

        image.src = _URL.createObjectURL(file);
    }




}

function uploadimages(userid, id) {

    var imgid = document.getElementById('img' + id);
    var lastname = document.getElementById('lastname');

    var sql = `Update image_table set name=? where accountno=?`;

    var stringarr = [];
    stringarr[0] = document.getElementById('firstname').value;
    stringarr[1] = ocument.getElementById('lastname').value;
    // stringarr[2]=lastname.value;
    // Save the person in the database
    database.updatePerson(sql, stringarr);


}

function getAge(dateString) {
    var today = new Date();
    //console.log(today.toString());
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    var d = today.getDate() - birthDate.getDate();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age + "-Years " + m + "-Months " + d + "-Days";


}

function calculateAge() {
    var mdate = $("#birth_date").val().toString();
    var yearThen = parseInt(mdate.substring(0, 4), 10);
    var monthThen = parseInt(mdate.substring(5, 7), 10);
    var dayThen = parseInt(mdate.substring(8, 10), 10);

    var today = new Date();
    var birthday = new Date(yearThen, monthThen - 1, dayThen);

    var differenceInMilisecond = today.valueOf() - birthday.valueOf();

    var year_age = Math.floor(differenceInMilisecond / 31536000000);
    var day_age = Math.floor((differenceInMilisecond % 31536000000) / 86400000);

    if ((today.getMonth() == birthday.getMonth()) && (today.getDate() == birthday.getDate())) {
        alert("Happy B'day!!!");
    }

    var month_age = Math.floor(day_age / 30);

    day_age = day_age % 30;

    if (isNaN(year_age) || isNaN(month_age) || isNaN(day_age)) {
        $("#exact_age").text("Invalid birthday - Please try again!");
    } else {
        $("#exact_age").html("You are<br/><span id=\"age\">" + year_age + " years " + month_age + " months " + day_age + " days</span> old");
    }
}

function getHeightincm(ft, inch) {
    var feettocm = ft / 0.032808;
    var inchtocm = inch / 0.39370;
    var heightincm = Math.round(feettocm + inchtocm)
    return heightincm;

}

function getBMI(ht, wt) {
    if (wt > 0 && ht > 0) {
        var finalBmi = wt / (ht / 100 * ht / 100);
        var fBMI = Math.round(finalBmi * 10) / 10;
        return fBMI;
    }
}