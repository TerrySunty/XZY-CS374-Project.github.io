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
var filter=document.getElementsByName('gender');
var kidname=document.getElementById('name');
var kidgender='boy';

$("input[name='filter']").click(function(){

    if(filter[1].checked){
        kidgender='girl';
    }


});

function writeToDatabase(age,kidname,kidgender) {
    var newKey = firebase.database().ref('/kidsBox/').push();
    newKey.set({
        age:age,
        gender:kidgender,
        name:kidname
    });
}


function htmladd(age,kidname,kidgender){
    var div1=document.createElement('div');
    div1.class="col-6 col-sm-4 col-md-3 col-lg-2 py-4";

    var link=document.createElement('a');
    link.href="task choosing.html";

    var div2=document.createElement('div');
    div2.class="card";
    var svg=document.createElement('svg');
    svg.xmlns="http://www.w3.org/2000/svg";
    svg.xmlns.xlink="http://www.w3.org/1999/xlink";
    




    var div3=document.createElement('div');
    var div4=document.createElement('div');
}


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
var photo_index=getRandomInt(0,20);//先简易实现,后期修改

var createbutton=document.getElementById("createButton");
createbutton.onclick=function(){
    writeToDatabase(age,kidname,kidgender);

};
