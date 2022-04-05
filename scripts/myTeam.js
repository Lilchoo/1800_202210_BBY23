firebase.auth().onAuthStateChanged(user => {
    if (user) {
        console.log(user.uid);
        currentUser = db.collection("users").doc(user.uid);
        displayUsers("users");
        insertTeam();
    } else {
        str = "<h1 class='text-dark my-3' id='myTeam-title'>Please log in!</h1>" +
            "<div class='d-grid gap-2 d-sm-flex justify-content-sm-center'>" +
            "<button type='button' class='btn btn-lg mx-auto my-3' style='background-color: #E63946; max-width: fit-content'><a href='./login.html'" +
            "class='text-light text-decoration-none'>Log in</a></button></div>" + "<div class='mt-4 text-center'><img src='/images/login.png' style='max-width: 250px;'/></div>"
        document.getElementById("myTeam-container").innerHTML = str;
    }
})

function displayUsers(collection) {
    let cardTemplate = document.getElementById("userCardTemplate");
    db.collection(collection).get()
        .then(snap => {
            var i = 1;
            snap.forEach(doc => {
                var userID = doc.id;
                console.log(userID);
                var memberName = doc.data().name;
                var role = doc.data().role;
                var status = doc.data().status;
                let str = "<div class='my-1' style='background-color: ";
                if (status == "red") {
                    str += "#E63946; color: white; width:100%'><a><abbr title='Bad health condition!'>High Risk";
                } else if (status == "green") {
                    str += "darkgreen; color: white; width:100%'><a><abbr title='Good health!'>Low Risk";
                } else if (status == "orange") {
                    str += "orange; color: black; width:100%'><a><abbr title='Recovering!'>Medium Risk";
                }
                str += "</abbr></a></div>";
                let newcard = cardTemplate.content.cloneNode(true);

                newcard.querySelector('.card-title').innerHTML = memberName;
                newcard.querySelector('.card-text').innerHTML = role + "<br/>" + str;
                newcard.querySelector('.card-image').src = "./images/img" + i + ".jfif";

                newcard.querySelector('.more').href = "assignInstruction.html?memberName=" + memberName + "&id=" + userID;

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