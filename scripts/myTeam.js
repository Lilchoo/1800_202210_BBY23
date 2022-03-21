function displayUsers(collection) {
    let cardTemplate = document.getElementById("userCardTemplate");
    db.collection(collection).get()
    .then(snap => {
        var i=1;
        snap.forEach(doc => {
            var title = doc.data().name;
            var details = doc.data().role;
            let newcard = cardTemplate.content.cloneNode(true);

            newcard.querySelector('.card-title').innerHTML = title;
            newcard.querySelector('.card-text').innerHTML = details;
            newcard.querySelector('.card-image').src = "./images/img" + i + ".jfif"; 

            document.getElementById(collection + "-go-here").appendChild(newcard);
            i++;
            })
        })
}

displayUsers("users");

function insertTeam() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {                                                                 
            console.log(user.uid);
            currentUser = db.collection("users").doc(user.uid);
            currentUser.get()
                  .then(userDoc => {
               var team_Name = userDoc.data().team;
               console.log(team_Name);
               document.getElementById("team-goes-here").innerText = team_Name; 
            })
        } else {
            // No user is signed in.
        }
    });
}
insertTeam();