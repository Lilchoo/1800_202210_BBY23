// Recommendation page functions
var currentUser;
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        currentUser = db.collection("users").doc(user.uid);
        console.log(currentUser);
        read_display_Recommendation(currentUser);
        insertName();

    } else {
        // No user is signed in.
        console.log("No user is signed in");
        window.location.href = "login.html";
    }
})



function read_display_Recommendation(currentUser) {
    
    var currentResults = db.collection("Results")
    var userID = currentUser;

    currentResults.get()
    .then(snap => {
        snap.forEach(userDoc => {
            var documentID = userDoc.id; //get the id of a survey result document
            console.log(documentID);
            db.collection("Results").doc(documentID).get() // get data of this document
                .then(resultDoc => {
                    var id = resultDoc.data().userID;
                    console.log(id);
                    if (id == userID) {
                        db.collection("Results").doc(documentID).get()
                            .then(thisDoc => {
                                console.log("Where is this data?" + thisDoc.data().cough);
                            })
                    }
                })
        })
    })
    // currentUser.get()
    // .then(testUser => {
    //     testUser.
    // })




    // let usertest = localStorage.getItem("values1");
    // console.log(usertest);
    // db.collection("Results").where("userID", "==", usertest).get()
    // .then(testDoc => {
    //     console.log("This is it" + testDoc);
    //     let array1 = [];
    //     console.log(testDoc.data().cough);
    // })
    // db.collection("users").doc(user.uid).get()
    // .then(() => {
        
    // })
        
            
            // var results = db.collection("Results").get().then(allResults => {
            //     allResults.forEach(doc => {
            //         .where("user")
            //     })
            // })


            
        

    
    

    // if (this.Question1 == "yes") {
    //     db.collection("Recommendation").doc("High")
    //     .get()
    //     .then(highDoc => {
    //         console.log(highDoc.data());
    //         document.getElementById("recommendationGroup").innerHTML =
    //         "Instruction: " + highDoc.data().Instruction + "<br>" +
    //         "Details: " + highDoc.data().Details + "<br>";
    //     })
    // } else if (Question1 == "no") {
    //     db.collection("Recommendation").doc("Medium")
    //     .get()
    //     .then(mediumDoc => {
    //         console.log(mediumDoc.data());
    //         document.getElementById("recommendationGroup").innerHTML = 
    //         "Instruction: " + mediumDoc.data().Instruction + "<br>" +
    //         "Details: " + mediumDoc.data().Details + "<br>";
    //     })

    // }

}

function insertName() {
    currentUser.get().then(userDoc => {

        var user_Name = userDoc.data().name;
        console.log(user_Name);
        document.getElementById("name-goes-here").innerText = user_Name
    })
}