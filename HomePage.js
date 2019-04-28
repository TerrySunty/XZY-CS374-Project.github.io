var config = {
    apiKey: "AIzaSyC8IHBEyIwBLsqE80vYcW_rvETrcdSEuzg",
    authDomain: "logkids.firebaseapp.com",
    databaseURL: "https://logkids.firebaseio.com",
    projectId: "logkids",
    storageBucket: "logkids.appspot.com",
    messagingSenderId: "77437705828"
};
firebase.initializeApp(config);

function writeToDatabase(comment) {
    var newKey = firebase.database().ref('/kidsBox/').push();
    newKey.set({
        name:comment
    });
}



$( document ).ready(function(){

});