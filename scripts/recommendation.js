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
    currentUser.get()
    .then(testUser => {
        testUser.
    })




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