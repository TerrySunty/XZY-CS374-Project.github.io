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

//完成了 tag的增添删除，根据name定位数据库位置
//显示数据库中的tag完成
//点击save，submit向数据库中存储数据完成
var name_idx;
var kid_key;
var eat_save=document.getElementById("eating_save");
var eat_submit=document.getElementById("eating_submit");
var sleep_save=document.getElementById("sleeping_save");
var sleep_submit=document.getElementById("sleeping_submit");
var social_save=document.getElementById("social_save");
var social_submit=document.getElementById("social_submit");
var physical_save=document.getElementById("physical_save");
var physical_submit=document.getElementById("physical_submit");
var cognitive_save=document.getElementById("cognitive_save");
var cognitive_submit=document.getElementById("cognitive_submit");
var literacy_save=document.getElementById("literacy_save");
var literacy_submit=document.getElementById("literacy_submit");
var other_save=document.getElementById("other_save");
var other_submit=document.getElementById("other_submit");

var sleepAnotherLog=document.getElementById("sleeping_ano");
var socialAnotherLog=document.getElementById("social_ano");
var cognitiveAnotherLog=document.getElementById("cognitive_ano");
var physicalAnotherLog=document.getElementById("physical_ano");
var otherAnotherLog=document.getElementById("other_ano");
var eatAnotherLog=document.getElementById("eating_ano");
var literacyAnotherLog=document.getElementById("literacy_ano");

var date=new Date();
var time=date.toLocaleString( );
var time_value=date.getTime();

$(".anotherButton").hide();


eatAnotherLog.onclick=function(){
    $("#hid_eating").show();
    $("#eating_another").hide();
    $("p").hide();
};
sleepAnotherLog.onclick=function(){

    $("#hid_sleeping").show();
    $("#sleeping_another").hide();
    $("p").hide();
};
socialAnotherLog.onclick=function(){
    $("#hid_social").show();
    $("#social_another").hide();
    $("p").hide();
};
cognitiveAnotherLog.onclick=function(){
    $("#hid_cognitive").show();
    $("#cognitive_another").hide();
    $("p").hide();
};
physicalAnotherLog.onclick=function(){

    $("#hid_physical").show();
    $("#physical_another").hide();
    $("p").hide();
};
literacyAnotherLog.onclick=function(){

    $("#hid_literacy").show();
    $("#literacy_another").hide();
    $("p").hide();
};
otherAnotherLog.onclick=function(){

    $("#hid_other").show();
    $("#other_another").hide();
    $("p").hide();
};

eat_submit.onclick=function(){

        var newKey = firebase.database().ref('kidsBox/'+kid_key+'/logBox/eating/').push();
        newKey.set({
            amount:$("input[name='eatAmount']:checked").next("label").text(),
            tag: $(eatid).tagsinput("items"),
            comment:"No comment this time...",
            time:time,
            important:false,
            timeV:time_value
        });

        $("#hid_eating").hide();
        $( "<p><br>You completed a log which may be found in 'Data Review'.</p>" ).insertAfter( "#hid_eating" );
        $("p").addClass("styleConfirm");
        $("#eating_another").show();
};


sleep_submit.onclick=function(){
        var newKey = firebase.database().ref('kidsBox/'+kid_key+'/logBox/sleeping/').push();
        newKey.set({
            amount:$("input[name='sleepTime']:checked").next("label").text(),
            tag: $(sleepingid).tagsinput("items"),
            comment:"No comment this time...",
            time:time,
            important:false,
            timeV:time_value
        });
        $("#hid_sleeping").hide();
        //$(eat_submit).attr("disabled",true);
        $( "<p><br>You completed a log which may be found in 'Data Review'.</p>" ).insertAfter( "#hid_sleeping" );
        $("p").addClass("styleConfirm");
        $("#sleeping_another").show();
};

social_submit.onclick=function(){
        var newKey = firebase.database().ref('kidsBox/'+kid_key+'/logBox/social/').push();
        newKey.set({
            tag: $(socialid).tagsinput("items"),
            comment:"No comment this time...",
            time:time,
            important:false,
            timeV:time_value
        });
        $("#hid_social").hide();
        //$(eat_submit).attr("disabled",true);
        $( "<p><br>You completed a log which may be found in 'Data Review'.</p>" ).insertAfter("#hid_social");
        $("p").addClass("styleConfirm");
        $("#social_another").show();
};

physical_submit.onclick=function(){

        var newKey = firebase.database().ref('kidsBox/'+kid_key+'/logBox/physical/').push();
        newKey.set({
            tag: $(physicalid).tagsinput("items"),
            comment:"No comment this time...",
            time:time,
            important:false,
            timeV:time_value

        });

        $("#hid_physical").hide();
        //$(eat_submit).attr("disabled",true);
        $( "<p><br>You completed a log which may be found in 'Data Review'.</p>" ).insertAfter( "#hid_physical" );
        $("p").addClass("styleConfirm");
        $("#physical_another").show();
};

