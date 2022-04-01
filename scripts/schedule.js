function read_display_Instruction() {

    db.collection("instructions")
   .get()
    .then(userDoc => {
        console.log(user.uid);
        document.getElementById("scheduleGroup").innerHTML = 
        "Date: " + doc.data().date;
        "Task: " + doc.data().instructions;
    })

}
read_display_Instruction();

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
