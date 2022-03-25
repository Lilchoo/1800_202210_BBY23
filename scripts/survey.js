function surveyResults() {
    console.log("in")
    let Question1 = document.querySelector('input[name="yes/no1"]:checked').value;
    let checkboxes1 = document.querySelectorAll('input[name="symptoms1"]:checked');
    let values1 = [];   
    checkboxes1.forEach((checkbox) => {
        values1.push(checkbox.value);
    });
    console.log(values1);

    let checkboxes2 = document.querySelectorAll('input[name="symptoms2"]:checked');
    let values2 = [];
    checkboxes2.forEach((checkbox) => {
        values2.push(checkbox.value);
    });
    console.log(values2);

    let checkboxes3 = document.querySelectorAll('input[name="symptoms3"]:checked');
    let values3 = [];
    checkboxes3.forEach((checkbox) => {
        values3.push(checkbox.value);
    });
    console.log(values3);

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

                        db.collection("users").doc(user.uid).get().then(() => {
                            let test = userDoc.data().survey_timestamp.toDate();
                            console.log(test);
                        })

                    }).then(() => {
                        //A thank-you message shows up
                        str = "<h1 class='' id='profile-title' style='color: #F74F20'>Thanks for your submission! Let's see your result now.</h1>";
                        document.getElementById("after-submit").innerHTML = str;
                        
                    }).then(() => {
                        //Navigates user to the main page after 5 sec
                        var intID = setInterval(function () {
                            window.location.assign("main.html");
                        }, 5000);
                        setTimeout(function () {
                            clearInterval(intID);
                        }, 5000);
                    })
                        
                })
        } else {
            console.log("No user is sign in");
        }
    })
}


