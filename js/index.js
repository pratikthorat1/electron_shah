const database = require('./js/database');
//const image2base64 = require('image-to-base64');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./dbfinal.db');

window.onload = function() {

    getMemberid();
    // Populate the table
    populateTable();
    getBirthdays();





    // var img = document.getElementById("profileImage");
    // var imgdata;
    // imgdata = image2base64("img/user1.png");
    // console.log(imgdata);
    // var birthbtn = document.getElementById("birthbtn");
    // var image = new Image();
    // //image.src = 'data:image/png;base64,' + imgdata.Promise.PromiseValue;
    // document.body.appendChild(image);
    // const { foo, bar } = imgdata.then(imgdata => imgdata.PromiseValue);
    // console.log(foo);
    // image.src = 'data:image/png;base64,' + imgdata.toString();



    $(".overlay").click(function(e) {
        $("#imageUpload").click();
    });

    // $("#search").change(function() {
    //     populateTableByName();
    //     //database.readRecordsFromMediaTable();
    // });
    // var $rows = $('#users');
    // $('#search').keyup(function() {
    //     var val = $.trim($(this).val()).replace(/ +/g, ' ').toLowerCase();

    //     $rows.show().filter(function() {
    //         var text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
    //         return !~text.indexOf(val);
    //     }).hide();
    // });


    $("#imageUpload").change(function() {
        fasterPreview(this);
    });

    var input = document.getElementById("search");




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
    var viewData = {};

    function onGeneratedRow(columnsResult) {
        var jsonData = {};
        columnsResult.forEach(function(column) {
            var columnName = column.metadata.colName;
            jsonData[columnName] = column.value;
        });
        viewData.profiles.push(jsonData);
    }

    // // Populates the persons table
    function populateTable() {

        //  // selectuser();

        // Retrieve the persons
        database.getallrows(function(persons) {
            console.log(persons);
            viewData = persons;


            // Generate the table body
            var test = [];
            var tableBody = '';
            for (i = 0; i < persons.length; i++) {
                var data = persons[i].img;
                if (data != null) {
                    // Convert the string to bytes
                    var bytes = new Uint8Array(data.length / 2);

                    for (var j = 0; j < data.length; j += 2) {
                        bytes[j / 2] = parseInt(data.substring(j, j + 2), /* base = */ 16);
                    }
                }

                // Make a Blob from the bytes
                var blob = new Blob([bytes], { type: 'image/bmp' });

                test.push(" " + persons[i].name + " ");

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

            new Awesomplete(input, {
                list: [test],
                data: function(text, input) {
                    return input.slice(0, input.indexOf("@")) + "@" + text;
                },
                // item: function(text, input) {
                //     return Awesomplete.ITEM(text, input.match(/[^,]*$/)[0]);
                // },
            });
            // console.log(test);
            // console.log(test.sort());
            // console.log(test.reverse());

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
        // console.log(id[0] + "-" + id[1] + "-" + id[2]);
        document.getElementById("member_id").value = id[0] + "-" + id[1] + "-" + id[2];
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
        $("#exact_age").val("Invalid birthday - Please try again!");
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
    var todaydate = today.getDate();
    var dt1 = todaymonth + "" + todaydate;
    var weekdate = addDays(today, 7);
    var nextmonth = weekdate.getMonth() + 1;
    var nextdate = weekdate.getDate();
    var dt2 = nextmonth + "" + nextdate;

    // console.log(dt1 + " " + dt2);
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
            tableBody += '<div class = "col-md-12" ><a href = "userdetails.html?user=' + persons[i].person_nm + '" >';
            tableBody += '<div class="b_team-container">';
            tableBody += '<img id="b_img" class="b_profile" src="' + URL.createObjectURL(blob) + '"> <div class="b_user-details"><label>Name:</label>' + persons[i].person_nm;
            tableBody += '<br> <label>Mobile:</label>' + persons[i].person_cont1 + '<br>';
            tableBody += '<label>Email:</label>' + persons[i].person_email + '<br>';
            tableBody += '<label>Birthdate:</label>' + persons[i].person_birthday + '</div></div></a></div>';
        }

        // Fill the table content
        document.getElementById('tablebirthday').innerHTML = tableBody;
    });
}

function openModal() {

    $("#mybirth").modal('show');


}

function onserch(e) {
    //populateTableByName();
    database.readRecordsFromMediaTable();
}

// // Populates the persons table
function populateTableByName() {
    var name = document.getElementById('search').value.toString();
    console.log("person you serach is " + name);
    database.getallrowsbyname(name, function(persons) {
        Console.log(persons);
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

function getHeightincm(ft, inch) {
    var feettocm = ft / 0.032808;
    var inchtocm = inch / 0.39370;
    var heightincm = Math.round(feettocm + inchtocm)
    return heightincm;
}

function getBMI() {
    var ht1 = $("#height_feet").val().toString();
    var ht2 = $("#height_inch").val().toString();
    var wt = $("#weight_kg").val().toString();

    var ht = getHeightincm(ht1, ht2);

    if (wt > 0 && ht > 0) {

        var finalBmi = wt / (ht / 100 * ht / 100);
        var fBMI = Math.round(finalBmi * 10) / 10;
        $("#current_bmi").val(fBMI);
        getTargetWeight();
        return fBMI;
    }
}

function getTargetWeight() {
    var ht1 = $("#height_feet").val().toString();
    var ht2 = $("#height_inch").val().toString();

    var ht = getHeightincm(ht1, ht2);
    var bmi = 21.5;
    if (ht > 0) {
        var targetwt = bmi * (ht / 100 * ht / 100);
        // var finalBmi = wt / (ht / 100 * ht / 100);
        var fBMI = Math.round(targetwt * 10) / 10;
        $("#target_weight").val(fBMI);
        return fBMI;
    }
}

function savePerson() {
    var memberno = $("#member_id").val().toString();
    var regdate = new Date();
    var name = $("#name").val().toString();
    var ref = $("#ref").val().toString();
    var cont_no = $("#cont_no").val().toString();
    var email = $("#email").val().toString();
    var selectedgender = "";
    var selected = $("input[type='radio'][name='gender']:checked");
    if (selected.length > 0) {
        selectedgender = selected.val();
    }
    var selectedmr = "";
    var selected = $("input[type='radio'][name='married']:checked");
    if (selected.length > 0) {
        selectedmr = selected.val();
    }
    var birth_date = $("#birth_date").val().toString();
    var heightincm = getHeightincm($("#height_feet").val().toString(), $("#height_inch").val().toString());
    var weight_kg = $("#weight_kg").val().toString();
    var current_bmi = $("#current_bmi").val().toString();

    var personaldetails = [];
    var imagedetails = [];
    var chk = 1;
    var chk1 = current_bmi;
    var chk2 = current_bmi;
    personaldetails = [memberno, chk, name, ref, cont_no, email, selectedgender, selectedmr, birth_date, heightincm, weight_kg, current_bmi, chk1, chk2];
    // personaldetails = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

    var img = document.getElementById("profileImage");
    var imgdata;
    imgdata = image2base64(img.src);
    console.log(imgdata);
    // image2base64(img.src)
    //     .then(
    //         (response) => {
    //             console.log(response); //cGF0aC90by9maWxlLmpwZw==
    //         }
    //     )
    //     .catch(
    //         (error) => {
    //             console.log(error); //Exepection error....
    //         }
    //     )
    // var sql = "insert into images_table(memberno, img1) values (?,?)";

    // db.run(sql, memberno, blob, function(err) {
    //     if (err) {
    //         return console.log(err.message);
    //     }
    //     // get the last insert id
    //     console.log(`A row has been inserted with rowid ${this.lastID}`);
    // });


    //database.insertpersondetails(personaldetails, imagedetails);
    // });

}



/*------------------instant validation-------------*/
function addEvent(node, type, callback) {
    if (node.addEventListener) {
        node.addEventListener(type, function(e) {
            callback(e, e.target);
        }, false);
    } else if (node.attachEvent) {
        node.attachEvent('on' + type, function(e) {
            callback(e, e.srcElement);
        });
    }
}

function shouldBeValidated(field) {
    return (!(field.getAttribute("readonly") || field.readonly) &&
        !(field.getAttribute("disabled") || field.disabled) &&
        (field.getAttribute("pattern") || field.getAttribute("required"))
    );
}

function instantValidation(field) {
    if (shouldBeValidated(field)) {
        var invalid =
            (field.getAttribute("required") && !field.value) ||
            (field.getAttribute("pattern") &&
                field.value &&
                !new RegExp(field.getAttribute("pattern")).test(field.value));
        if (!invalid && field.getAttribute("aria-invalid")) {
            field.removeAttribute("aria-invalid");
        } else if (invalid && !field.getAttribute("aria-invalid")) {
            field.setAttribute("aria-invalid", "true");
        }
    }
}

addEvent(document, "change", function(e, target) {
    instantValidation(target);
});

var fields = [
    document.getElementsByTagName("input"),
    document.getElementsByTagName("textarea")
];
for (var a = fields.length, i = 0; i < a; i++) {
    for (var b = fields[i].length, j = 0; j < b; j++) {
        addEvent(fields[i][j], "change", function(e, target) {
            instantValidation(target);
        });
    }
}

function ValDigit(val) {

    var keyCodeEntered = (event.which) ? event.which : (window.event.keyCode) ? window.event.keyCode : -1;

    if ((keyCodeEntered >= 48) && (keyCodeEntered <= 57)) {

        return true;

    } else if (keyCodeEntered == 46) {

        // if ((val.value) && (val.value.indexOf('.') >= 0))

        //     return false;

        // else

        return false //true;

    }



    return false;

}

function ValDigitDecimal(val) {

    var keyCodeEntered = (event.which) ? event.which : (window.event.keyCode) ? window.event.keyCode : -1;

    if ((keyCodeEntered >= 48) && (keyCodeEntered <= 57)) {

        return true;

    } else if (keyCodeEntered == 46) {

        if ((val.value) && (val.value.indexOf('.') >= 0))

            return false;

        else

            return true;

    }



    return false;

}
/*-----------instant validation ends-----------*/


function dataURItoBlob(dataURI) {
    // convert base64 to raw binary data held in a string
    var byteString = atob(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to an ArrayBuffer
    var arrayBuffer = new ArrayBuffer(byteString.length);
    var _ia = new Uint8Array(arrayBuffer);
    for (var i = 0; i < byteString.length; i++) {
        _ia[i] = byteString.charCodeAt(i);
    }

    var dataView = new DataView(arrayBuffer);
    var blob = new Blob([dataView], { type: mimeString });
    console.log(blob);
    return blob;
}

function imageToBase64(img) {
    var canvas, ctx, dataURL, base64;
    canvas = document.createElement("canvas");
    ctx = canvas.getContext("2d");
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    dataURL = canvas.toDataURL("image/png");
    base64 = dataURL.replace(/^data:image\/png;base64,/, "");
    return base64;
}