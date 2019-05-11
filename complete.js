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



var kid;
var chosen_category;
var log_key;
function initialize(){
    firebase.database().ref('/incomplete_index/').once('value', function(snapshot){
        var myValue = snapshot.val();
        if(myValue!==null){
            console.log("getting into chosen kid's incomplete log");
            var keyList = Object.keys(myValue);
            var myKey = keyList[0];
            kid=myValue[myKey].kid_key;
            chosen_category=myValue[myKey].category;
            log_key=myValue[myKey].key_idx;
            firebase.database().ref('/kidsBox/'+kid+"/incompleteBox/"+chosen_category+"/"+log_key+"/").once('value', function(snapshot){
                var myValue = snapshot.val();
                if(myValue!==null){
                    console.log("locating kid");
                    var keyList = Object.keys(myValue);
                    for(var i=0;i<keyList.length;i++){
                        var myKey = keyList[i];
                        if(name_idx===myValue[myKey].name){
                            kid_key=myKey;
                            break;
                        }
                    }
                    //在这里写后续的函数

                }
            });
        }
    });
}


//---------------------------------document loading------------------------------------------------------------------------------
$(document).ready(function(){
    initialize();

});