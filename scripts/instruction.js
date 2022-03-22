HEAD
var currentUser
function populateInfo() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {

            //go to the correct user document by referencing to the user uid
            currentUser = db.collection("users").doc(user.uid)
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    //get the data fields of the user
                    var Instructions = userDoc.data().instructions;
                
                    //if the data fields are not empty, then write them in to the form.
                    if (Instructions != null) {
                        document.getElementById("instructions").value = Instructions;
                    }
                })
                
        } else {
            // No user is signed in.
            console.log ("No user is signed in");
        }
    });
}
populateInfo();

document.getElementById('instructions').disabled = false;
// 7f1e0d560c713fa3af5aab717aca6a64ff1ecc65

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

//<<<<<<< HEAD
//}
//=======
///>>>>>>> 7f1e0d560c713fa3af5aab717aca6a64ff1ecc65
