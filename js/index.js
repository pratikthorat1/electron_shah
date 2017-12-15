const database = require('./js/database');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./dbfinal.db');

window.onload = function() {

    getMemberid();
    // Populate the table
    populateTable();
    getBirthdays();
    $(".overlay").click(function(e) {
        $("#imageUpload").click();
    });



    $("#imageUpload").change(function() {
        fasterPreview(this);
    });



    // console.log(new Date());
    // console.log(addDays(new Date(), 7));
    // var today = new Date();
    // console.log(today.getDate(), today.getMonth() + 1);

    //   // Add the add button click event
    // document.getElementById('add').addEventListener('click', () => {

    //     var img = document.getElementById("check");
    //     blobUtil.imgSrcToBlob(img.src).then(function(blob) {
    //         var i = blob;
    //         console.log(i);
    //         var sql = "insert into image_table(memberno, img1) values (?,?)";

    //         db.run(sql, 12, blob, function(err) {
    //             if (err) {
    //                 return console.log(err.message);
    //             }
    //             // get the last insert id
    //             console.log(`A row has been inserted with rowid ${this.lastID}`);
    //         });
    //         var blobURL = blobUtil.createObjectURL(blob);

    //         var newImg = document.createElement('img');
    //         newImg.src = blobURL;

    //         document.body.appendChild(newImg);
    //     }).catch(function(err) {
    //         console.log(err);
    //     });
    //     //     // Retrieve the input fields
    //     //     var firstname = document.getElementById('firstname');
    //     //     var lastname = document.getElementById('lastname');

    //     //     // Save the person in the database
    //     //     database.addPerson(firstname.value, lastname.value);

    //     //     // Reset the input fields
    //     //     firstname.value = '';
    //     //     lastname.value = '';

    //     //     // Repopulate the table
    //     //     populateTable();
    // });
    // }

    // // Populates the persons table
    function populateTable() {

        //  // selectuser();

        // Retrieve the persons
        database.getallrows(function(persons) {
            console.log(persons);
            // Generate the table body
            var tableBody = '';
            for (i = 0; i < persons.length; i++) {
                var data = persons[i].img;

                // Convert the string to bytes
                var bytes = new Uint8Array(data.length / 2);

                for (var j = 0; j < data.length; j += 2) {
                    bytes[j / 2] = parseInt(data.substring(j, j + 2), /* base = */ 16);
                }

                // Make a Blob from the bytes
                var blob = new Blob([bytes], { type: 'image/bmp' });

                // Use createObjectURL to make a URL for the blob
                tableBody += '<div class = "col-md-4" ><a href = "userdetails.html?user=' + persons[i].num + '" >';
                tableBody += '<div class="team-container">';
                tableBody += '<img id="check" class="profile" src="' + URL.createObjectURL(blob) + '"> <h1>' + persons[i].name + '</h1>';
                tableBody += ' <h3>Last Visit:' + persons[i].last + '</h3>';
                tableBody += '<hr></hr>';
                tableBody += '<div class="col-md-4 weight red"><h3>' + persons[i].iweight + 'kg</h3><h4>Initial</h4></div><div class="col-md-4 weight blue"><h2>' + persons[i].cweight + 'kg<sup> <i class="fa fa-chevron-down" aria-hidden="true"></i></sup></h2><h4>Current</h4></div><div class = "col-md-4 weight green"><h3>' + persons[i].tweight + 'kg</h3><h4>target</h4></div></div></a></div>';
            }

            // Fill the table content
            document.getElementById('users').innerHTML = tableBody;
        });
    }

    // // Deletes a person
    // function deletePerson(id) {

    //   alert("reach")
    //   // Delete the person from the database
    //   database.deletePerson(id);

    //   // Repopulate the table
    //   populateTable();
}

function fasterPreview(uploader) {
    if (uploader.files && uploader.files[0]) {
        $('#profileImage').attr('src',
            window.URL.createObjectURL(uploader.files[0]));
    }
}

//getMemberid from table 
function getMemberid() {
    database.getNewMemberid(function(id) {
        console.log(id[0] + "-" + id[1] + "-" + id[2]);
    })
}

//Birthday Calculation
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

    // if ((today.getMonth() == birthday.getMonth()) && (today.getDate() == birthday.getDate())) {
    //     alert("Happy B'day!!!");
    // }

    var month_age = Math.floor(day_age / 30);

    day_age = day_age % 30;

    if (isNaN(year_age) || isNaN(month_age) || isNaN(day_age)) {
        $("#exact_age").value("Invalid birthday - Please try again!");
    } else {
        $("#exact_age").val(year_age + " years " + month_age + " months " + day_age + " days");
    }
}


function addDays(theDate, days) {
    return new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000);
}

function getBirthdays() {
    var today = new Date();
    var todaymonth = today.getMonth() + 1;
    var todaydate = today.getDate() - 1;
    var dt1 = todaymonth + "" + todaydate;
    var weekdate = addDays(today, 7);
    var nextmonth = weekdate.getMonth() + 1;
    var nextdate = weekdate.getDate();
    var dt2 = nextmonth + "" + nextdate;

    console.log(dt1 + " " + dt2);
    database.getbirthdayList(dt1, dt2, function(persons) {

        document.getElementById('birthdaycount').innerText = persons.length;

        var tableBody = '';
        for (i = 0; i < persons.length; i++) {
            var data = persons[i].img1;

            // Convert the string to bytes
            var bytes = new Uint8Array(data.length / 2);

            for (var j = 0; j < data.length; j += 2) {
                bytes[j / 2] = parseInt(data.substring(j, j + 2), /* base = */ 16);
            }

            // Make a Blob from the bytes
            var blob = new Blob([bytes], { type: 'image/bmp' });

            // Use createObjectURL to make a URL for the blob
            tableBody += '<div class = "col-md-4" ><a href = "userdetails.html?user=' + persons[i].person_nm + '" >';
            tableBody += '<div class="team-container">';
            tableBody += '<img id="check" class="profile" src="' + URL.createObjectURL(blob) + '"> <h1>' + persons[i].person_birthday + '</h1>';
            tableBody += ' <h3>Last Visit:' + persons[i].person_cont1 + '</h3>';
            tableBody += '<hr></hr>';
            tableBody += '<div class="col-md-4 weight red"><h3>' + persons[i].person_nm + 'kg</h3><h4>Initial</h4></div><div class="col-md-4 weight blue"><h2>' + persons[i].cweight + 'kg<sup> <i class="fa fa-chevron-down" aria-hidden="true"></i></sup></h2><h4>Current</h4></div><div class = "col-md-4 weight green"><h3>' + persons[i].tweight + 'kg</h3><h4>target</h4></div></div></a></div>';
        }

        // Fill the table content
        document.getElementById('tablebirthday').innerHTML = tableBody;
    });
}

function openModal() {

    $("#mybirth").modal('show');


}