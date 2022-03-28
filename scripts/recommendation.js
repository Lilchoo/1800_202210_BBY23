var currentUser;
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        currentUser = db.collection("users").doc(user.uid);
        console.log(currentUser);
        read_display_Recommendation();
        insertName();

    } else {
        // No user is signed in.
        console.log("No user is signed in");
        window.location.href = "login.html";
    }
})


function read_display_Recommendation() {

    db.collection("Recommendation").doc("Medium")
    .get()
    .then(mediumDoc => {
        console.log(mediumDoc.data());
        document.getElementById("recommendationGroup").innerHTML = 
        "Instruction: " + mediumDoc.data().Instruction + "<br>" +
        "Details: " + mediumDoc.data().Details + "<br>";
    })


        // .onSnapshot(function (mediumDoc) {

        //     document.getElementById("recommendationGroup").innerHTML = mediumDoc.data();
        // })  
}

function insertName() {
    currentUser.get().then(userDoc => {

        var user_Name = userDoc.data().name;
        console.log(user_Name);
        document.getElementById("name-goes-here").innerText = user_Name
    })
}

