// Initialize the database
// var Datastore = require('nedb');
// db = new Datastore({ filename: 'db/persons.db', autoload: true });

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./dbfinal.db');

var stringarray = [];

exports.createtable = function(err) {
    if (err) {
        alert("error at create table" + err.message);
    }
    db.run("create table if not exists customers (user_info)");
    db.run("CREATE TABLE if not exists images_table ( `memberno` TEXT NOT NULL, `img1` BLOB DEFAULT null, `img2` BLOB DEFAULT null, `img3` BLOB DEFAULT null, `img4` BLOB DEFAULT null, `img5` BLOB DEFAULT null )");
    db.run("CREATE TABLE `measurement_table` ( `memberno` TEXT NOT NULL, `mgt_date` TEXT, `mgt_height` NUMERIC, `mgt_weight` NUMERIC, `mgt_neck` NUMERIC, `mgt_sholder` NUMERIC, `mgt_midarm` NUMERIC, `mgt_chest` NUMERIC, `mgt_waist` NUMERIC, `mgt_hips` NUMERIC, `mgt_wbyh` NUMERIC, `total_inch` NUMERIC, `inch_diff` NUMERIC, `total_inch_diff` NUMERIC, `weight_diff` NUMERIC, `total_weight_diff` NUMERIC, `BMI` NUMERIC )");
    db.run("CREATE TABLE 'progress_table' ( `memberno` TEXT NOT NULL, `prog_date` TEXT, `prog_weight` NUMERIC, `foodpkt` NUMERIC, `recip1` NUMERIC, `recip2` NUMERIC, `recip3` NUMERIC, `recip4` NUMERIC, `total_recip` NUMERIC, `prog_food` NUMERIC, `total_food` NUMERIC, `month` NUMERIC, `weight_lose` NUMERIC, `total_wlose` NUMERIC, `BMI` NUMERIC, `remark` TEXT )");
    db.run("CREATE TABLE 'user_profile' ( `memberno` TEXT NOT NULL, `reg_date` TEXT, `person_nm` TEXT, `person_add` TEXT, `person_ref` TEXT, `person_cont1` INTEGER, `person_cont2` INTEGER, `person_email` TEXT, `person_gender` INTEGER, `person_mr_states` INTEGER, `person_birthday` TEXT, `person_height` NUMERIC, `person_weight` NUMERIC, `BMI` NUMERIC )");
    alert("tabel created");
}


