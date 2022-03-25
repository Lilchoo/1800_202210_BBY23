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
                        //A thank-you message shows up
                        let div = document.getElementById("survey-container");

                        str = "<div id='message-after-submission'><h1 class='mx-3 my-5 text-center'>Thanks for your submission!</h1>"
                        + "<div class='d-grid gap-2 d-sm-flex justify-content-sm-center text-center w-75 mx-auto'>"
                        + "<button type='button' class='btn btn-lg btn-secondary mx-auto my-3' style='background-color: ; max-width: fit-content; font-size: 25px'><a href='./survey.html'"
                        + "class='text-light text-decoration-none'>Survey again</a></button>"
                        + "<button type='button' class='btn btn-lg mx-auto my-3' style='background-color: #F74F20; max-width: fit-content; font-size: 25px'><a href='./personalHealth.html'"
                        + "class='text-light text-decoration-none'>See Result</a></button>"
                        + "<button type='button' class='btn btn-lg mx-auto my-3 btn-success' style='max-width: fit-content; font-size: 25px'><a href='./main.html'"
                        + "class='text-light text-decoration-none'>Back To Home</a></button></div></div>"
                        + "<div id='thank-you-image'><img src='/images/thank-you.jpg' width='100%'/></div>";
                        
                        div.innerHTML = str;
                    }).then(() => {
                        //Navigates user to the main page after 5 sec
                        // var intID = setInterval(function () {
                        //     window.location.assign("main.html");
                        // }, 5000);
                        // setTimeout(function () {
                        //     clearInterval(intID);
                        // }, 5000);
                    })
                        
                })
        } else {
            console.log("No user is sign in");
        }
    })
}