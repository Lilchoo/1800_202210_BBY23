// Stores survey results to Datastore
function surveyResults(currentUser, userID) {
    console.log("in")
    let Question1 = document.querySelector('input[name="yes/no"]:checked').value;
    let Question2 = document.querySelector('input[name="yes/no1"]:checked').value;
    let checkboxes1 = document.querySelectorAll('input[name="symptoms1"]:checked');
    let values1 = [];
    checkboxes1.forEach((checkbox) => {
        values1.push(checkbox.value);
    });

    let checkboxes2 = document.querySelectorAll('input[name="symptoms2"]:checked');
    let values2 = [];
    checkboxes2.forEach((checkbox) => {
        values2.push(checkbox.value);
    });

    let checkboxes3 = document.querySelectorAll('input[name="symptoms3"]:checked');
    let values3 = [];
    checkboxes3.forEach((checkbox) => {
        values3.push(checkbox.value);
    });


    firebase.auth().onAuthStateChanged(user => {
        // doSurveyFirstTime(user);
        var currentUser = db.collection("users").doc(user.uid);
        currentUser.get()
            .then(userDoc => {
                console.log(userDoc.data().surveyCompleted);
                if (userDoc.data().surveyCompleted != null) {
                    console.log("done survey before");
                    var currentResult = db.collection("Results")
                    var userID = user.uid;
                    currentResult.get()
                        .then(snap => {
                            snap.forEach(userDoc => {
                                var documentID = userDoc.id; //get the id of a survey result document
                                // console.log(documentID);
                                db.collection("Results").doc(documentID).get() // get data of this document
                                    .then(resultDoc => {
                                        var id = resultDoc.data().userID; // get userID that is stored in the survey result document
                                        // console.log(id);
                                        if (id == userID) { //if userID in the survey result document is the same as the id of this user, update new results
                                            db.collection("Results").doc(documentID).update({
                                                emergency: Question1,
                                                close_contact: Question2,
                                                fever_chills: values1.includes("fever_chills"),
                                                cough: values1.includes("cough"),
                                                shortness_breath: values1.includes("shortness_breath"),
                                                lost_sense_smell_taste: values1.includes("lost_sense_smell_taste"),
                                                sorethroat: values2.includes("sorethroat"),
                                                headache: values2.includes("headache"),
                                                fatigue_tiredness: values2.includes("fatigue_tiredness"),
                                                runnynose: values2.includes("runnynose"),
                                                sneezing: values2.includes("sneezing"),
                                                diarrhea: values2.includes("diarrhea"),
                                                lost_appetite: values2.includes("lost_appetite"),
                                                nausea_vomiting: values2.includes("nausea_vomiting"),
                                                body_muscle_aches: values2.includes("body_muscle_aches"),
                                                none: values3.includes("none"),
                                                timestamp: firebase.firestore.FieldValue.serverTimestamp()
                                            }).then(() => {
                                                db.collection("users").doc(user.uid).update({
                                                    surveyCompleted: "True",
                                                    survey_timestamp: firebase.firestore.FieldValue.serverTimestamp()
                                                })
                                            }).then(displayThankYou())
                                        }
                                    })
                            })
                        })
                } else {
                    console.log("never done survey before");
                    var currentUser = db.collection("users").doc(user.uid)
                    var userID = user.uid;
                    currentUser.get()
                        .then(userDoc => {
                            // var userEmail = userDoc.data().email;
                            console.log(userID);
                            db.collection("Results").add({
                                userID: userID,
                                emergency: Question1,
                                close_contact: Question2,
                                fever_chills: values1.includes("fever_chills"),
                                cough: values1.includes("cough"),
                                shortness_breath: values1.includes("shortness_breath"),
                                lost_sense_smell_taste: values1.includes("lost_sense_smell_taste"),
                                sorethroat: values2.includes("sorethroat"),
                                headache: values2.includes("headache"),
                                fatigue_tiredness: values2.includes("fatigue_tiredness"),
                                runnynose: values2.includes("runnynose"),
                                sneezing: values2.includes("sneezing"),
                                diarrhea: values2.includes("diarrhea"),
                                lost_appetite: values2.includes("lost_appetite"),
                                nausea_vomiting: values2.includes("nausea_vomiting"),
                                body_muscle_aches: values2.includes("body_muscle_aches"),
                                none: values3.includes("none"),
                                timestamp: firebase.firestore.FieldValue.serverTimestamp()
                            }).then(() => {
                                db.collection("users").doc(user.uid).set({
                                    surveyCompleted: "True",
                                    survey_timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                                    status: "Pending"
                                }, {
                                    merge: true
                                })
                                db.collection("users").doc(user.uid).get().then(() => {
                                    let test = userDoc.data().survey_timestamp.toDate();
                                    console.log(test);
                                })
                            }).then(displayThankYou())
                        })
                }
            })

    })
};
// Check if user has done survey today
function hasSurveyCompletedToday() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var currentUser = db.collection("users").doc(user.uid)
            var userID = user.uid;
            console.log(userID);
            currentUser.get()
                .then(userDoc => {
                    var surveyCompleted = userDoc.data().surveyCompleted;
                    var lastUpdated = userDoc.data().survey_timestamp;
                    var currentTime = firebase.firestore.Timestamp.fromDate(new Date());
                    console.log("surveyCompleted " + surveyCompleted);
                    console.log("survey last updated: " + lastUpdated.toDate());
                    console.log("current time " + currentTime.toDate());
                    if (surveyCompleted == "True") {
                        if (Math.abs(lastUpdated.seconds - currentTime.seconds) < 86400) {
                            console.log("user has done survey today");
                            let div = document.getElementById("survey-container");
                            str = "<div id='message-after-submission'><h1 class='mx-3 my-5 text-center'>You have done your survey today!</h1>" +
                                "<div class='d-grid gap-2 d-sm-flex justify-content-sm-center text-center w-75 mx-auto'>" +
                                "<button type='button' class='btn btn-lg btn-secondary mx-auto my-2' style='background-color: ; max-width: fit-content; font-size: 25px' onclick='surveyAgain()'><a class='text-light text-decoration-none'>Survey again</a></button>" +
                                "<button type='button' class='btn btn-lg mx-auto my-2' style='background-color: #E63946; max-width: fit-content; font-size: 25px'><a href='./personalHealth.html' class='text-light text-decoration-none'>See Result</a></button>" +
                                "<button type='button' class='btn btn-lg mx-auto my-2 btn-success' style='max-width: fit-content; font-size: 25px'><a href='./main.html' class='text-light text-decoration-none'>Back To Home</a></button></div></div>";
                            div.innerHTML = str;
                        }
                    } else {
                        console.log("user must do survey");
                        surveyResults();
                    }
                })
        } else {
            console.log("No user is sign in");
        }
    });
};
//Do survey again
function surveyAgain() {
    console.log("do survey again");
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var currentUser = db.collection("users").doc(user.uid)
            currentUser.update({
                surveyCompleted: "False"
            }).then(() => {
                window.location.assign("survey.html");
                // window.location.reload();
            })
        }
    })
};
// Display thank-you message after survey submission
function displayThankYou() {
    let div = document.getElementById("survey-container");
    str = "<div id='message-after-submission'><h1 class='mx-3 mt-0 text-center'>Thanks for your submission!</h1>" +
        "<div class='d-grid gap-2 d-sm-flex justify-content-sm-center text-center w-75 mx-auto'>" +
        "<button type='button' class='btn btn-lg btn-secondary mx-auto my-2' style='background-color: ; max-width: fit-content; font-size: 25px' onclick='surveyAgain()'><a class='text-light text-decoration-none'>Survey again</a></button>" +
        "<button type='button' class='btn btn-lg mx-auto my-2' style='background-color: #E63946; max-width: fit-content; font-size: 25px'><a href='./personalHealth.html' class='text-light text-decoration-none'>See Result</a></button>" +
        "<button type='button' class='btn btn-lg mx-auto my-2 btn-success' style='max-width: fit-content; font-size: 25px'><a href='./main.html' class='text-light text-decoration-none'>Back To Home</a></button></div></div>" +
        "<div id='thank-you-image' class='text-center'><img src='/images/thank-you.jpg' style='height: 40vh; max-width: 90vw'/></div>";
    div.innerHTML = str;
}

// document.getElementById("survey-again").addEventListener("click", surveyAgain());