// Adds a person
exports.addPerson = function(sql, stringarray) {

    // Create the person object
    var person = {
        "firstname": firstname,
        "lastname": lastname
    };


    // Save the person to the database
    //db.insert(person, function(err, newDoc) {
    // Do nothing
    //var sql = `INSERT INTO customers(user_info,accountno,name) VALUES(?,?,?)`;
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

exports.getallrows = function(fna) {

    // db.all("select up.memberno as memberno,it.img1 as img,up.person_nm as name,pt.prog_date as last,up.person_weight as iweight,pt.prog_weight as cweight,up.person_weight as tweight from user_profile up,progress_table pt,images_table it", function(err, rows) {
    //     fnc(rows);
    // });
    var sql = `select up.memberno as num,it.img1 as img,up.person_nm as name,pt.prog_date as last,up.person_weight as iweight,pt.prog_weight as cweight,up.person_weight as tweight from user_profile up,progress_table pt,images_table it group by up.memberno`;

    db.all(sql, (err, rows) => {
        if (err) {
            throw err;
        }
        console.log(rows);
        fna(rows);
        // rows.forEach((row) => {
        //     console.log(row.name);
        // });
    });

}


//get each members database from progress table
exports.getPersonsProgress = function(id, fnc) {

    db.all("SELECT * from progress_table where memberno=? ORDER BY prog_date desc", id, function(err, rows) {
        fnc(rows);
    });
}

//get each members database from progress table
exports.getPersonsImages = function(id, fnc) {

    db.get("SELECT * from images_table where memberno=?", id, function(err, rows) {
        fnc(rows);
    });
}


// Deletes a person
exports.deletePersonProgress = function(id, dt) {

    db.run(`DELETE FROM progress_table WHERE memberno=? and prog_date=?`, id, dt, function(err) {
        if (err) {
            return console.error(err.message);
        }
        console.log(`Row(s) deleted ${this.changes}`);
    });
}

exports.updatePerson = function(sql, stringarray) {

    db.run(sql, stringarray, function(err) {
        if (err) {
            return console.error(err.message);
        }
        console.log(`Row(s) updated: ${this.changes}`);

    });
}

exports.singlePerson = function(sql, id, id1, fct) {
        //  let sql = `SELECT *
        // FROM user_profile
        // WHERE memberno  = ?`;
        // let accid = id;

        // first row only
        db.get(sql, id, id1, (err, row) => {
            if (err) {
                return console.error(err.message);
            }
            //console.log( row );
            fct(row);
        });
    }
    //get each members database from progress table
exports.getPersonsMeasurement = function(id, fnc) {

    db.all("SELECT * from measurement_table where memberno=? ORDER BY mgt_date desc", id, function(err, rows) {
        fnc(rows);
    });
}


//get each members unique no database from profile
exports.getNewMemberid = function(fnc) {
    var month;
    let pass;
    var stringarr = [];
    var today = new Date();

    db.get("SELECT max(substr(memberno,3,2)) as mon from user_profile", [], function(err, row) {
        if (err) {
            month = "0";
            return console.error(err.message);
        }
        month = row.mon;
    });


    db.get("SELECT max(substr(memberno,8,3)) as num from user_profile", [], function(err, row) {
        if (err) {
            var code1 = 0;
            return console.error(err.message);
        }
        console.log(today.getMonth() + 1);
        if (month == (today.getMonth() + 1)) {
            code1 = row.num;

        } else { var code1 = 0; }

        stringarr[0] = (today.getMonth() + 1).toString();
        stringarr[1] = today.getFullYear().toString().substr(-2);
        stringarr[2] = code1;
        console.log(stringarr);
        fnc(stringarr);
    });


}

exports.getbirthdayList = function(dt1, dt2, fnc) {
    db.all("SELECT up.person_nm,up.person_birthday,up.person_cont1,up.person_email,it.img1 FROM user_profile up,images_table it WHERE DATE(substr(person_birthday,4,2)||substr(person_birthday,1,2)) between DATE(?) and DATE(?) and up.memberno=it.memberno group by up.memberno order by person_birthday asc", dt1, dt2, function(err, rows) {
        if (err) {
            return console.error(err.message);
        }
        fnc(rows);
    });
}

exports.getallrowsbyname = function(name, fna) {

    // db.all("select up.memberno as memberno,it.img1 as img,up.person_nm as name,pt.prog_date as last,up.person_weight as iweight,pt.prog_weight as cweight,up.person_weight as tweight from user_profile up,progress_table pt,images_table it", function(err, rows) {
    //     fnc(rows);
    // });
    var sql = `select up.memberno as num,it.img1 as img,up.person_nm as name,pt.prog_date as last,up.person_weight as iweight,pt.prog_weight as cweight,up.person_weight as tweight from user_profile up,progress_table pt,images_table it where up.person_nm like ? group by up.memberno`;

    db.all(sql, name, (err, rows) => {
        if (err) {
            throw err;
        }
        console.log("get name by person:=" + rows);
        fna(rows);
    });

}

exports.insertpersondetails = function(persondetails, imagedetails) {
    var sql = `insert into user_profile values (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
    db.run(sql, persondetails, function(err) {
        if (err) {
            return console.log(err.message);
        }
        console.log("Data inserted");
    });

    var sql1 = `insert into images_table values (?,?,?,?,?,?)`;
    db.run(sql1, imagedetails, function(err) {
        if (err) {
            return console.log(err.message);
        }
        console.log("image inserted");
    });
}