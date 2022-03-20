var currentUser

function populateInfo() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {

            //go to the correct user document by referencing to the user uid
            currentUser = db.collection("users").doc(user.uid)
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    //get the data fields of the user
                    var userName = userDoc.data().name;
                    var userEmail = userDoc.data().email;
                    var userDOB = userDoc.data().dob;
                    var userRole = userDoc.data().role;
                    var userTeam = userDoc.data().team;

                    //if the data fields are not empty, then write them in to the form.
                    if (userName != null) {
                        document.getElementById("nameInput").value = userName;
                    }
                    if (userEmail != null) {
                        document.getElementById("emailInput").value = userEmail;
                    }
                    if (userDOB != null) {
                        document.getElementById("DOBInput").value = userDOB;
                    }
                    if (userRole != null) {
                        document.querySelector('input[name="role"]:checked').value = userRole;
                    }
                    if (userTeam != null) {
                        document.getElementById("teamInput").value = userTeam;
                    }
                })

        } else {
            // No user is signed in.
            console.log("No user is signed in");
        }
    });
}
populateInfo();

function editProfile() {
    document.getElementById('personalInfoFields').disabled = false;
}

function saveProfile() {
    userName = document.getElementById('nameInput').value;
    userEmail = document.getElementById('emailInput').value;
    userDOB = document.getElementById('DOBInput').value;
    userRole = document.querySelector('input[name="role"]:checked').value;
    userTeam = document.getElementById('teamInput').value;

    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {
            //go to the correct user document by referencing to the user uid
            currentUser = db.collection("users").doc(user.uid)
            //write/update user database
            currentUser.update({
                    name: userName,
                    email: userEmail,
                    dob: userDOB,
                    role: userRole,
                    team: userTeam
                })
                .then(() => {
                    console.log("Document successfully updated!");
                    document.getElementById('personalInfoFields').disabled = true;
                })

        }
    })
}