const database = require('./js/database');

window.onload = function() {

    // Populate the table
    populateTable();

    //   // Add the add button click event
    document.getElementById('add').addEventListener('click', () => {

        var img = document.getElementById("check");
        blobUtil.imgSrcToBlob(img.src).then(function(blob) {
            var i = blob;
            console.log(i);
        }).catch(function(err) {
            console.log(err);
        });
        //     // Retrieve the input fields
        //     var firstname = document.getElementById('firstname');
        //     var lastname = document.getElementById('lastname');

        //     // Save the person in the database
        //     database.addPerson(firstname.value, lastname.value);

        //     // Reset the input fields
        //     firstname.value = '';
        //     lastname.value = '';

        //     // Repopulate the table
        //     populateTable();
    });
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
                // var bytes = new Uint8Array(data.length / 2);

                // for (var j = 0; j < data.length; j += 2) {
                //     bytes[j / 2] = parseInt(data.substring(j, j + 2), /* base = */ 16);
                // }

                // // Make a Blob from the bytes
                // var blob = new Blob([bytes], { type: 'image/bmp' });
                var bloburl = blobUtil.createObjectURL(data);
                // Use createObjectURL to make a URL for the blob
                tableBody += '<div class = "col-md-4" ><a href = "userdetails.html?' + persons[i].num + '" >';
                tableBody += '<div class="team-container">';
                tableBody += '<img id="check" class="profile" src="' + bloburl + '"> <h1>' + persons[i].name + '</h1>';
                tableBody += ' <h3>Last Visit:' + persons[i].last + '</h3>';
                tableBody += '<hr></hr>';
                tableBody += '<div class="col-md-4 weight red"><h3>' + persons[i].iweight + '</h3><h4>Initial</h4></div><div class="col-md-4 weight blue"><h2>' + persons[i].cweight + '<sup> <i class="fa fa-chevron-down" aria-hidden="true"></i></sup></h2><h4>Current</h4></div><div class = "col-md-4 weight green"><h3>' + persons[i].tweight + '</h3><h4>target</h4></div></div></a></div>';
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