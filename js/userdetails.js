const database = require('./js/database');
const image2base64 = require('image-to-base64');
var assert = require('assert');
var fs = require('fs');
var path = require('path');
var base64Img = require('./node_modules/base64-img');


var userid;
const reader = new FileReader();
window.onload = function() {
    // var user = $_GET('user');
    //user id from URL
    //  var url = "http://www.example.com/index.php?myParam=384&login=admin"; // or window.location.href for current url
    //  var captured = /myParam=([^&]+)/.exec(url)[1]; // Value is in [1] ('384' in our case)
    //  var result = captured ? captured : 'myDefaultValue';

    userid = location.search.split('user=')[1];
    //console.log(userid.substr(0, 1));



    // This fires after the blob has been read/loaded.
    reader.addEventListener('loadend', (e) => {
        const text = e.srcElement.result;
        console.log(text);
    });

    $('#myModal').on('hidden.bs.modal', function(e) {
        $(this)
            .find("input,textarea,select")
            .val('')
            .end()
            .find("input[type=checkbox], input[type=radio]")
            .prop("checked", "")
            .end();
    })
    $('#measurement').on('hidden.bs.modal', function(e) {
            $(this)
                .find("input,textarea,select")
                .val('')
                .end()
                .find("input[type=checkbox], input[type=radio]")
                .prop("checked", "")
                .end();
        })
        // Start reading the blob as text.


    // console.log('age: ' + getAge("05-01-1991"));
    // console.log('height in feet' + getHeightincm(4, 10));
    // console.log('BMI cal - ' + getBMI(getHeightincm(5, 10), 80));
    // Populate the table
    populateProgressTable(userid);
    populateMeasurementTable(userid);
    populateImagesTable(userid)
        // populateTable();
        //tablecreate();

    // // Add the add button click event
    // document.getElementById('add').addEventListener('click', () => {

    //     // // Retrieve the input fields
    //     var firstname = document.getElementById('firstname').value;
    //     // var lastname = document.getElementById('lastname');

    //     // var sql=`INSERT INTO customers(user_info,accountno,name) VALUES(?,?,?)`;
    //     // var stringarr=[];
    //     // stringarr[0]=firstname.value;
    //     // stringarr[1]=1111;
    //     // stringarr[2]=lastname.value;
    //     // // Save the person in the database
    //     // database.addPerson(sql,stringarr);

    //     // // Reset the input fields
    //     // firstname.value = '';
    //     // lastname.value = '';

    //     // // Repopulate the table
    //     // populateTable();
    //     populateProgressTable(firstname);
    // });

    // Add the update button click event
    //     document.getElementById('update').addEventListener('click', () => {
    //         $("#myModal").modal('show');
    //         // Retrieve the input fields
    //         var firstname = document.getElementById('firstname');
    //         var lastname = document.getElementById('lastname');

    //         var sql = `Update customers set name=? where accountno=?`;

    //         var stringarr = [];
    //         stringarr[0] = document.getElementById('firstname').value;
    //         stringarr[1] = ocument.getElementById('lastname').value;
    //         // stringarr[2]=lastname.value;
    //         // Save the person in the database
    //         database.updatePerson(sql, stringarr);

    //         // Reset the input fields
    //         firstname.value = '';
    //         lastname.value = '';

    //         // Repopulate the table
    //         populateTable();
    //     });
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
        // console.log(persons.length);
        // Generate the table body
        var tableBody = '';
        var r1 = 0;
        var r2 = 0,
            r3 = 0,
            w1 = 0,
            totalrecip = 0,
            foodpkt = 0,
            month = 0,
            weightlose = 0,
            totalwlose = 0,
            abmi = 0;

        for (i = 0; i < persons.length; i++) {
            if (i > 0) {
                w1 = persons[i - 1].prog_weight;
            } else {
                w1 = persons[i].prog_weight
            }
            var w2 = persons[i].prog_weight;
            weightlose = w2 - w1;
            w1 = w2;
            totalwlose += weightlose;

            r1 += persons[i].recip1;
            r2 += persons[i].recip1;
            r3 += persons[i].recip1;
            totalrecip = r1 + r2 + r3;
            foodpkt += persons[i].foodpkt;

            if (foodpkt >= 30) {
                foodpkt = foodpkt - 30;
                month++;
            }

            tableBody += '<tr>';
            tableBody += '  <td>' + persons[i].prog_date + '</td>';
            tableBody += '  <td>' + persons[i].prog_weight + '</td>';
            tableBody += '  <td>' + weightlose + '</td>';
            tableBody += '  <td>' + totalwlose + '</td>';
            tableBody += '  <td>' + r1 + '</td>';
            tableBody += '  <td>' + r2 + '</td>';
            tableBody += '  <td>' + r3 + '</td>';
            tableBody += '  <td>' + persons[i].recip4 + '</td>';
            tableBody += '  <td>' + totalrecip + '</td>';
            tableBody += '  <td>' + persons[i].foodpkt + '</td>';
            tableBody += '  <td>' + foodpkt + '</td>';
            // tableBody += '  <td>' + foodpkt + '</td>';
            tableBody += '  <td>' + month + '</td>';

            tableBody += '  <td>' + persons[i].BMI + '</td>';
            tableBody += '  <td width="300px";>' + persons[i].remark + '</td>';
            tableBody += '  <td><i class="fa fa-pencil" aria-hidden="true" onclick="updatePersonProgress(\'' + persons[i].memberno + '\',\'' + persons[i].rowid + '\')" "></i>'
            tableBody += '  &nbsp; &nbsp;<i class="fa fa-trash" aria-hidden="true" onclick="deletePersonProgress(\'' + persons[i].memberno + '\',\'' + persons[i].rowid + '\')" "></i></td>'
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

function addPersonProgress() {
    //insert single user in table
    $("#myModal").modal('show');
    document.getElementById('saveButton').style.visibility = 'hidden';
    var date = document.getElementById('date');
    document.getElementById('date').valueAsDate = new Date();
}

function saveProgresstable() {
    var date; //= new Date(year,month,date);
    var mdate = $("#date").val().toString();

    database.getDatefromdtp(mdate, function(dt) {
        date = dt[0] + "-" + dt[1] + "-" + dt[2];
        //console.log(d);
    });

    var rowid = document.getElementById('rowid').value;
    //var date = document.getElementById('date').value;
    var weight = document.getElementById('weight').value.toString();
    var fp = document.getElementById('fp').value.toString();
    var r1 = document.getElementById('r1').value.toString();
    var r2 = document.getElementById('r2').value.toString();
    var r3 = document.getElementById('r3').value.toString();
    var r4 = document.getElementById('r4').value.toString();
    var remarks = document.getElementById('remarks').value.toString();
    var details = [date, weight, fp, r1, r2, r3, r4, remarks, userid, rowid];

    var sql = `update progress_table set prog_date=?,prog_weight=?,foodpkt=?,recip1=?,recip2=?,recip3=?,recip4=?,remark=? where memberno=? and rowid=? `;
    database.updatePerson(sql, details);
    populateProgressTable(userid);
}


function insertProgresstable() {

    var d; //= new Date(year,month,date);
    var mdate = $("#date").val().toString();
    database.getDatefromdtp(mdate, function(dt) {
        d = dt[0] + "-" + dt[1] + "-" + dt[2];
        //console.log(d);
    });

    var weight = document.getElementById('weight').value.toString();
    var fp = document.getElementById('fp').value.toString();
    var r1 = document.getElementById('r1').value.toString();
    var r2 = document.getElementById('r2').value.toString();
    var r3 = document.getElementById('r3').value.toString();
    var r4 = document.getElementById('r4').value.toString();
    var remarks = document.getElementById('remarks').value.toString();
    var details = [userid, d, weight, fp, r1, r2, r3, r4, remarks]
    var sql = `insert into progress_table (memberno,prog_date,prog_weight,foodpkt,recip1,recip2,recip3,recip4,remark) values(?,?,?,?,?,?,?,?,?) `;
    database.updatePerson(sql, details);
    populateProgressTable(userid);
}

function updatePersonProgress(id, rid) {
    //update single user in table

    document.getElementById('addButton').style.visibility = 'hidden';
    var rowid = document.getElementById('rowid');
    var date = document.getElementById('date');
    var weight = document.getElementById('weight');
    var fp = document.getElementById('fp');
    var r1 = document.getElementById('r1');
    var r2 = document.getElementById('r2');
    var r3 = document.getElementById('r3');
    var r4 = document.getElementById('r4');
    var remarks = document.getElementById('remarks');
    var sql = "select `_rowid_`,* from progress_table where memberno=? and rowid=?";
    var detail = [id, rid]
    database.singlePerson(sql, detail, function(persons) {
        //console.log(persons.prog_date);
        database.getDatefromdb(persons.prog_date, function(dt) {
            date.value = dt[0] + "-" + dt[1] + "-" + dt[2];
        });
        var str = new Date();
        rowid.value = persons.rowid;
        weight.value = persons.prog_weight;
        fp.value = persons.foodpkt;
        r1.value = persons.recip1;
        r2.value = persons.recip2;
        r3.value = persons.recip3;
        r4.value = persons.recip4;
        remarks.value = persons.remark;
    });
    $("#myModal").modal('show');
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
            tableBody += '  <td><i class="fa fa-pencil" aria-hidden="true" onclick="updatePersonMeasurement(\'' + persons[i].memberno + '\',\'' + persons[i].rowid + '\')" "></i>'
            tableBody += '  &nbsp; &nbsp;<i class="fa fa-trash" aria-hidden="true" onclick="deletePersonMeasurement(\'' + persons[i].memberno + '\',\'' + persons[i].rowid + '\')" "></i></td>'
                //  tableBody += '  <input type="button" value="Delete" onclick="deletePerson(\'' + persons[i].accountno + '\')">'
                //  tableBody += '  <input type="button" class="icon " value="Update" onclick="updatePerson(\'' + persons[i].accountno + '\')"></td>'
            tableBody += '</tr>';

        }

        // Fill the table content
        document.getElementById('tablebodymgt').innerHTML = tableBody;
    });
}

