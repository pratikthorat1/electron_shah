const database = require('./js/database');

window.onload = function() {

    // Populate the table
    populateTable();

    //   // Add the add button click event
    document.getElementById('add').addEventListener('click', () => {
        var imageToBlob = require('image-to-blob'),
            foo = document.getElementById('image'),
            DOMURL = window.URL || window.webkitURL || window;

        function appendBlob(err, blob) {
            if (err) {
                console.error(err);
                return;
            }

            console.log(blob);
            var img = document.createElement('img');
            img.src = DOMURL.createObjectURL(blob);
            document.body.appendChild(img);
        }

        imageToBlob(foo, appendBlob);
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
                tableBody += '<div class = "col-md-4" ><a href = "userdetails.html?' + persons[i].num + '" >';
                tableBody += '<div class="team-container">';
                tableBody += '<img class="profile" src="' + URL.createObjectURL(blob) + '"> <h1>' + persons[i].name + '</h1>';
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