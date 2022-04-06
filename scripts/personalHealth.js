var currentUser;
var tableS = [];

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        currentUser = db.collection("users").doc(user.uid);
        var userTest_ID = user.uid;

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
    tableS.length = 0;
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
    let arraySymptoms1 = [];
    let arraySymptoms2 = [];
    // var tableS = [];
    let tableSymptoms;
    var listOne = [];
    var listTwo = [];

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
                                        if (arraySymptoms1[i] == true) {
                                            listOne.push(arraySymptoms1[i]);

                                            switch (i) {
                                                case 0:
                                                    tableS.push("Fever and Chills");
                                                    break;
                                                case 1:
                                                    tableS.push("Cough");
                                                    break;
                                                case 2:
                                                    tableS.push("Shortness of Breath");
                                                    break;
                                                case 3:
                                                    tableS.push("Lost of sense, smell, and taste");
                                                    break;
                                            }
                                        }

                                    }

                                    for (i = 0; i < arraySymptoms2.length; i++) {
                                        if (arraySymptoms2[i] == true) {
                                            listTwo.push(arraySymptoms2[i]);

                                            switch (i) {
                                                case 0:
                                                    tableS.push("Sorethroat");
                                                    break;
                                                case 1:
                                                    tableS.push("Headache");
                                                    break;
                                                case 2:
                                                    tableS.push("Fatigue and tiredness");
                                                    break;
                                                case 3:
                                                    tableS.push("Runnynose");
                                                    break;
                                                case 4:
                                                    tableS.push("Sneezing");
                                                    break;
                                                case 5:
                                                    tableS.push("Diarrhea");
                                                    break;
                                                case 6:
                                                    tableS.push("Lost of Appetite");
                                                    break;
                                                case 7:
                                                    tableS.push("Nausea or Vomiting");
                                                    break;
                                                case 8:
                                                    tableS.push("Body and Muscle Aches");
                                                    break;

                                            }
                                        }
                                    }

                                    if (thisDoc.data().emergency == "yes") {
                                        currentUser.update({
                                            status: "red"
                                        })
                                        document.getElementById("health-status").innerHTML =
                                            "<img src='/images/highrisk.png'>"

                                    } else if (thisDoc.data().close_contact == "yes" || listOne.length > 1 || listTwo.length > 3) {
                                        currentUser.update({
                                            status: "orange"
                                        })
                                        document.getElementById("health-status").innerHTML =
                                            "<img src='/images/mediumrisk.png'>"
                                    } else {
                                        currentUser.update({
                                            status: "green"
                                        })
                                        document.getElementById("health-status").innerHTML =
                                            "<img src='/images/lowrisk.png'>"
                                    }

                                    tableSymptoms = "<table><tr><th>Symptoms</th></tr>"
                                    for (let i = 0; i < tableS.length; i++) {
                                        tableSymptoms += "<tr><td>" + tableS[i] + "</td></tr>";
                                    }
                                    tableSymptoms += "</table>";

                                    if (tableS.length <= 0) {
                                        document.getElementById("table-symptoms").innerHTML = "<h5>Please Check Recommendation</h5>";
                                    } else {
                                        document.getElementById("table-symptoms").innerHTML = tableSymptoms;

                                    }


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