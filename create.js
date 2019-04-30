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


var age=document.getElementById('ageinput').value;
var filter=document.getElementsByName('gridRadios');
var kidname=document.getElementById('name').innerText;
var kidgender='boy';


$("input[name='filter']").click(function(){

    if(filter[1].checked){
        kidgender='girl';
    }


});

function writeToDatabase(age,kidname,kidgender,photo) {
    var newKey = firebase.database().ref('/kidsBox/').push();
    newKey.set({
        age:age,
        gender:kidgender,
        name:kidname,
        photo_path:photo
    });
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}








var createbutton=document.getElementById("createButton");

createbutton.onclick=function(){
    var photo_path="kids_png/"+kidgender+"s_png/"+kidgender+"-"+getRandomInt(0,20)+".png";
    writeToDatabase(age,kidname,kidgender,photo_path);
    window.location.replace('index.html');
    return false;
};
