function goToInstruction() {
    window.location.assign("instruction.html");
}

function showInfo() {
    let params = new URL(window.location.href);
    let id = params.searchParams.get("id");
    console.log(id);
    let memberName = params.searchParams.get("memberName");

    db.collection("users").get().
    then(snap => {
        snap.forEach(doc => {
            var userID = doc.id;
            if (userID == id) {
                var role = doc.data().role;
                var email = doc.data().email;
                let str = "role: " + role + "<br>email: " + email;
                document.getElementById("info-goes-here").innerHTML = str;
            }
        })
    })

    document.getElementById("memberName").innerHTML = memberName;

}
showInfo();