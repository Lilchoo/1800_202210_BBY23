

function surveyResults() {
    console.log("in")
    let Question1 = document.querySelector('input[name="yes/no"]:checked').value;
    let Question2 = document.querySelector('input[name="yes/no1"]:checked').value;
    let Question3 = document.querySelector('input[name="yes/no2"]:checked').value;
    let Question4 = document.querySelector('input[name="yes/no3"]:checked').value;
    let Question5 = document.querySelector('input[name="yes/no4"]:checked').value;
    let Question6 = document.querySelector('input[name="yes/no5"]:checked').value;
    let Question7 = document.querySelector('input[name="yes/no6"]:checked').value;
    console.log(Question1, Question2, Question3, Question4, Question5, Question6, Question7);

    firebase.auth().onAuthStatedChanged(user => {
        if(user) {
            var currentUser = db.collection("users").doc(user.uid)
            var userID = user.uid;
            
            currentUser.get()
                .then(userDoc => {
                    var userEmail = userDoc.data().email;
                    db.collection("Results").add({
                        userID: userID,
                        question1: Question1,
                        question2: Question2,
                        question3: Question3,
                        question4: Question4,
                        question5: Question5,
                        question6: Question6,
                        question7: Question7,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp()
                    }).then(()=>{
                        window.location.href= "main.html";
                    })
                })
        } else {
            // No user is signed in.
        }
    })
}