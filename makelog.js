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
//显示数据库中的tag尚未完成
//点击save，submit向数据库中存储数据尚未完成




var name_idx;
function read_name_index(){
     firebase.database().ref('/name_index/').once('value', function(snapshot){
        var myValue = snapshot.val();
        if(myValue!==null){
            var keyList = Object.keys(myValue);
            var myKey = keyList[0];
            name_idx=myValue[myKey];
            locate();
        }
    });
}

var kid_key;
function locate(){
    firebase.database().ref('/kidsBox/').once('value', function(snapshot){
        var myValue = snapshot.val();
        if(myValue!==null){
            var keyList = Object.keys(myValue);
            for(var i=0;i<keyList.length;i++){
                var myKey = keyList[i];
                if(name_idx===myValue[myKey].name){
                    kid_key=myKey;
                    break;
                }
            }
        }
    })
}


function initialize(){
    firebase.database().ref('/name_index/').once('value', function(snapshot){
        var myValue = snapshot.val();
        if(myValue!==null){
            console.log("1");
            var keyList = Object.keys(myValue);
            var myKey = keyList[0];
            name_idx=myValue[myKey];
            firebase.database().ref('/kidsBox/').once('value', function(snapshot){
                var myValue = snapshot.val();
                if(myValue!==null){
                    console.log("2");
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
                }
            });
        }
    });




}

//-----------------------------Show Box control function, Show Box is related to what will be shown in selected tags only


function read_tag(category="",id=""){
    firebase.database().ref('/kidsBox/'+kid_key+'/showBox/'+category+"/").once("value",function(snapshot){
        var myValue=snapshot.val();
        var str="";
        if(myValue!==null){
            console.log('3');
            var keyList=Object.keys(myValue);
            for(var i=0;i<keyList.length;i++){
                var myKey=keyList[i];
                str+=myValue[myKey].tag;
                if(i+1!==keyList.length){str+=",";}
            }
        }
        document.getElementById(id).value=str;
    });
}
function delete_tag(category="",item=""){
    return firebase.database().ref('kidsBox'+kid_key+'/showBox/'+category).once('value',function(snapshot){
        var myValue=snapshot.val();
        if(myValue!==null){
            var keyList=Object.keys(myValue);
            for(var i=0;i<keyList.length;i++){
                var myKey = keyList[i];
                if(item===myValue[myKey].tag){
                firebase.database().ref('kidsBox'+kid_key+'/showBox/'+category).child(myKey).remove();
                break;
                }
            }

        }
    })
}

function write_tag(category="",item=""){
    var newKey = firebase.database().ref('kidsBox'+kid_key+'/showBox/'+category).push();
    newKey.set({
        tag:item
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
    //------------------------------------- Bind delete tag event to each tag (delete on HTML and firebase)-------------------------


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
    //------------------------------------- Write added item in to firebase---------------------------------------------------------

});
