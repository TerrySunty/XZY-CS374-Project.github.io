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


var preBox={
    eating:{t1:{tag:"Ate a lot of vegetables today"},t2:{tag:"Did not finish milk"},t3:{tag:"Drank the entire bowl of soup"}},
    sleeping:{t1:{tag:"Slept soundly"},t2:{tag:"Had difficulty falling asleep"},t3:{tag:"Woke up early"}},
    social:{t1:{tag:"Had fun playing with other kids"},t2:{tag:"Completed a puzzle with a friend"},t3:{tag:"Made a new friend"}},
    physical:{t1:{tag:"Walked up stairs on his own"},t2:{tag:"Ate on his own"},t3:{tag:"Did 5 push-ups :D"}},
    cognitive:{t1:{tag:"Completed a puzzle set without help"},t2:{tag:"Curious about a friend's bruise"}},
    literacy:{t1:{tag:"Recited the full list of alphabets"},t2:{tag:"Learnt to spell a few words"},t3:{tag:"Had a debate with the teacher :o"}},
    other:{t1:{tag:"other"}}

};

function writeToDatabase(age,kidname,kidgender,photo) {
    var newKey = firebase.database().ref('/kidsBox/').push();
    newKey.set({
        age:age,
        gender:kidgender,
        name:kidname.value,
        photo_path:photo,
        showBox:preBox
    });
}





function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}








var createbutton=document.getElementById("createButton");

createbutton.onclick=function(){
    age=$("#ageinput option:selected").val();
    var photo_path="https://raw.githubusercontent.com/TerrySunty/XZY-CS374-Project.github.io/master/kids_png/"+kidgender+"s_png/"+kidgender+"-"+getRandomInt(1,20)+".png";
    writeToDatabase(age,kidname,kidgender,photo_path);
    setTimeout("window.location.href='./index.html'",950)
};
