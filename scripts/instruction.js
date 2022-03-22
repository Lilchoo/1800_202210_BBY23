document.getElementById('instructions').disabled = false;

function confirmInstructions() {
    console.log("get instructions and store into db");
    let i = document.getElementById("instructions").value;
    console.log(i);

    firebase.auth().onAuthStateChanged(user => {
        if(user) {
            var currentUser = db.collection("users").doc(user.uid)
            var userID = user.uid;
            
            currentUser.get()
                .then(userDoc => {
                    var userEmail = userDoc.data().email;
                    db.collection("instructions").add({
                        userID: userID,
                        instructions: i,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp()

                    }).then(() => {
                        // window.location.href = "main.html";
                        document.getElementById('instructions').disabled = true;
                    })
                })

        } else {
            // No user is signed in.
        }
    });
}

