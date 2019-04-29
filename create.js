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


var age=document.getElementById('age');
var gender=document.getElementsByName('gender')



function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
var photo_index=getRandomInt(0,20);//先简易实现,后期修改

var createbutton=document.getElementById("createButton");
createbutton.onclick=function(){

};
