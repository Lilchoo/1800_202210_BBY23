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
                        document.querySelector('input[name="role"]').value = userRole;
                    }
                    if (userTeam != null) {
                        document.getElementById("teamInput").value = userTeam;
                    }
                })

        } else {
            console.log("No user is signed in");
            str = "<h1 class='text-dark my-3 ' id='profile-title'>Please log in!</h1>" +
                "<div class='d-grid gap-2 d-sm-flex justify-content-sm-center'>" +
                "<button type='button' class='btn btn-lg mx-auto my-3' style='background-color: #E63946; max-width: fit-content'><a href='./login.html'" +
                "class='text-light text-decoration-none'>Log in</a></button></div>" + "<div class='mt-4 text-center'><img src='./images/login.png' style='max-width: 250px;'/></div>"
            document.getElementById("profile-container").innerHTML = str;
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
                    let str = "<p class='mt-2'><b>Please complete this daily health check-up!</b></p>" +
                        "<a href='survey.html' class='btn mb-5' id='survey-btn'>Check-up</a>";
                    document.getElementById("survey-pop-up").innerHTML = str;
                })

        }
    })
}

function logOut() {
    a();

    setTimeout(function () {
        firebase.auth().signOut().then(function () {
            console.log('Signed Out');
            //Navigates user to the main page after 3 sec
            window.location.assign("index.html");
        }, function (error) {
            console.error('Sign Out Error', error);
        })
    }, 3000);
}


function a() {
    let div = document.getElementById("profile-container");

    str = "<div class='text-center h1 mx-2 my-2' style='color: #E63946'>You are logged out. See you later!</div>"
    + "<br/><div class='text-center my-3' style='align-self: center'><img src='/images/thank-you.jpg' style = 'width: 80vw; height : auto '/></div>";

    div.innerHTML = str;
    console.log("thank-you message after user logs out");
}