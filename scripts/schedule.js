var currentUser;
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        currentUser = db.collection("users").doc(user.uid);
        var userTest_ID = user.uid
        console.log(userTest_ID);

        insertInstruction(currentUser, userTest_ID);
        insertName(currentUser);

    } else {
        // No user is signed in.

    }
})

function insertInstruction(currentUser, userTest_ID) {
    //currentUser = db.collection("users").doc(user.uid);
    currentUser.get()
        .then(userDoc => {

            var date = userDoc.data().date;
            console.log(date);
            document.getElementById("date-goes-here").innerText = date
            var task = userDoc.data().instructions;
            console.log(task);
            document.getElementById("instruction-goes-here").innerText = task
        })
}


function insertName(currentUser) {
    currentUser.get().then(userDoc => {

        var user_Name = userDoc.data().name;
        console.log(user_Name);
        document.getElementById("name-goes-here").innerText = user_Name

    })
}