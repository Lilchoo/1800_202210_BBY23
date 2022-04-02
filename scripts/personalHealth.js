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
    var arraySymptoms1 = [];
    var arraySymptoms2 = [];
    var listOne;
    var listTwo;

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

                        arraySymptoms1.push(thisDoc.data().fever_chills);
                        arraySymptoms1.push(thisDoc.data().cough);
                        arraySymptoms1.push(thisDoc.data().shortness_breath);
                        arraySymptoms1.push(thisDoc.data().lost_sense_smell_taste);

                        arraySymptoms2.push(thisDoc.data().sorethroat);
                        arraySymptoms2.push(thisDoc.data().headache);
                        arraySymptoms2.push(thisDoc.data().fatigue_tiredness);
                        arraySymptoms2.push(thisDoc.data().runnynose);
                        arraySymptoms2.push(thisDoc.data().sneezing);
                        arraySymptoms2.push(thisDoc.data().diarrhea);
                        arraySymptoms2.push(thisDoc.data().lost_appetite);
                        arraySymptoms2.push(thisDoc.data().nausea_vomiting);
                        arraySymptoms2.push(thisDoc.data().body_muscle_aches);

                        for (i = 0; i < arraySymptoms1.length; i++) {
                            if (arraySymptoms1[i] = "true") {
                                listOne++;
                            }
                        }

                        for (i = 0; i < arraySymptoms2.length; i++) {
                            if (arraySymptoms2[i] = "true") {
                                listTwo++;
                            }
                        }

                        if(thisDoc.data().emergency == "yes") {
                            document.getElementById("health-status").innerHTML =
                            "<h2>" + "red" + "</h2>"
                        } else if(thisDoc.data().close_contact == "yes" || listOne > 1 || listTwo > 3) {
                            document.getElementById("health-status").innerHTML =
                            "<h2>" + "orange" + "</h2>"
                        } else {
                            document.getElementById("health-status").innerHTML =
                            "<h2>" + "green" + "</h2>"
                        }

                        document.getElementById("table-symptoms").innerHTML = 
                        "Fever and Chills: " + thisDoc.data().fever_chills + "<br>" +
                        "Cough: " + thisDoc.data().cough + "<br>" +
                        "Shortness of Breath: " + thisDoc.data().shortness_breath + "<br>" +
                        "Lost of sense, smell, and taste: " + thisDoc.data().lost_sense_smell_taste + "<br>" +
                        "Sorethroat: " + thisDoc.data().sorethroat + "<br>" +
                        "Headache: " + thisDoc.data().headache + "<br>" +
                        "Fatigue and tiredness: " + thisDoc.data().fatigue_tiredness + "<br>" +
                        "Runnynose: " + thisDoc.data().runnynose + "<br>" +
                        "Sneezing: " + thisDoc.data().sneezing + "<br>" +
                        "Diarrhea: " + thisDoc.data().diarrhea + "<br>" +
                        "Lost of Appetite: " + thisDoc.data().lost_appetite + "<br>" +
                        "Nausea or Vomiting: " + thisDoc.data().nausea_vomiting + "<br>" +
                        "Body and Muscle Aches: " + thisDoc.data().body_muscle_aches + "<br>";


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