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
 //initialize 在click reveiw之后执行
function initialize(){
    firebase.database().ref('/name_index/').once('value', function(snapshot){
        var myValue = snapshot.val();
        if(myValue!==null){
            console.log("getting chosen kid name");
            name_idx=myValue.name_index;
            document.getElementById("head_name").innerHTML=name_idx;//顶部显示的名字
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
                    //后续函数
                    read_log_inTime_range(selected_category,2 )//第二个变量为 总共需要遍历的log数量


                }
            });
        }
    });
}

var category_menu = document.getElementById('category_select_menu');
var selected_category; 

var range_radios = document.getElementsByName('customRadioInline1');
var selected_range='';




$("input[name='customRadioInline1']").click(function(){

    if(range_radios[0].checked){
        selected_range='Recent one week';
    }
    else if(range_radios[1].checked){
        selected_range='Recent one month';
    }


});

var statistic_tag=[];
function read_log_inTime_range(category="",total_logs=0){
    firebase.database().ref('/kidsBox/'+kid_key+'/logBox/'+category+"/").once('value', function(snapshot){
        var myValue = snapshot.val();
        if(myValue!==null){
            console.log("loading logs in time selected: "+category);
            var keyList=Object.keys(myValue);
            for(var i=keyList.length-1;i>keyList.length-total_logs-1;i--){
                console.log(i);
                var myKey=keyList[i];
                console.log(myKey);
                var comments=myValue[myKey].comment;
                var time=myValue[myKey].time;
                var tags=myValue[myKey].tag;
                var important=myValue[myKey].important;
                console.log(comments);
                add_one_log_box(time,tags,important,comments);
            }
        }
    });
}

function add_one_log_box(time="",tags=[],important=false,com=""){
    var div1=document.createElement("div");
    div1.className="row";
    var div2=document.createElement("div");
    div2.className="col-md-12 text-center";

    var hr1 = document.createElement("hr");

    var i_1 = document.createElement("i");
    i_1.className="fas fa-comment-dots fa-lg";

    var h5= document.createElement("h5");
    h5.innerHTML=com;
    
    var p1=document.createElement("p");
    p1.innerHTML="<i class='fas fa-star'></i> important";

    var p2=document.createElement("p");
    p2.className="time_text";
    p2.innerHTML="<small class='text-muted'><i>"+time+"</i></small>";

    var p3=document.createElement("p");
    var tagstr="";
    for (var i=0;i<tags.length;i++){
      statistic_tag.push(tags[i]);
      tagstr+=tags[i];
      if(i+1!==tags.length){
        tagstr+=", ";
      }
    }

    p3.innerHTML="<small class='text-muted'> tags:"+tagstr+"</small>";

    div2.appendChild(hr1);
    div2.appendChild(i_1);
    div2.appendChild(h5);
    if(important===true){
      div2.appendChild(p1);
    }
    div2.appendChild(p2);
    div2.appendChild(p3);
    div1.appendChild(div2);

    $(div1).insertAfter("#category_title");

}

  var ctxP = document.getElementById("eating-pieChart1").getContext('2d');
  var myPieChart = new Chart(ctxP, {
    type: 'pie',
    data: {
      labels: ["Refuse to eat", "Fish", "Didn't finish lunch", "Apple","Didn't finish lunch", "other"],
      datasets: [{
        data: [3, 2, 2, 2, 1, 1],
        backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360", "#ADD8E6"],
        // hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870", "#A8B3C5", "#616774"]
      }]
    },
    options: {
      responsive: true
    }
  });

//eating
var eating_dict={
      labels: ["Ate a lot of vegetables today","Did not finish milk", "Drank the entire bowl of soup", "Disliked celery","Ate some oranges","other"],
      datasets: [{
        data: [4, 2, 2, 1, 1, 1],
        backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360", "#ADD8E6"],
        // hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870", "#A8B3C5", "#616774"]
      }]
};

//sleeping
var sleeping_dict= {
  labels: ["Slept soundly","Had difficulty falling asleep", "Woke up early", "Didn't sleep at all", "Refuse to sleep", "other"],
      datasets: [{
        data: [2, 2, 2, 1, 1, 1],
        backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360", "#ADD8E6"],
        // hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870", "#A8B3C5", "#616774"]
      }]
};