cognitive_submit.onclick=function(){

        var newKey = firebase.database().ref('kidsBox/'+kid_key+'/logBox/cognitive/').push();
        newKey.set({
            tag: $(cognitiveid).tagsinput("items"),
            comment:"No comment this time...",
            time:time,
            important:false,
            timeV:time_value

        });

        $("#hid_cognitive").hide();
        //$(eat_submit).attr("disabled",true);
        $( "<p><br>You completed a log which may be found in 'Data Review'.</p>" ).insertAfter( "#hid_cognitive" );
        $("p").addClass("styleConfirm");
        $("#cognitive_another").show();
};

literacy_submit.onclick=function(){

        var newKey = firebase.database().ref('kidsBox/'+kid_key+'/logBox/literacy/').push();
        newKey.set({
            tag: $(literacyid).tagsinput("items"),
            comment:"No comment this time...",
            time:time,
            important:false,
            timeV:time_value

        });

        $("#hid_literacy").hide();
        //$(eat_submit).attr("disabled",true);
        $( "<p><br>You completed a log which may be found in 'Data Review'.</p>" ).insertAfter( "#hid_literacy" );
        $("p").addClass("styleConfirm");
        $("#literacy_another").show();
};

other_submit.onclick=function(){
        var newKey = firebase.database().ref('kidsBox/'+kid_key+'/logBox/other/').push();
        newKey.set({
            tag: $(otherid).tagsinput("items"),
            comment:"No comment this time...",
            time:time,
            important:false,
            timeV:time_value
        });

        $("#hid_other").hide();
        //$(eat_submit).attr("disabled",true);
        $( "<p><br>You completed a log which may be found in 'Data Review'.</p>" ).insertAfter( "#hid_other" );
        $("p").addClass("styleConfirm");
        $("#other_another").show();
};


eat_save.onclick=function(){
        var newKey = firebase.database().ref('kidsBox/'+kid_key+'/incompleteBox/eating/').push();
        newKey.set({
            amount:$("input[name='eatAmount']:checked").next("label").text(),
            tag: $(eatid).tagsinput("items"),
            time:time,
            timeV:time_value

        });
         $("#hid_eating").hide();
        //$(eat_save).attr("disabled",true);
  $( "<p><br>You saved a log which may be found in 'Complete Log'.</p>" ).insertAfter( "#hid_eating" );
        $("p").addClass("styleConfirm");
        $("#eating_another").show();

};

sleep_save.onclick=function(){
        var newKey = firebase.database().ref('kidsBox/' + kid_key + '/incompleteBox/sleeping/').push();
        newKey.set({
            amount: $("input[name='sleepTime']:checked").next("label").text(),
            tag: $(sleepingid).tagsinput("items"),
            time: time,
            timeV:time_value

        });
         $("#hid_sleeping").hide();
        //$(eat_save).attr("disabled",true);
  $( "<p><br>You saved a log which may be found in 'Complete Log'.</p>" ).insertAfter( "#hid_sleeping" );
        $("p").addClass("styleConfirm");
        $("#sleeping_another").show();
};

social_save.onclick=function(){
        var newKey = firebase.database().ref('kidsBox/'+kid_key+'/incompleteBox/social/').push();
        newKey.set({
            tag: $(socialid).tagsinput("items"),
            time:time,
            timeV:time_value

        });
         $("#hid_social").hide();
        //$(eat_save).attr("disabled",true);
  $( "<p><br>You saved a log which may be found in 'Complete Log'.</p>" ).insertAfter( "#hid_social" );
        $("p").addClass("styleConfirm");
        $("#social_another").show();
};

physical_save.onclick=function(){
        var newKey = firebase.database().ref('kidsBox/'+kid_key+'/incompleteBox/physical/').push();
        newKey.set({
            tag: $(physicalid).tagsinput("items"),
            time:time,
            timeV:time_value

        });
         $("#hid_physical").hide();
        //$(eat_save).attr("disabled",true);
  $( "<p><br>You saved a log which may be found in 'Complete Log'.</p>" ).insertAfter( "#hid_physical" );
        $("p").addClass("styleConfirm");
        $("#physical_another").show();
};

cognitive_save.onclick=function(){
        var newKey = firebase.database().ref('kidsBox/'+kid_key+'/incompleteBox/cognitive/').push();
        newKey.set({
            tag: $(cognitiveid).tagsinput("items"),
            time:time,
            timeV:time_value

        });
         $("#hid_cognitive").hide();
        //$(eat_save).attr("disabled",true);
  $( "<p><br>You saved a log which may be found in 'Complete Log'.</p>" ).insertAfter( "#hid_cognitive" );
        $("p").addClass("styleConfirm");
        $("#cognitive_another").show();
};

literacy_save.onclick=function(){
 
        var newKey = firebase.database().ref('kidsBox/'+kid_key+'/incompleteBox/literacy/').push();
        newKey.set({
            tag: $(literacyid).tagsinput("items"),
            time:time,
            timeV:time_value
        });
         $("#hid_literacy").hide();
        //$(eat_save).attr("disabled",true);
  $( "<p><br>You saved a log which may be found in 'Complete Log'.</p>" ).insertAfter( "#hid_literacy" );
        $("p").addClass("styleConfirm");
        $("#literacy_another").show();
};

