//config of firebase
var config = {
    apiKey: "AIzaSyC8IHBEyIwBLsqE80vYcW_rvETrcdSEuzg",
    authDomain: "logkids.firebaseapp.com",
    databaseURL: "https://logkids.firebaseio.com",
    projectId: "logkids",
    storageBucket: "logkids.appspot.com",
    messagingSenderId: "77437705828"
};

firebase.initializeApp(config);//initialize firebase

function initialize(){
firebase.database().ref('/name_index/').once('value', function(snapshot){
    var myValue = snapshot.val();
    if(myValue!==null){
        console.log("getting chosen kid name");
        var keyList = Object.keys(myValue);
        var myKey = keyList[0];
        name_idx=myValue[myKey];
        document.getElementById("head_name").innerHTML=name_idx;
    }});
}
$(document).ready(function(){
    initialize();

});