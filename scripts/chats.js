
// Used to make divs clickable, current changes inner html to test and print


async function listenPlease() {
var clickedChat = document.querySelectorAll('.clickableClass');
console.log("tyring to print the nodelist", clickedChat);
clickedChat.forEach((matchBox)=> {  matchBox.addEventListener('click', function(event) {
    document.getElementById("clickableID").innerHTML = "Now displaying your chat!";
    console.log("this id ? is", this.id);
    


});
})
}

async function populateChat(selectedChat) {

}

//Checks if user is logged in and then populates their matches into the sidebar.
var currentUser;

firebase.auth().onAuthStateChanged(user => {
    if (user) {
      currentUser = db.collection("users").doc(user.uid); //global
      console.log(currentUser);
      populateMatches();
    
    } else {
      // No user is signed in.
      console.log("No user is signed in");
      window.location.href = "login.html";
    }
  });

 

  async function populateMatches(id) {
    currentUser.get().then((userDoc) => {
        matchList = userDoc.data().matches;
        console.log(matchList);
        makeCardMatchesFromTemplate(matchList)

    });


}

async function makeCardMatchesFromTemplate(arg) {
    var parkingspotCardTemplate = document.getElementById("sideBarMatch");
    var parkingspotCardGroup = document.getElementById("matchGroup");
    for (i = 0; i < arg.length; i++) {
        console.log("im inside the loop lol", arg[i]);
        db.collection("users").where("userID", "==", arg[i])
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            var name = doc.data().name;
            var matchId = doc.id;
            console.log("the match Id is", matchId);
            console.log("tyring to print the name", name);
            console.log(doc.id, " => ", doc.data());
            let matchCard = parkingspotCardTemplate.content.cloneNode(true);
            matchCard.querySelector(".nameClass").innerHTML = name;
            parkingspotCardGroup.appendChild(matchCard).then(listenPlease());
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
    listenPlease();
    }
 }
 
 




