function surveyResults() {
    console.log("in")
    let Question1 = document.querySelector('input[name="yes/no1"]:checked').value;
    // let CheckList1 = document.querySelector('input[name="fever-or-chills"]:checked').value;
    // let CheckList2 = document.querySelector('input[name="cough"]:checked').value;
    // let CheckList3 = document.querySelector('input[name="shortness-of-breath"]:checked').value;
    // let CheckList4 = document.querySelector('input[name="sense-of-smell-or-taste"]:checked').value;
    // let CheckList5 = document.querySelector('input[name="sore-throat"]:checked').value;
    // let CheckList6 = document.querySelector('input[name="headache"]:checked').value;
    // let CheckList7 = document.querySelector('input[name="fatigue-or-tiredness"]:checked').value;
    // let CheckList8 = document.querySelector('input[name="runny-nose"]:checked').value;
    // let CheckList9 = document.querySelector('input[name="sneezing"]:checked').value;
    // let CheckList10 = document.querySelector('input[name="diarrhea"]:checked').value;
    // let CheckList11 = document.querySelector('input[name="appetite"]:checked').value;
    // let CheckList12 = document.querySelector('input[name="nausea-or-vomiting"]:checked').value;
    // let CheckList13 = document.querySelector('input[name="body-or-muscle-aches"]:checked').value;
    // let CheckList14 = document.querySelector('input[name="none-of-the-above"]:checked').value;
    let checkboxes = document.querySelectorAll('input[name="symptoms"]:checked');
    let values = [];
    checkboxes.forEach((checkbox) => {
        values.push(checkbox.value);
    });
    console.log(values);

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var currentUser = db.collection("users").doc(user.uid)
            var userID = user.uid;

            currentUser.get()
                .then(userDoc => {
                    var userEmail = userDoc.data().email;
                    db.collection("Results").add({
                        userID: userID,
                        close_contact: Question1,
                        fever_chills: compareArrays(values),
                        cough: compareArrays(values),
                        shortness_breath: compareArrays(values),
                        lost_sense_smell_taste: compareArrays(values),
                        sorethroat: compareArrays(values),
                        headache: compareArrays(values),
                        fatigue_tiredness: compareArrays(values),
                        runnynose: compareArrays(values),
                        sneezing: compareArrays(values),
                        diarrhea: compareArrays(values),
                        lost_appetite: compareArrays(values),
                        nausea_vomiting: compareArrays(values),
                        body_muscle_aches: compareArrays(values),
                        none: compareArrays(values),
                        timestamp: firebase.firestore.FieldValue.serverTimestamp()
                    }).then(() => {
                        window.location.href = "main.html";
                    })
                })
        } else {
            console.log("No user is sign in");
        }
    })
}

function compareArrays(input) {
    for (var i=0; i < symptomsArray.length; i++) {
        if (input[i] == symptomsArray[i]) {
            return "True";
        } else {
            return "False";
        }
    }    
}

const symptomsArray = [                        
"fever_chills",
"cough",
"shortness_breath",
"lost_sense_smell_taste",
"sorethroat",
"headache",
"fatigue_tiredness",
"runnynose",
"sneezing",
"diarrhea",
"lost_appetite",
"nausea_vomiting",
"body_muscle_aches",
"none",    
]