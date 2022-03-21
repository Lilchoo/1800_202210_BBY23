
function confirmInstructions() {
    console.log("in")
    let Instructions = document.getElementById("instructions").value;
    console.log(Instructions);

    firebase.auth().onAuthStateChanged(user => {
        if(user) {
            var currentUser = db.collection("users").doc(user.uid)
            var userID = user.uid;
            
            currentUser.get()
                .then(userDoc => {
                    var userEmail = userDoc.data().email;
                    db.collection("instructions").add({
                        userID: userID,
                        Instructions: Instructions

                    }).then(() => {
                        window.location.href = "main.html";
                    })
                })

        } else {
            // No user is signed in.
        }
    });

}