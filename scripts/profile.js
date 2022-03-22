var currentUser

function populateInfo() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {

            currentUser = db.collection("users").doc(user.uid)
            currentUser.get()
                .then(userDoc => {
                    var userName = userDoc.data().name;
                    var userEmail = userDoc.data().email;
                    var userDOB = userDoc.data().dob;
                    var userRole = userDoc.data().role;
                    var userTeam = userDoc.data().team;

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
        if (user) {
            currentUser = db.collection("users").doc(user.uid)
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
                    const form = document.getElementById("form");
                    let div1 = document.createElement("div");
                    div1.setAttribute("id", "survey-pop-up");
                    form.appendChild(div1);
                    let str = "<p class='mt-2'><b>Please complete this daily health check-up!</b></p>"
                    + "<a href='survey.html' class='btn' id='survey-btn'>Check-up</a>";
                    document.getElementById("survey-pop-up").innerHTML = str;
                })

        }
    })
}

function logOut() {
    firebase.auth().signOut().then(function() {
        console.log('Signed Out');
        window.location.assign("index.html");
      }, function(error) {
        console.error('Sign Out Error', error);
      });
}