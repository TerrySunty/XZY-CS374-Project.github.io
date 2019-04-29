var config = {
    apiKey: "AIzaSyC8IHBEyIwBLsqE80vYcW_rvETrcdSEuzg",
    authDomain: "logkids.firebaseapp.com",
    databaseURL: "https://logkids.firebaseio.com",
    projectId: "logkids",
    storageBucket: "logkids.appspot.com",
    messagingSenderId: "77437705828"
};
firebase.initializeApp(config);

function writeToDatabase(comment) {
    var newKey = firebase.database().ref('/kidsBox/').push();
    newKey.set({
        name:comment
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
    var img=document.createElement('image');

    img.href=photo_path;


    var div3=document.createElement('div');
    div3.class='card-body';
    var pha=document.createElement('p');
    pha.class='card-name text-center';
    pha.innerHTML=kidname;


    var div4 =document.createElement('div');
    div4.class="d-flex justify-content-between align-items-center";

    div3.appendChild(pha);
    div3.appendChild(div4);
    div2.appendChild(svg);
    div2.appendChild(img);
    div2.appendChild(div3);
    link.appendChild(div2);
    div1.appendChild(link);
    var add_id=$("#add-icon");
    $(div1).insertBefore(add_id);


}

$( document ).ready(function(){

});