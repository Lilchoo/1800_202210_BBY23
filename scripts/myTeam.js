firebase.auth().onAuthStateChanged(user => {
    if (user) {                                                                 
        console.log(user.uid);
        currentUser = db.collection("users").doc(user.uid);
        displayUsers("users");
        insertTeam();
    } else {
        str = "<h1 class='text-dark my-3' id='myTeam-title'>Please log in!</h1>"
        + "<div class='d-grid gap-2 d-sm-flex justify-content-sm-center'>"
        + "<button type='button' class='btn btn-lg mx-auto my-3' style='background-color: #F74F20; max-width: fit-content'><a href='./login.html'"
        + "class='text-light text-decoration-none'>Log in</a></button></div>" + "<div class='mt-4 text-center'><img src='/images/login.png' style='max-width: 250px;'/></div>"
        document.getElementById("myTeam-container").innerHTML = str;
    }
})

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

function insertTeam() {
    
            currentUser.get()
                  .then(userDoc => {
               var team_Name = userDoc.data().team;
               console.log(team_Name);
               document.getElementById("team-goes-here").innerText = team_Name; 
            })
        } 