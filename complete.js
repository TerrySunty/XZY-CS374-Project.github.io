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
var time;
function initialize(){
    firebase.database().ref('/incomplete_index/').once('value', function(snapshot){
        var myValue = snapshot.val();
        if(myValue!==null){
            console.log("getting into chosen kid's incomplete log");
            chosen_category =myValue.category;
            kid=myValue.kid_key;
            log_key=myValue.key_idx;
            document.getElementById("kid_name_title").innerHTML=myValue.kname;
            var cate=document.getElementById("complete_category");
            switch (chosen_category){
                case "eating": cate.innerHTML="<i class=\"fas fa-utensils\"></i> "+chosen_category.toUpperCase();break;
                case "sleeping":cate.innerHTML="<i class=\"fas fa-bed\"></i> "+chosen_category.toUpperCase();break;
                case "social":  cate.innerHTML="<i class=\"fas fa-user-friends\"></i> "+chosen_category.toUpperCase();break;
                case "physical":cate.innerHTML="<i class=\"fas fa-walking\"></i> "+chosen_category.toUpperCase();break;
                case "cognitive":cate.innerHTML="<i class=\"fas fa-brain\"></i> "+chosen_category.toUpperCase();break;
                case "literacy":cate.innerHTML="<i class=\"fas fa-comment\"></i> "+chosen_category.toUpperCase();break;
                case "other":   cate.innerHTML="<i class=\"fas fa-ellipsis-h\"></i> "+chosen_category.toUpperCase();break;
            }
            firebase.database().ref('/kidsBox/'+kid+"/incompleteBox/"+chosen_category+"/"+log_key+"/").once('value', function(snapshot){
                var myValue = snapshot.val();
                if(myValue!==null){
                    console.log("locating incomplete "+chosen_category+" log");
                    var tags=myValue.tag;
                    var amount=myValue.amount;
                    time=myValue.time;
                    //在这里写后续的函数
                    switch(chosen_category){
                        case 'eating':
                            document.getElementById("amount_title").innerHTML="Amount Eaten";
                            document.getElementById("amount").innerHTML=amount;
                            break;
                        case "sleeping":
                            document.getElementById("amount_title").innerHTML="Time slept for";
                            document.getElementById("amount").innerHTML=amount;
                            break;
                        default:break;
                    }
                    document.getElementById("up_right_time").innerHTML="Recorded on: <i>"+time+"</i>";
                    read_tag(tags);
                    add_history();
                }
            });
        }
    });
}
function add_history(){
    firebase.database().ref('/kidsBox/'+kid+"/logBox/"+chosen_category+"/").once('value', function(snapshot){
        var myValue = snapshot.val();
        if(myValue!==null){
            var keyList = Object.keys(myValue);
            var len=keyList.length;
            var myKey;
            var tags;
            var time;
            var comment;
            if(len<3){
                for(var i=0;i<len;i++){
                    myKey=keyList[i];
                    tags=myValue[myKey].tag;
                    time=myValue[myKey].time;
                    comment=myValue[myKey].comment;
                    history_item(tags,time,comment);
                }
            }
            else{
                for(i=0;i<3;i++){
                    myKey=keyList[i];
                    tags=myValue[myKey].tag;
                    time=myValue[myKey].time;
                    comment=myValue[myKey].comment;
                    history_item(tags,time,comment);
                }
            }
        }
    });
}
function history_item(tags=[],time="",comment=""){
    var div1=document.createElement("div");
    div1.className="histTable";

    var div2=document.createElement("div");
    div2.className="col-md-12 text-left";

    var table=document.createElement("table");

    var tr1=document.createElement("tr");
    var td1_1=document.createElement('td');
    td1_1.innerHTML="<b>Tag:&ensp;</b>";
    var td1_2=document.createElement("td");
    for(var i=0;i<tags.length;i++){
        var label=document.createElement("label");
        label.className="histTag";
        label.innerHTML=tags[i];
        td1_2.append(label);
        td1_2.append(" ");
    }
    tr1.appendChild(td1_1);
    tr1.appendChild(td1_2);

    var tr2=document.createElement("tr");
    var td2_1=document.createElement("td");
    td2_1.innerHTML="<b>Recorded:&ensp;</b>";
    var td2_2=document.createElement("td");
    td2_2.innerHTML="<i>"+time+"</i>";
    tr2.appendChild(td2_1);
    tr2.appendChild(td2_2);

    var tr3=document.createElement("tr");
    tr3.innerHTML="<td>&nbsp</td><td>&nbsp</td>";

    var tr4=document.createElement("tr");
    var td4_1=document.createElement("td");
    td4_1.innerHTML="<b>Comment:&ensp;</b>";
    var td4_2=document.createElement("td");
    td4_2.innerHTML=comment;
    tr4.appendChild(td4_1);
    tr4.appendChild(td4_2);

    table.appendChild(tr1);
    table.appendChild(tr2);
    table.appendChild(tr3);
    table.appendChild(tr4);
    div2.appendChild(table);
    div1.appendChild(div2);

    var continerid="#history_container";
    $(continerid).append(div1);
    $(continerid).append("<br>");
}

