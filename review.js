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
                    read_log_inTime_range(selected_category,8)//第二个变量为 总共需要遍历的log数量


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
            for(var i=0;i<total_logs;i++){

                var index=keyList.length-i-1;
                console.log(index);
                var myKey=keyList[index];

                var comments=myValue[myKey].comment;
                var time=myValue[myKey].time;
                console.log(time);
                var tags=myValue[myKey].tag;
                var important=myValue[myKey].important;
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

    $("#historyBox").append(div1);

}



//chart


  // var ctxP = document.getElementById("eating-pieChart2").getContext('2d');
  // var myPieChart = new Chart(ctxP, {
  //   type: 'pie',
  //   data: {
  //     labels: ["Less than usual","Usual portion","More than usual"],

  //     datasets: [{
  //       data: [7, 4, 5],
  //       backgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870"],
  //       // hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870"]
  //     }]
  //   },
  //   options: {
  //     responsive: true
  //   }
  // });

//start program







var reviewbutton = document.getElementById("review_btn");
reviewbutton.onclick=function(){
    selected_category=$("#category_select_menu option:selected").val();
    document.getElementById("chart_place").innerHTML="";
    var chartBox=document.getElementById("chart_place");

    var div1=document.createElement("div");//Amount chart
    div1.className="container pieChart2-container";
    div1.innerHTML="<div class=\"album\">\n" +
      "<div class=\"chart-container text-center\">\n" +
      "<strong class=\"lead\"><i class=\"fas fa-chart-pie\"></i>Amount</strong>\n" +
      "<canvas id=\"pieChart2\" class=\"chart\"></canvas>\n" +
      "</div>\n" +
      "</div>";


    var div2=document.createElement("div");
    div2.className="container";
    div2.innerHTML=
      "<div class=\"album\">\n" +
      "<div class=\"chart-container text-center\">\n" +
      "<strong class=\"lead\"><i class=\"fas fa-chart-pie\"></i>Top-5 used tags and other tags</strong>\n" +
      "<canvas id=\"pieChart1\" class=\"chart\"></canvas>\n" +
      "</div>\n" +
      "</div>\n";
    // if(selected_category==="eating" || selected_category==="sleeping"){
      chartBox.append(div1);
    // }
    chartBox.append(div2);

    document.getElementById("historyBox").innerHTML=
      "<h4 id=\"category_title\" class=\"text-center lead\">\n" +
      "\n" +
      "                        <!-- all tags in default -->\n" +
      "                        <br>\n" +
      "                        <br>\n" +
      "                        <i class=\"fas fa-clipboard\"></i> \n" +
      "                        log list: <!--选择的分类-->\n" +
      "                        <br>\n" +
      "                        <br>\n" +
      "                    </h4>\n" +
      "                    <hr>";


  initialize();

  // var ctxP1 = document.getElementById("pieChart1").getContext('2d');
  // var myPieChart1 = new Chart(ctxP1, {
  //   type: 'pie',
  //   data: {
  //     labels: ["Refuse to eat", "Fish", "Didn't finish lunch", "Apple","Didn't finish lunch", "other"],
  //     datasets: [{
  //       data: [4, 2, 2, 1, 1, 1],
  //       backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360", "#ADD8E6"],
  //       // hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870", "#A8B3C5", "#616774"]
  //     }]
  //   },
  //   options: {
  //     responsive: true
  //   }
  // });

  // var ctxP2 = document.getElementById("pieChart2").getContext('2d');
  // var myPieChart2 = new Chart(ctxP2, {
  //   type: 'pie',
  //   data: {
  //     labels: ["Less than usual","Usual portion","More than usual"],

  //     datasets: [{
  //       data: [7, 4, 5],
  //       backgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870"],
  //       // hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870"]
  //     }]
  //   },
  //   options: {
  //     responsive: true
  //   }
  // });


  var ctxP1 = document.getElementById("pieChart1").getContext('2d');
  var myPieChart1 = new Chart(ctxP1, {
    type: 'pie',
    data: {
      labels: ["Refuse to eat", "Fish", "Didn't finish lunch", "Apple","Didn't finish lunch", "other"],
      datasets: [{
        data: [4, 2, 2, 1, 1, 1],
        backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360", "#ADD8E6"],
        // hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870", "#A8B3C5", "#616774"]
      }]
    },
    options: {
      responsive: true
    }
  });

  

  var ctxP2 = document.getElementById("pieChart2").getContext('2d');
  var myPieChart2 = new Chart(ctxP2, {
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


    switch(selected_category) {
      case 'eating': 
        myPieChart1.data=eating_dict;
        myPieChart1.update();
        myPieChart2.data=eating_amount_dict;
        myPieChart2.update();
        break;

      case 'sleeping':
        myPieChart1.data=sleeping_dict;
        myPieChart1.update();
        myPieChart2.data=sleeping_amount_dict;
        myPieChart2.update();
        break;

      case 'social':
        myPieChart1.data=social_dict;
        myPieChart1.update();
        $(".pieChart2-container").remove();
        myPieChart2.reset();

        break;


      case 'physical':
        myPieChart1.data=physical_dict;
        myPieChart1.update();
        $(".pieChart2-container").remove();
        myPieChart2.reset();

        break;

      case 'cognitive':
        myPieChart1.data=cognitive_dict; 
        myPieChart1.update();
        $(".pieChart2-container").remove();
        myPieChart2.reset();
        break;

      case 'literacy':
        myPieChart1.data=literacy_dict; 
        myPieChart1.update();
        $(".pieChart2-container").remove();
        myPieChart2.reset();
        break;

      case 'other':
        myPieChart1.data=other_dict; 
        myPieChart1.update();
        $(".pieChart2-container").remove();
        myPieChart2.reset();
        break;

    }

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

//tags dictionaties

//eating
var eating_dict={
      labels: ["Ate a lot of cabbage","Ate some oranges", "Finished all his food very quickly", "Disliked green peas","Told me cabbage was delicious","other"],
      datasets: [{
        data: [4, 2, 2, 2, 2, 6],
        backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360", "#ADD8E6"],
        // hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870", "#A8B3C5", "#616774"]
      }]
};

var eating_amount_dict={
      labels: ["Less than usual","Usual portion","More than usual"],

      datasets: [{
        data: [3, 3, 2],
        backgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870"],
        // hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870"]
      }]
};

//sleeping
var sleeping_dict= {
  labels: ["Slept soundly","Had difficulty falling asleep", "Didn't want to wake up", "Didn't sleep at all", "Refuse to sleep", "other"],
      datasets: [{
        data: [1, 2, 1, 2, 1, 1],
        backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360", "#ADD8E6"],
        // hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870", "#A8B3C5", "#616774"]
      }]
};

var sleeping_amount_dict={
      labels: ["Less than 2 hours","2 - 3 hours","More than 3 hours"],

      datasets: [{
        data: [4, 1, 1],
        backgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870"],
        // hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870"]
      }]
};

// social
var social_dict= {
      labels: ["Completed a puzzle with a friend", "Had fun playing with other kids", "Made a new friend","Activated to interact with others", "Don't want to talk", "other"],
      datasets: [{
        data: [1, 2, 1, 1, 1, 1],
        backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360", "#ADD8E6"],
        // hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870", "#A8B3C5", "#616774"]
      }]
};

// physical
var physical_dict= {
  labels: ["Walked up stairs on his own","Ate on his own", "Did 5 push-ups :D", "Ran around playground","Lift a toy","other"],
      datasets: [{
        data: [2, 2, 2, 1, 1, 1],
        backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360", "#ADD8E6"],
        // hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870", "#A8B3C5", "#616774"]
      }]
};

// cognitive
var cognitive_dict= {
  labels: ["Completed a puzzle set without help","Curious about a friend's bruise", "Recognize complex images", "Think logically","Feeling differently","other"],
      datasets: [{
        data: [3, 2, 1, 1, 1, 0],
        backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360", "#ADD8E6"],
        // hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870", "#A8B3C5", "#616774"]
      }]
};

//literacy
var literacy_dict= {
  labels: ["Recited the full list of alphabets","Reading a book", "Clear articulation", "Spoke new vocabulary","Talked to other child","other"],
      datasets: [{
        data: [2, 1, 1, 3, 2, 0],
        backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360", "#ADD8E6"],
        // hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870", "#A8B3C5", "#616774"]
      }]
};


//other
var other_dict= {
  labels: [ "Negative","Had a tantrum", "Scolded his friend", "other"],
      datasets: [{
        data: [3, 2, 2, 0],
        backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360", "#ADD8E6"],
        // hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870", "#A8B3C5", "#616774"]
      }]
};



