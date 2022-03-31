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
                console.log("role: " + role + "\nemail: " + email);
                let str = "role: " + role + "<br>email: " + email;
                document.getElementById("info-goes-here").innerHTML = str;
                getHealthInfo(userID);
            }
        })
    })

    document.getElementById("memberName").innerHTML = memberName;

}
showInfo();


function getHealthInfo(userID) {
    console.log("getHealthInfo function");
    var currentResult = db.collection("Results");
    currentResult.get()
        .then(snap => {
            snap.forEach(resultDoc => {
                var documentID = resultDoc.id;
                currentResult.doc(documentID).get()
                    .then(document => {
                        var id = document.data().userID;
                        // console.log(id);
                        if (id == userID) {
                            var currentDocID = document.id;
                            console.log("found the result document with id: " + currentDocID);
                            let currentDoc = document.data();
                            values=Object.values(currentDoc);
                            keys=Object.keys(currentDoc);
                            let str = "";
                            for (let i = 0; i < values.length; i++) {
                                if (keys[i]=="close_contact" &&  values[i]== "yes") {
                                    str += "Has close contact with "
                                }
                                if (values[i]) {
                                    console.log(keys[i]);
                                    return 
                                }
                            }
                        }
                    })
            })
        })
}