other_save.onclick=function(){

        var newKey = firebase.database().ref('kidsBox/'+kid_key+'/incompleteBox/other/').push();
        newKey.set({
            tag: $(ohterid).tagsinput("items"),
            time:time,
            timeV:time_value
        });
         $("#hid_other").hide();
        //$(eat_save).attr("disabled",true);
  $( "<p><br>You saved a log which may be found in 'Complete Log'.</p>" ).insertAfter( "#hid_other" );
        $("p").addClass("styleConfirm");
        $("#other_another").show();
};


//get name's index, corresponding kid's key in firebase, load current tags in showBox
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
                    read_tag("eating","eatingtag");
                    read_tag("sleeping","sleepingtag");
                    read_tag("social","socialtag");
                    read_tag("physical","physicaltag");
                    read_tag("cognitive","cognitivetag");
                    read_tag("literacy","literacytag");
                    read_tag("other","othertag");
                    setTimeout(bind_tag_write_delete(),2000);
                }
            });
        }
        $(eat_save).attr("disabled",false);
        $(eat_submit).attr("disabled",false);
        $(sleep_save).attr("disabled",false);
        $(sleep_submit).attr("disabled",false);
        $(social_save).attr("disabled",false);
        $(social_submit).attr("disabled",false);
        $(physical_save).attr("disabled",false);
        $(physical_submit).attr("disabled",false);
        $(cognitive_save).attr("disabled",false);
        $(cognitive_submit).attr("disabled",false);
        $(literacy_save).attr("disabled",false);
        $(literacy_submit).attr("disabled",false);
        $(other_save).attr("disabled",false);
        $(other_submit).attr("disabled",false);
    });




}

//-----------------------------Show Box control function, Show Box is related to what will be shown in selected tags only

function read_tag(category="",id=""){

    firebase.database().ref('/kidsBox/'+kid_key+'/showBox/'+category+"/").once("value",function(snapshot){
        var myValue=snapshot.val();
        var str="";
        if(myValue!==null){
            var keyList=Object.keys(myValue);
            for(var i=0;i<keyList.length;i++){
                var myKey=keyList[i];
                str+=myValue[myKey].tag;
                if(i+1!==keyList.length){str+=",";}
            }
        }
        $("#"+id).tagsinput("add",str) //load current tags into input box
    });

}

function delete_tag(category="",item=""){
    return firebase.database().ref('/kidsBox/'+kid_key+'/showBox/'+category).once('value',function(snapshot){
        var myValue=snapshot.val();
        if(myValue!==null){
            var keyList=Object.keys(myValue);
            for(var i=0;i<keyList.length;i++){
                var myKey = keyList[i];
                if(item===myValue[myKey].tag){
                    firebase.database().ref('kidsBox/'+kid_key+'/showBox/'+category).child(myKey).remove();
                    break;
                }
            }

        }
    })
}

function write_tag(category="",item=""){
    if(document.getElementById(category+"tag").value.indexOf(item)!==-1){
        var newKey = firebase.database().ref('kidsBox/'+kid_key+'/showBox/'+category).push();
        newKey.set({
            tag:item
        });}
}

function bind_tag_write_delete(){
    //------------------------------------- Bind delete tag event to each tag (delete on HTML and firebase)-------------------------
    $(eatid).on("itemRemoved",function(event){
        delete_tag("eating",event.item);
    });
    $(sleepingid).on("itemRemoved",function(event){
        delete_tag("sleeping",event.item);
    });
    $(socialid).on("itemRemoved",function(event){
        delete_tag("social",event.item);
    });
    $(physicalid).on("itemRemoved",function(event){
        delete_tag("physical",event.item);
    });
    $(cognitiveid).on("itemRemoved",function(event){
        delete_tag("cognitive",event.item);
    });
    $(literacyid).on("itemRemoved",function(event){
        delete_tag("literacy",event.item);
    });
    $(otherid).on("itemRemoved",function(event){
        delete_tag("other",event.item);
    });
    //------------------------------------- Write added item in to firebase---------------------------------------------------------
    $(eatid).on("itemAdded",function(event){
        write_tag("eating",event.item);
    });
    $(sleepingid).on("itemAdded",function(event){
        write_tag("sleeping",event.item);
    });
    $(socialid).on("itemAdded",function(event){
        write_tag("social",event.item);
    });
    $(physicalid).on("itemAdded",function(event){
        write_tag("physical",event.item);
    });
    $(cognitiveid).on("itemAdded",function(event){
        write_tag("cognitive",event.item);
    });
    $(literacyid).on("itemAdded",function(event){
        write_tag("literacy",event.item);
    });
    $(otherid).on("itemAdded",function(event){
        write_tag("other",event.item);
    });
}
//-----------------------------Show Box control function, Show Box is related to what will be shown in selected tags only
var eatid='#eatingtag';
var sleepingid="#sleepingtag";
var socialid="#socialtag";
var physicalid="#physicaltag";
var cognitiveid="#cognitivetag";
var literacyid='#literacytag';
var otherid="#othertag";

//---------------------------------document loading------------------------------------------------------------------------------
$(document).ready(function(){
    initialize();

});
