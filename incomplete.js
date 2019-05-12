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


var name_idx;
var kid_key;
function initialize(){
    firebase.database().ref('/name_index/').once('value', function(snapshot){
        var myValue = snapshot.val();
        if(myValue!==null){
            console.log("getting chosen kid name");
            var keyList = Object.keys(myValue);
            var myKey = keyList[0];
            name_idx=myValue[myKey];
            document.getElementById("head_name").innerHTML=name_idx;
            firebase.database().ref('/kidsBox/').once('value', function(snapshot){
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
                    //从incompleteBox里获取所有未完成的log
                    read_incomplete("eating");
                    read_incomplete("sleeping");
                    read_incomplete("social");
                    read_incomplete("physical");
                    read_incomplete("cognitive");
                    read_incomplete("literacy");
                    read_incomplete("other");

                }
            });
        }
    });
}

function read_incomplete(category=""){
    firebase.database().ref('/kidsBox/'+kid_key+'/incompleteBox/'+category+"/").once('value', function(snapshot){
        var myValue = snapshot.val();
        if(myValue!==null){
            console.log("loading incomplete logs: "+category);
            var keyList=Object.keys(myValue);
            for(var i=0;i<keyList.length;i++){
                var myKey=keyList[i];
                var head=category.toUpperCase();
                var time=myValue[myKey].time;
                var tags=myValue[myKey].tag;
                add_one_incomplete_box(head,time,tags,myKey);
            }
        }
    });
}

function add_one_incomplete_box(head="",time="",tags=[],key=""){
    var div1=document.createElement("div");
    div1.className="row";
    var div2=document.createElement("div");
    div2.className="col-md-12 text-center";

    var h4=document.createElement("h4");
    switch (head){
        case "EATING": h4.innerHTML="<i class=\"fas fa-utensils\"></i>"+head;break;
        case "SLEEPING":h4.innerHTML="<i class=\"fas fa-bed\"></i>"+head;break;
        case "SOCIAL":  h4.innerHTML="<i class=\"fas fa-user-friends\"></i>"+head;break;
        case "PHYSICAL":h4.innerHTML="<i class=\"fas fa-walking\"></i>"+head;break;
        case "COGNITIVE":h4.innerHTML="<i class=\"fas fa-brain\"></i>"+head;break;
        case "LITERACY":h4.innerHTML="<i class=\"fas fa-comment\"></i>"+head;break;
        case "OTHER":   h4.innerHTML="<i class=\"fas fa-ellipsis-h\"></i>"+head;break;
    }

    var small=document.createElement("small");
    small.className="text-muted";
    var i_tag2=document.createElement("i");
    i_tag2.innerHTML=time;
    small.appendChild(i_tag2);

    var pha=document.createElement("p");
    pha.innerHTML="";
    for(var i=0;i<tags.length;i++){
        pha.innerHTML+=tags[i]+"<br>";
    }
    var link=document.createElement('a');
    link.href="#";
    link.className="btn btn-primary";
    link.innerHTML="Complete it!";
    $(link).on("click",function(){
        setTimeout(function(){
            firebase.database().ref('/incomplete_index/').set({
                category:head.toLowerCase(),
                key_idx:key,
                kid_key:kid_key,
                kname:name_idx
            });
            window.location="Complete Log.html";
        },300);
    });

    div2.appendChild(h4);
    div2.appendChild(small);
    div2.appendChild(pha);
    div2.appendChild(link);
    div1.appendChild(div2);
    var box="#incompBox";
    $(box).append(div1);
    var hr=document.createElement("hr");
    $(box).append(hr);


}
//---------------------------------document loading------------------------------------------------------------------------------
$(document).ready(function(){
    initialize();

});

