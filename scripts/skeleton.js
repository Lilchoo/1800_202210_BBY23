//---------------------------------------------------
// This function loads the parts of your skeleton 
// (navbar, footer, and other things) into html doc. 
//---------------------------------------------------
function loadSkeleton(){
    console.log($('#navbarPlaceholder').load('./text/navbar.html'));
    console.log($('#footerPlaceholder').load('./text/footer.html'));
    console.log($('#navbar-with-backPlaceholder').load('./text/navbar_with_back.html'));
}
loadSkeleton();


function backToMain() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {                                                                 
            window.location.assign("main.html");
        } else {
            window.location.assign("index.html")
        }
    });
}

function backToPrevious() {
    
    window.location.assign("myTeam.html");
}