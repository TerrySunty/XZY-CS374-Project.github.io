var config = {
    apiKey: "AIzaSyC8IHBEyIwBLsqE80vYcW_rvETrcdSEuzg",
    authDomain: "logkids.firebaseapp.com",
    databaseURL: "https://logkids.firebaseio.com",
    projectId: "logkids",
    storageBucket: "logkids.appspot.com",
    messagingSenderId: "77437705828"
};
firebase.initializeApp(config);//initialize firebase


$(document).ready(function() {

    $("#button").click(function(){
        $(".addTag").effect( "highlight", {color:"#00eee0"}, 3000 );
    });

    $("input").tagsinput('items');
});