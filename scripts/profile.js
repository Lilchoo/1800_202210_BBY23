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
                    console.log("role: " + userRole);
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

//Display good-bye message after user logs out
function a() {
    let div = document.getElementById("profile-container");

    str = "<div class='text-center h1 mx-2 my-2' style='color: #E63946'>You are logged out. See you later!</div>" +
        "<br/><div class='text-center my-3' style='align-self: center'><img src='/images/thank-you.jpg' style = 'width: 80vw; height : auto '/></div>";

    div.innerHTML = str;
    console.log("thank-you message after user logs out");
}

//Upload picture, store picture into storage, store picture's url to user doc
function uploadUserProfilePic() {
    // Let's assume my storage is only enabled for authenticated users 
    // This is set in your firebase console storage "rules" tab

    firebase.auth().onAuthStateChanged(function (user) {
        var fileInput = document.getElementById("mypic-input"); // pointer #1
        const image = document.getElementById("mypic-goes-here"); // pointer #2

        // listen for file selection
        fileInput.addEventListener('change', function (e) {
            var file = e.target.files[0];
            var blob = URL.createObjectURL(file);
            image.src = blob; // display this image

            //store using this name
            var storageRef = storage.ref("images/");
            console.log(storageRef.toString());
            //upload the picked file with .put()
            storageRef.child( user.uid + ".jpg").put(file)
                .then(function (snap) {
                    console.log('Uploaded to Cloud Storage.');
                    //get the URL of stored file with .getDownloadURL()
                    storageRef = storage.ref("images/" + user.uid + ".jpg")
                    storageRef.getDownloadURL()
                        .then(function (url) { // Get URL of the uploaded file
                            console.log(url); // Save the URL into users collection
                            console.log(user.uid);
                            db.collection("users").doc(user.uid).set({
                                    profilePic: url
                                }, {
                                    merge: true
                                })
                                .then(function () {
                                    console.log('Added post picture to Firestore.');
                                })
                        })
                })
        })
    })
}
uploadUserProfilePic();

//Display user profile picture
function displayUserProfilePic() {
    console.log("hi");
    firebase.auth().onAuthStateChanged(function (user) { //get user object
        db.collection("users").doc(user.uid) //use user's uid
            .get() //READ the doc
            .then(function (doc) {
                var picUrl = doc.data().profilePic; //extract pic url

                // use this line if "mypicdiv" is a "div"
                //$("#mypicdiv").append("<img src='" + picUrl + "'>")

                // use this line if "mypic-goes-here" is an "img" 
                $("#mypic-goes-here").attr("src", picUrl);
            })
    })
}
displayUserProfilePic();