// social
var social_dict= {
      labels: ["Completed a puzzle with a friend", "Had fun playing with other kids", "Made a new friend","Activated to interact with others", "Don't want to talk", "other"],
      datasets: [{
        data: [3, 2, 1, 1, 1, 1],
        backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360", "#ADD8E6"],
        // hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870", "#A8B3C5", "#616774"]
      }]
}

// physical
var physical_dict= {
  labels: ["Walked up stairs on his own","Ate on his own", "Did 5 push-ups :D", "Ran around playground","Lift a toy","other"],
      datasets: [{
        data: [4, 3, 2, 2, 1, 1],
        backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360", "#ADD8E6"],
        // hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870", "#A8B3C5", "#616774"]
      }]
};

// cognitive
var cognitive_dict= {
  labels: ["Walked up stairs on his own","Ate on his own", "Did 5 push-ups :D", "Ran around playground","Lift a toy","other"],
      datasets: [{
        data: [3, 2, 2, 2, 2, 1],
        backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360", "#ADD8E6"],
        // hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870", "#A8B3C5", "#616774"]
      }]
};

//literacy
var literacy_dict= {
  labels: ["Recited the full list of alphabets","Learnt to spell a few words", "Had a debate with the teacher :o", "Expressing love","Polite reply","other"],
      datasets: [{
        data: [3, 3, 2, 2, 2, 1],
        backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360", "#ADD8E6"],
        // hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870", "#A8B3C5", "#616774"]
      }]
};


//other
var other_dict= {
  labels: ["Recited the full list of alphabets","Learnt to spell a few words", "Had a debate with the teacher :o", "Expressing love","Polite reply","other"],
      datasets: [{
        data: [3, 2, 2, 1, 1, 1],
        backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360", "#ADD8E6"],
        // hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870", "#A8B3C5", "#616774"]
      }]
};

//chart


  var ctxP = document.getElementById("pieChart2").getContext('2d');
  var myPieChart = new Chart(ctxP, {
    type: 'pie',
    data: {
      labels: ["Less than usual","Usual portion","More than usual"],

      datasets: [{
        data: [7, 4, 5],
        backgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870"],
        // hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870"]
      }]
    },
    options: {
      responsive: true
    }
  });

//start program





var reviewbutton = document.getElementById("review_btn");
reviewbutton.onclick=function(){
  selected_category=$("#category_select_menu option:selected").val();
  document.getElementById("historyBox").innerHTML=


      "<h4 id=\"category_title\" class=\"text-center lead\">\n" +
      "\n" +
      "                        <!-- all tags in default -->\n" +
      "                        <br>\n" +
      "                        <br>\n" +
      "                        <i class=\"fas fa-clipboard\"></i> \n" +
      "                        All logs in this category: <!--选择的分类-->\n" +
      "                        <br>\n" +
      "                        <br>\n" +
      "                    </h4>\n" +
      "                    <hr>";



  initialize();


};
// createbutton.onclick = function(){

//     setTimeout("window.location.href='./Review Past Data.html'",950)
// };


// var data = {
//   datasets: [{
//     data: [300, 50, 100, 40, 120, 20],
//     backgroundColor: [
//       "#F7464A",
//       "#46BFBD",
//       "#FDB45C", 
//       "#949FB1", 
//       "#4D5360",
//       "#ADD8E6"
//     ]
//   }],
//   labels: ["tag1", "tag2", "tag3", "tag4", "tag5", "other"],
// };


//   $(document).ready(
//   function() {
//     var canvas = document.getElementById("pieChart");
//     var ctx = canvas.getContext("2d");
//     var myNewChart = new Chart(ctx, {
//       type: 'pie',
//       data: data
//     });

//     canvas.onclick = function(evt) {
//       var activePoints = myNewChart.getElementsAtEvent(evt);
//       if (activePoints[0]) {
//         var chartData = activePoints[0]['_chart'].config.data;
//         var idx = activePoints[0]['_index'];

//         var label = chartData.labels[idx];
//         var value = chartData.datasets[0].data[idx];

//         var url = "http://example.com/?label=" + label + "&value=" + value;
//         console.log(url);
//         alert(url);
//       }
//     };
//   }
// );





