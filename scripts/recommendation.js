// Recommendation page functions
var currentUser;
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        currentUser = db.collection("users").doc(user.uid);
        var userTest_ID = user.uid
        console.log(userTest_ID);
        console.log(currentUser);
        read_display_Recommendation(currentUser, userTest_ID);
        insertName();

    } else {
        // No user is signed in.
        console.log("No user is signed in");
        window.location.href = "login.html";
    }
})



function read_display_Recommendation(currentUser, userTest_ID) {

    var currentResults = db.collection("Results");
    var resultsHigh = db.collection("Recommendation").doc("High");
    var resultsMedium = db.collection("Recommendation").doc("Medium");
    var resultsLow = db.collection("Recommendation").doc("Low");
    var arraySymptoms1 = [];
    var arraySymptoms2 = [];
    var listOne;
    var listTwo;

    console.log(userTest_ID);
    currentResults.get()
        .then(snap => {
            snap.forEach(userDoc => {
                var documentID = userDoc.id; //get the id of a survey result document
                console.log(documentID);
                db.collection("Results").doc(documentID).get() // get data of this document
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

                                    if (thisDoc.data().emergency == "yes") {
                                        resultsHigh.get()
                                            .then(highDoc => {
                                                console.log(highDoc.data());
                                                document.getElementById("recommendationGroup").innerHTML =
                                                    "Instruction: " + highDoc.data().Instruction + "<br>" +
                                                    "Details: " + highDoc.data().Details + "<br>";
                                            })

                                    } else if (thisDoc.data().close_contact == "yes" || listOne > 1 || listTwo > 3) {
                                        resultsMedium.get()
                                            .then(mediumDoc => {
                                                console.log(mediumDoc.data());
                                                document.getElementById("recommendationGroup").innerHTML =
                                                    "Instruction: " + mediumDoc.data().Instruction + "<br>" +
                                                    "Details: " + mediumDoc.data().Details + "<br>";
                                            })
                                    } else {
                                        resultsLow.get()
                                            .then(lowDoc => {
                                                console.log(lowDoc.data());
                                                document.getElementById("recommendationGroup").innerHTML =
                                                    "Instruction: " + lowDoc.data().Instruction + "<br>" +
                                                    "Details: " + lowDoc.data().Details + "<br>";
                                            })
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