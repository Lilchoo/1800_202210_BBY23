function surveyResults() {
    console.log("in")
    let Question1 = document.querySelector('input[name="yes/no1"]:checked').value;
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
                        fever_chills: values.includes("fever_chills"),
                        cough: values.includes("cough"),
                        shortness_breath: values.includes("shortness_breath"),
                        lost_sense_smell_taste: values.includes("lost_sense_smell_taste"),
                        sorethroat: values.includes("sorethroat"),
                        headache: values.includes("headache"),
                        fatigue_tiredness: values.includes("fatigue_tiredness"),
                        runnynose: values.includes("runnynose"),
                        sneezing: values.includes("sneezing"),
                        diarrhea: values.includes("diarrhea"),
                        lost_appetite: values.includes("lost_appetite"),
                        nausea_vomiting: values.includes("nausea_vomiting"),
                        body_muscle_aches: values.includes("body_muscle_aches"),
                        none: values.includes("none"),
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