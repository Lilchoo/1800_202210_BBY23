var currentUser;
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        currentUser = db.collection("users").doc(user.uid);
        var userTest_ID = user.uid

        insertSymptoms(currentUser, userTest_ID);
        insertName();

    } else {
        // No user is signed in.

    }
})

function Recommendations() {
    window.location.assign("recommendation.html");
}

function toSurveyAgain() {
    console.log("do survey again");
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var currentUser = db.collection("users").doc(user.uid);
            currentUser.update({
                surveyCompleted: "False"
            }).then(() => {
                window.location.assign("survey.html");
            })
        }
    })
}


function insertSymptoms(currentUser, userTest_ID) {
    var currentResults = db.collection("Results");

    console.log(userTest_ID);
    currentResults.get()
        .then(snap => {
            snap.forEach(userDoc => {
                var documentID = userDoc.id;
                // console.log(documentID);
                db.collection("Results").doc(documentID).get()
                    .then(resultDoc => {
                        var resultsUserID = resultDoc.data().userID;

                        if (resultsUserID == userTest_ID) {
                            db.collection("Results").doc(documentID).get()
                                .then(thisDoc => {
                                    console.log(thisDoc.id);
                                    document.getElementById("table-symptoms").innerHTML =
                                        "Fever and Chills: " + thisDoc.data().fever_chills + "<br>" +
                                        "Cough: " + thisDoc.data().cough + "<br>" +
                                        "Shortness of Breath: " + thisDoc.data().cough + "<br>" +
                                        "Lost of sense, smell, and taste: " + thisDoc.data().cough + "<br>" +
                                        "Sorethroat: " + thisDoc.data().cough + "<br>" +
                                        "Headache: " + thisDoc.data().cough + "<br>" +
                                        "Fatigue and tiredness: " + thisDoc.data().cough + "<br>" +
                                        "Runnynose: " + thisDoc.data().cough + "<br>" +
                                        "Sneezing: " + thisDoc.data().cough + "<br>" +
                                        "Diarrhea: " + thisDoc.data().cough + "<br>" +
                                        "Lost of Appetite: " + thisDoc.data().cough + "<br>" +
                                        "Nausea or Vomiting: " + thisDoc.data().cough + "<br>" +
                                        "Body and Muscle Aches: " + thisDoc.data().cough + "<br>";


                                })
                        }
                    })
            })
        })

}


function insertName() {
    currentUser.get().then(userDoc => {

        var user_Name = userDoc.data().name;
        console.log(user_Name);
        document.getElementById("name-goes-here").innerText = user_Name

    })
}