function addPersonMeasurement() {
    //insert single user in table
    $("#measurement").modal('show');
    document.getElementById('mgt_saveButton').style.visibility = 'hidden';
    document.getElementById('mgt_addButton').style.visibility = 'visible';
    var date = document.getElementById('mgt_date');
    document.getElementById('mgt_date').valueAsDate = new Date();
}

//update persons Measurement
function updatePersonMeasurement(id, rid) {
    //update single user in table
    document.getElementById('mgt_saveButton').style.visibility = 'visible';
    document.getElementById('mgt_addButton').style.visibility = 'hidden';
    var rowid = document.getElementById('mgt_rowid');
    var date = document.getElementById('mgt_date');
    var weight = document.getElementById('mgt_weight');
    var height = document.getElementById('mgt_height');
    var neck = document.getElementById('mgt_neck');
    var shoulder = document.getElementById('mgt_shoulder');
    var midarm = document.getElementById('mgt_midarm');
    var chest = document.getElementById('mgt_chest');
    var waist = document.getElementById('mgt_waist');
    var hips = document.getElementById('mgt_hips');
    var sql = "select `_rowid_`,* from measurement_table where memberno=? and rowid=?";
    var details = [id, rid];
    database.singlePerson(sql, details, function(persons) {
        database.getDatefromdb(persons.mgt_date, function(dt) {
            console.log(dt);
            date.value = dt[0] + "-" + dt[1] + "-" + dt[2];
        });
        rowid.value = persons.rowid;
        weight.value = persons.mgt_weight;
        height.value = persons.mgt_height;
        neck.value = persons.mgt_neck;
        shoulder.value = persons.mgt_sholder;
        midarm.value = persons.mgt_midarm;
        chest.value = persons.mgt_chest;
        waist.value = persons.mgt_waist;
        hips.value = persons.mgt_hips;

    });
    $("#measurement").modal('show');
}

