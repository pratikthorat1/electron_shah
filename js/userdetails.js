const database = require('./js/database');
var assert = require('assert');
var fs = require('fs-extra');
var path = require('path');
var readImageData = require('read-image-data');
var convert = require('node-image-base64');

var userid;
var basedir = window.location.pathname.substr(0, window.location.pathname.lastIndexOf('/'));
//console.log(window.location.pathname.substr(0, window.location.pathname.lastIndexOf('/')))
//fs.copySync(path.resolve(__dirname,'./mainisp.jpg'), './test/mainisp.jpg');
//fs.copySync('C:/Users/lenovo/Desktop/shreepressing/2.jpg', 'C:/Users/lenovo/Desktop/shreepressing/vaibhav/2.png');

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
    //console.log(window.location.pathname.substr(0, window.location.pathname.lastIndexOf('/')))
    //fs.copySync(path.resolve(__dirname,'./mainisp.jpg'), './test/mainisp.jpg');
    //fs.copySync('C:/Users/lenovo/Desktop/shreepressing/2.jpg', 'C:/Users/lenovo/Desktop/shreepressing/vaibhav/2.png');

    populateTable(userid);
    populateProgressTable(userid);
    populateMeasurementTable(userid);
    populateImagesTable(userid)
        // populateTable();
        //tablecreate();

}




// Populates the persons table
function populateTable(id) {

    // selectuser();

    // Retrieve the persons
    database.getPersons(id, function(persons) {

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

            tableBody += '<tr>';
            // tableBody += '  <td>' + persons[i].person_nm + '</td>';
            tableBody += '<img id="check" class="profile" src="' + URL.createObjectURL(blob) + '"> <h1>' + persons[i].name + '</h1>';
            // tableBody += ' <h3>Last Visit:' + persons[i].last + '</h3>';
            tableBody += '</tr>';

        }

        // Fill the table content
        document.getElementById('tableprofile').innerHTML = tableBody;
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

function checkIfFile(file, cb) {
    fs.stat(file, function fsStat(err, stats) {
        if (err) {
            if (err.code === 'ENOENT') {
                return cb(null, false);
            } else {
                return cb(err);
            }
        }
        return cb(null, stats.isFile());
    });
}


//get photos from database for this user
function populateImagesTable(id) {
    var Folderpath = path.resolve('./img/' + id + '/');
    console.log(Folderpath);

    var img2 = Folderpath + '\\img2.png';
    var img3 = Folderpath + '\\img3.png';
    var img4 = Folderpath + '\\img4.png';

    checkIfFile(img2, function(err, isFile) {
        if (isFile) {
            document.getElementById('img2').src = img2;
        } else {
            document.getElementById('img2').src = "img/user.png";
        }
    });
    checkIfFile(img3, function(err, isFile) {
        if (isFile) {
            document.getElementById('img3').src = img3;
        } else {
            document.getElementById('img3').src = "img/user.png";
        }
    });
    checkIfFile(img4, function(err, isFile) {
        if (isFile) {
            document.getElementById('img4').src = img4;
        } else {
            document.getElementById('img4').src = "img/user.png";
        }
    });


}

var profileImage;
//upload image to the photos page with three diffrent images
function previewFile(id) {
    var _URL = window.URL || window.webkitURL;
    var file;
    var pid = id + 1;
    var image = document.getElementById('img' + pid);
    if ((file = $("#input" + id)[0].files[0])) {
        image.src = file.path; // ("data:image/png;base64," + data);
        profileImage = file.path;
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
    // var imgData = document.getElementById("img" + id);
    // var strpath = imgData.src;
    // console.log(strpath.lastIndexOf('file:'));
    // console.log(path.resolve(__dirname, imgData.src));
    // var filenm = strpath.substr(strpath.lastIndexOf('file:'));
    // __parentdir = path.dirname(process.mainModule.filename);
    var i1 = profileImage; //path.resolve(__parentdir, imgData.src)
    var i2 = './img/' + userid + '/img' + id + '.png'

    fs.copySync(i1, i2);

    $.toast({
        text: "Image Uploading",
        showHideTransition: 'slide', // It can be plain, fade or slide
        bgColor: 'green', // Background color for toast
        textColor: 'white', // text color
        allowToastClose: false, // Show the close button or not
        hideAfter: 2000, // `false` to make it sticky or time in miliseconds to hide after
        stack: 5, // `fakse` to show one stack at a time count showing the number of toasts that can be shown at once
        textAlign: 'left', // Alignment of text i.e. left, right, center
        position: 'top-right' // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values to position the toast on page
    });
}