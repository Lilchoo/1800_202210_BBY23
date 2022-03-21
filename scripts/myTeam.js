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