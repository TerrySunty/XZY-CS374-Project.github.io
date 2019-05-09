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


var age;
var filter=document.getElementsByName('gridRadios');
var kidname=document.getElementById('name');
var kidgender='boy';


$("input[name='gridRadios']").click(function(){

    if(filter[1].checked){
        kidgender='girl';
    }


});

function writeToDatabase(age,kidname,kidgender,photo) {
    var newKey = firebase.database().ref('/kidsBox/').push();
    newKey.set({
        age:age,
        gender:kidgender,
        name:kidname.value,
        photo_path:photo
    });
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}








var createbutton=document.getElementById("createButton");

createbutton.onclick=function(){
    age=$("#ageinput option:selected").val();
    var photo_path="https://raw.githubusercontent.com/TerrySunty/XZY-CS374-Project.github.io/master/kids_png/"+kidgender+"s_png/"+kidgender+"-"+getRandomInt(0,20)+".png";
    writeToDatabase(age,kidname,kidgender,photo_path);
    setTimeout("window.location.href='./index.html'",900)
};