function InsertMeasurementtable() {
    var d; //= new Date(year,month,date);
    var mdate = $("#mgt_date").val().toString();
    database.getDatefromdtp(mdate, function(dt) {
        d = dt[0] + "-" + dt[1] + "-" + dt[2];
        console.log(d);
    });

    var rowid = document.getElementById('mgt_rowid').value;
    var weight = document.getElementById('mgt_weight').value.toString();
    var height = document.getElementById('mgt_height').value.toString();
    var neck = document.getElementById('mgt_neck').value.toString();
    var shoulder = document.getElementById('mgt_shoulder').value.toString();
    var midarm = document.getElementById('mgt_midarm').value.toString();
    var chest = document.getElementById('mgt_chest').value.toString();
    var waist = document.getElementById('mgt_waist').value.toString();
    var hips = document.getElementById('mgt_hips').value.toString();
    var details = [userid, d, height, weight, neck, shoulder, midarm, chest, waist, hips];
    var sql = `insert into measurement_table (memberno,mgt_date,mgt_height,mgt_weight,mgt_neck,mgt_sholder,mgt_midarm,mgt_chest,mgt_waist,mgt_hips) values (?,?,?,?,?,?,?,?,?,?)`;
    database.updatePerson(sql, details);
    populateMeasurementTable(userid);

}

