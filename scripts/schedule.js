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
    currentUser.get()
        .then(userDoc => {
            let task = "";
            var data = userDoc.data().instruction;
            for (let i = 0; i < data.length; i++) {
                task += "<div>" + data[i] + "</div><br/>";
            }
            console.log("task: " + task);
            document.getElementById("instruction-goes-here").innerHTML = "<div>" + task +"</div>";
        })
}


function insertName(currentUser) {
    currentUser.get().then(userDoc => {

        var user_Name = userDoc.data().name;
        console.log(user_Name);
        document.getElementById("name-goes-here").innerText = user_Name

    })
}