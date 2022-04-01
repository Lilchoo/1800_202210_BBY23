function insertName() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {                                                       
            console.log(user.uid);
            currentUser = db.collection("users").doc(user.uid);
            currentUser.get()
                  .then(userDoc => {
               var user_Name = userDoc.data().name;
               console.log(user_Name);
               var t = userDoc.data().timestamp;
               console.log(t);
               $("#name-goes-here").text(user_Name);
            })
        } else {
            // No user is signed in.
        }
    });
}
insertName();

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