//save measyrement details in the measurement table
function saveMeasurementtable() {
    var rowid = document.getElementById('mgt_rowid').value;
    var date = document.getElementById('mgt_date').value;
    var weight = document.getElementById('mgt_weight').value.toString();
    var height = document.getElementById('mgt_height').value.toString();
    var neck = document.getElementById('mgt_neck').value.toString();
    var shoulder = document.getElementById('mgt_shoulder').value.toString();
    var midarm = document.getElementById('mgt_midarm').value.toString();
    var chest = document.getElementById('mgt_chest').value.toString();
    var waist = document.getElementById('mgt_waist').value.toString();
    var hips = document.getElementById('mgt_hips').value.toString();
    var details = [date, height, weight, neck, shoulder, midarm, chest, waist, hips, userid, rowid];
    var sql = `update measurement_table set mgt_date=?,mgt_height=?,mgt_weight=?,mgt_neck=?,mgt_sholder=?,mgt_midarm=?,mgt_chest=?,mgt_waist=?,mgt_hips=? where memberno=? and rowid=?`;
    database.updatePerson(sql, details);
    populateMeasurementTable(userid);
}

//get photos from database for this user
function populateImagesTable(id) {

    database.getPersonsImages(id, function(persons) {


        if ((persons.img2) != null && (persons.img2) != "") {
            var data = persons.img2;

            // var bytes = new Uint8Array(data.length / 2);
            // for (var j = 0; j < data.length; j += 2) {
            //     bytes[j / 2] = parseInt(data.substring(j, j + 2), /* base = */ 16);
            // }
            // // Make a Blob from the bytes
            // var blob = new Blob([bytes], { type: 'image/bmp' });

            document.getElementById('img1').src = ("data:image/png;base64," + data); //URL.createObjectURL(blob);

        } else {
            document.getElementById('img1').src = "img/user.png";
            //var bb = new blob()
        }
        if ((persons.img3) != null && (persons.img3) != "") {
            var data = persons.img3;
            // var bytes = new Uint8Array(data.length / 2);
            // for (var j = 0; j < data.length; j += 2) {
            //     bytes[j / 2] = parseInt(data.substring(j, j + 2), /* base = */ 16);
            // }
            // // Make a Blob from the bytes
            // var blob = new Blob([bytes], { type: 'image/bmp' });

            document.getElementById('img2').src = ("data:image/png;base64," + data); //URL.createObjectURL(data);
        } else {
            document.getElementById('img2').src = "img/user.png";
        }
        if ((persons.img4) != null && (persons.img4) != "") {
            var data = persons.img4;
            // var bytes = new Uint8Array(data.length / 2);
            // for (var j = 0; j < data.length; j += 2) {
            //     bytes[j / 2] = parseInt(data.substring(j, j + 2), /* base = */ 16);
            // }
            // // Make a Blob from the bytes
            // var blob = new Blob([bytes], { type: 'image/bmp' });

            document.getElementById('img3').src = ("data:image/png;base64," + data); // URL.createObjectURL(blob);
        } else {
            document.getElementById('img3').src = "img/user.png";
        }
        // console.log(persons);
    });
}

