var config = {
    apiKey: "AIzaSyC8IHBEyIwBLsqE80vYcW_rvETrcdSEuzg",
    authDomain: "logkids.firebaseapp.com",
    databaseURL: "https://logkids.firebaseio.com",
    projectId: "logkids",
    storageBucket: "logkids.appspot.com",
    messagingSenderId: "77437705828"
};
firebase.initializeApp(config);



var age;
var kidname;
var kidgender;
var path;

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

function htmladd(kidname,path){// add a new kid box, use data fetched from firebase
    var div1=document.createElement('div');
    div1.className="col-6 col-sm-4 col-md-3 col-lg-2 py-4";

    var link=document.createElement('a');
    link.href="#";
    $(link).on("click","p",function(){
        var name=this.innerHTML;
        setTimeout(function(){
            firebase.database().ref('/name_index/').set({
                name_index:name
            });
            window.location="task choosing.html";
        },300);
    });
    var div2=document.createElement('div');
    div2.className="card";

    var img=document.createElement('img');
    img.className="card-img-top";
    $(img).attr("src",path);
    $(img).attr("alt","Card image cap");


    var div3=document.createElement('div');
    div3.className='card-body';
    var pha=document.createElement('p');
    pha.className='card-name text-center';
    pha.innerHTML=kidname;


    var div4 =document.createElement('div');
    div4.className="d-flex justify-content-between align-items-center";
    div3.appendChild(pha);
    div3.appendChild(div4);
    div2.appendChild(img);
    div2.appendChild(div3);
    link.append(div2);
    div1.appendChild(link);
    return div1



}

$( document ).ready(function(){
    readFromDatabase();
});