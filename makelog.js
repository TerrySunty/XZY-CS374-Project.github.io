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



function writeToDatabase(age,kidname,kidgender,photo) {
    var newKey = firebase.database().ref('/kidsBox/').push();
    newKey.set({
        age:age,
        gender:kidgender,
        name:kidname.value,
        photo_path:photo
    });
}

function readFromDatabase() {
    return firebase.database().ref('/kidsBox/').once('value', function(snapshot) {

        var div;
        var insertID='#insert';
        var myValue = snapshot.val();
        if(myValue!==null){
            var keyList = Object.keys(myValue);
            for(var i=0;i<keyList.length;i++) {
                var myKey = keyList[i];
                age=myValue[myKey].age;
                kidgender=myValue[myKey].gender;
                kidname=myValue[myKey].name;
                path=myValue[myKey].photo_path;
                div=htmladd(kidname,path);
                $(div).insertBefore(insertID);
            }

        }
    });
}

$(document).ready(function(){

});