var profileImage;
//upload image to the photos page with three diffrent images
function previewFile(id) {
    var _URL = window.URL || window.webkitURL;
    var file;
    var image = document.getElementById('img' + id);
    if ((file = $("#input" + id)[0].files[0])) {
        image.src = file.path; // ("data:image/png;base64," + data);
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

function getHeight(id) {

}


function getpath(filepath) {
    return path.join(__dirname, filepath);
}

function readFileSync(filepath, encoding) {
    return fs.readFileSync(path.resolve(__dirname, filepath), { encoding: encoding || 'base64' });
    //return fs.readFileSync(path.join(__dirname, filepath), { encoding: encoding || 'base64' });
}

function readFileSyncdemo(filepath, encoding) {
    return fs.readFileSync(filepath, { encoding: encoding || 'base64' });
}

function readFile(filepath) {
    console.log(filepath);
    return fs.readFileSync(filepath, 'base64');
}

//update image in to database
function uploadImg(id) {
    var imgData = document.getElementById("img1");
    console.log(imgData.src);
    image2base64(imgData.src)
        .then(
            (response) => {
                console.log(response); //cGF0aC90by9maWxlLmpwZw==
                if (response != null || response != "") {
                    var details = [response, userid];

                    var sql = `update images_table set img2=? where memberno=?`;
                    database.updatePerson(sql, details);
                }
            }
        )
        .catch(
            (error) => {
                console.log(error); //Exepection error....
            }
        )
        // blobUtil.imgSrcToBlob(imgData.src).then(function(blob) {
        //     var i = Json.stringify(blob);
        //     console.log(i);
        //     console.log(blob);
        //     // success
        // }).catch(function(err) {
        //     // error
        // });

    // var t1 = $("#input" + id)[0].files[0].path;
    // var demo = readFile(t1);
    // var t1 = dataURItoBlob(demo);
    // console.log(t1);
    // console.log(demo);

    // blobUtil.base64StringToBlob(demo).then(function(blob) {
    //     var i = json.stringify(blob);
    //     console.log(i);
    //     // success
    // }).catch(function(err) {
    //     // error
    // });

    // var pid = id + 1;
    // // console.log(profileImage.img);
    // if (demo != null || demo != "") {
    //     var details = [demo, userid];

    //     var sql = `update images_table set img2=? where memberno=?`;
    //     database.updatePerson(sql, details);
    // }
}

function encodeImageFileAsURL() {

    var filesSelected = document.getElementById("input1").files;
    if (filesSelected.length > 0) {
        var fileToLoad = filesSelected[0];

        var fileReader = new FileReader();

        fileReader.onload = function(fileLoadedEvent) {
            var srcData = fileLoadedEvent.target.result; // <--- data: base64

            var newImage = document.createElement('img');
            newImage.src = srcData;
            document.getElementById("img2").src = srcData;
            //alert("Converted Base64 version is " + document.getElementById("imgTest").innerHTML);
            console.log("Converted Base64 version is " + document.getElementById("img2").src);
        }
        fileReader.readAsDataURL(fileToLoad);
    }
}