//-----------------------------Show Box control function, Show Box is related to what will be shown in selected tags only
//loading current tag,and bind write_tag
function read_tag(tags=[]){
        var str="";
        for(var i=0;i<tags.length;i++){
            str+=tags[i];
            if(i+1!==tags.length){str+=",";}
            }

        $("#selected_tags").tagsinput("add",str); //load current tags into input box
        bind_tag_write_delete();
}

//add added tags into firebase, push showbox, replace incomplete box's tag
function write_tag(category="",item=""){
    if(document.getElementById("selected_tags").value.indexOf(item)!==-1){
        var newKey = firebase.database().ref('kidsBox/'+kid+'/showBox/'+category).push();
        newKey.set({
            tag:item
        });
        firebase.database().ref('/kidsBox/'+kid+"/incompleteBox/"+category+"/"+log_key+"/").set({
            tag:$("#selected_tags").tagsinput("items")
        });

    }

}

function bind_tag_write_delete(){
    //------------------------------------- Write added item in to firebase---------------------------------------------------------
    $("#selected_tags").on("itemAdded",function(event){
        write_tag(chosen_category,event.item);
    });

}

var save=document.getElementById("save");
var submit=document.getElementById("submit");
var important=false;
var date=new Date();
var current_time=date.toLocaleString( );
var check_important=document.getElementsByName('important');

$("input[name='important']").click(function(){

    if(!check_important[0].checked){
        important=true;
    }


});

save.onclick=function(){
    firebase.database().ref('/kidsBox/'+kid+"/incompleteBox/"+category+"/"+log_key+"/").set({
        tag:$("#selected_tags").tagsinput("items"),
        amount:document.getElementById("amount").innerHTML,
        time:time,
        comment:document.getElementById("comments").innerHTML
    });
    alert("You have success fully saved this log!");
};

submit.onclick=function(){
    var Newkey=firebase.database().ref('/kidsBox/'+kid+"/logBox/"+chosen_category+"/").push();
    var comments=document.getElementById("comments").innerHTML;
    if (comments===""){comments="No comment this time";}
    Newkey.set({
        tag:$("#selected_tags").tagsinput("items"),
        amount:document.getElementById("amount").innerHTML,
        time:current_time,
        comment:comments,
        important:important
    });
    firebase.database().ref('/kidsBox/'+kid+"/incompleteBox/"+chosen_category+"/"+log_key+"/").remove();
    alert("You have submitted this log successfully!");
    window.location="Incomplete Log List.html"
};

//-----------------------------Show Box control function, Show Box is related to what will be shown in selected tags only

//---------------------------------document loading------------------------------------------------------------------------------
$(document).ready(function(){
    initialize();

});