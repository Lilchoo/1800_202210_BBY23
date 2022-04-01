// Get name and id of the member whose information is displayed
var params = new URL(window.location.href);
const memberID = params.searchParams.get("id");
console.log(memberID);
const memberName = params.searchParams.get("memberName");

//Display member's information
function showInfo() {
    db.collection("users").get().
    then(snap => {
        snap.forEach(doc => {
            var userID = doc.id;
            if (userID == memberID) {
                var role = doc.data().role;
                var email = doc.data().email;
                console.log("role: " + role + "\nemail: " + email);
                let str = "<b>Role:</b> " + role + "<br><b>Email:</b> " + email;
                document.getElementById("info-goes-here").innerHTML = str;
                showHealthInfo(userID);
            }
        })
    })

    document.getElementById("memberName").innerHTML = memberName;

}
showInfo();

// Display health information of this member
function showHealthInfo(userID) {
    var currentResult = db.collection("Results");
    currentResult.get()
        .then(snap => {
            snap.forEach(resultDoc => {
                var documentID = resultDoc.id;
                currentResult.doc(documentID).get()
                    .then(doc => {
                        var id = doc.data().userID;
                        // console.log(id);
                        if (id == userID) {
                            var currentDocID = doc.id;
                            console.log("found the result document with id: " + currentDocID);
                            let currentDoc = doc.data();
                            values = Object.values(currentDoc);
                            keys = Object.keys(currentDoc);
                            let str = "<b>Health information:</b> ";
                            for (let i = 0; i < values.length; i++) {
                                if (keys[i] == "close_contact" && values[i] == "yes") {
                                    str += "Has close contact with someone tested positive for COVID-19 in the last 14 days. ";
                                } else if (values[i] && keys[i] != "userID" && keys[i] != "timestamp" && keys[i] != "close_contact") {
                                    console.log(keys[i]);
                                    str += showCondition(keys[i], values[i]);
                                }
                            }
                            document.getElementById("condition-goes-here").innerHTML = str;
                        }
                    })
            })
        })
}

// Display health conditions of this member
function showCondition(k, i) {
    if (k == "cough") {
        return "Cough. ";
    } else if (k == "body_muscle_aches") {
        return "Body or muscle aches. ";
    } else if (k == "diarrhea") {
        return "Diarrhea. ";
    } else if (k == "fatigue_tiredness") {
        return "Extreme fatigue or tiredness. ";
    } else if (k == "fever_chills") {
        return "Fever of chills. ";
    } else if (k == "headache") {
        return "Headache. ";
    } else if (k == "lost_appetite") {
        return "Loss of appetite. ";
    } else if (k == "lost_sense_smell_taste") {
        return "Loss or change of sense of smell or taste. ";
    } else if (k == "nausea_vomiting") {
        return "Nausea or vomiting. ";
    } else if (k == "runnynose") {
        return "Runny nose. ";
    } else if (k == "none") {
        return "In good condition. ";
    } else if (k == "shortness_breath") {
        return "Shortness of breath. ";
    } else if (k == "sneezing") {
        return "Sneezing. ";
    } else if (k == "sorethroat") {
        return "Sore throat. ";
    } else if (k == "emergency" && i == "yes") {
        return "Experiencing some serious health problems. ";
    } else if (k == "emergency" && i == "no") {
        return "";
    }
}

// Display instructions in the form
function populateInfo() {
    firebase.auth().onAuthStateChanged(user => {
        var userID = user.uid;
        console.log(userID);
        db.collection("instructions").get()
            .then(snap => {
                snap.forEach(instructionDoc => {
                    var docID = instructionDoc.id;
                    db.collection("instructions").doc(docID).get()
                        .then(doc => {
                            var id1 = doc.data().userID;
                            var id2 = doc.data().receiverID;
                            if (id1 == userID && id2 == memberID) {
                                var i = doc.data().instructions;
                                var d = doc.data().date;
                                if (i != null) {
                                    document.getElementById("instructions").value = i;
                                }
                                if (d != null) {
                                    document.getElementById("dateInput").value = d;
                                }
                            }
                        })
                })
            })
    });
}
populateInfo();

document.getElementById('instructions').disabled = true;
document.getElementById('dateInput').disabled = true;

//Edit instructions
function editInstructions() {
    document.getElementById('instructions').disabled = false;
    document.getElementById('dateInput').disabled = false;
}


// Save instructions
function confirmInstructions() {
    let i = document.getElementById("instructions").value;
    let d = document.getElementById("dateInput").value;
    console.log("instructions: " + i + ", date to do instructions: " + d);

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var userID = user.uid;

            var member = db.collection("users").doc(memberID);
            member.get()
                .then(memberDoc => {
                    if (memberDoc.data().hasInstruction == true) { // update the instruction document assigned by the current user for this member
                        updateInstructionDoc(userID, i, d);
                        console.log("update instruction doc")
                    } else {
                        addNewInstructionDoc(userID, i, d); //add new instruction document assigned by the current user for this member if there has been no instruction before
                        console.log("add new instruction doc")
                    }
                }).then(() => {
                    document.getElementById('instructions').disabled = true;
                    document.getElementById('dateInput').disabled = true;
                })

        }
    });
}

function addNewInstructionDoc(userID, i, d) {
    db.collection("instructions").add({
        userID: userID,
        instructions: i,
        date: d,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        receiverID: memberID

    }).then(() => {
        db.collection("users").doc(memberID).set({
            hasInstruction: true,
        }, {
            merge: true
        })
    })
}

function updateInstructionDoc(userID, i, d) {
    db.collection("instructions").get()
        .then(snap => {
            snap.forEach(instructionDoc => {
                var docID = instructionDoc.id;
                db.collection("instructions").doc(docID).get()
                    .then(doc => {
                        if (doc.data().receiverID == memberID && doc.data().userID == userID) {
                            db.collection("instructions").doc(docID).update({
                                instructions: i,
                                date: d,
                                timestamp: firebase.firestore.FieldValue.serverTimestamp()
                            })
                        }
                    })

            })
        })
}

function sendInstructions() {
    
    confirmInstructions();
    firebase.auth().onAuthStateChanged(user => {
        var userID = user.uid;
        console.log(userID);
        db.collection("instructions").get()
            .then(snap => {
                snap.forEach(instructionDoc => {
                    var docID = instructionDoc.id;
                    db.collection("instructions").doc(docID).get()
                        .then(doc => {
                            var id1 = doc.data().userID;
                            var id2 = doc.data().receiverID;
                            if (id1 == userID && id2 == memberID) {
                                var i = doc.data().instructions;
                                var d = doc.data().date;
                                var member = db.collection("users").doc(memberID);
                                member.get().then(memberDoc => {
                                    if (memberDoc.data().instructions != null) {
                                        member.update({
                                            instructions: i,
                                            date: d
                                        })
                                    } else {
                                        member.set({
                                            instructions: i,
                                            date: d
                                        }, {
                                            merge: true
                                        })
                                    }
                                })

                            }
                        })
                })
            })
    })
}