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
                    read_log_inTime_range(selected_category)//第二个变量为 总共需要遍历的log数量


                }
            });
        }
    });
}


var selected_category;
var range_radios = document.getElementsByName('customRadioInline1');
var selected_range;




$("input[name='customRadioInline1']").click(function(){

    if(range_radios[0].checked){
        selected_range=7;
    }
    else if(range_radios[1].checked){
        selected_range=30;
    }


});
var today=new Date();
function get_end_Time(days_num) {
    return today - 60 * 60 * 1000 * 24 * days_num;
}

var statistic_tag=[];
var amount_statistic=[];
var dataset;
var dataset_array;//获取到的所有tag的数组，无重复，到时候用在label
var amount_set;
var amountset_array;//获取到的所有amount，无重复，label
var amount_count=[];//amount的出现次数
var count=[];//每个tag出现的次数，位置对应array的index
function read_log_inTime_range(category=""){
    firebase.database().ref('/kidsBox/'+kid_key+'/logBox/'+category+"/").once('value', function(snapshot){
        var myValue = snapshot.val();
        if(myValue!==null){
            console.log("loading logs in time selected: "+category);
            var keyList=Object.keys(myValue);
            for(var i=0;i<keyList.length;i++){
                var index=keyList.length-i-1;
                console.log(index);
                var myKey=keyList[index];
                //在这里增加时间比对的函数
                var time=myValue[myKey].time;
                var comments=myValue[myKey].comment;

                console.log(time);
                var tags=myValue[myKey].tag;
                var important=myValue[myKey].important;
                add_one_log_box(time,tags,important,comments);
                if(category==="eating"||category==="sleeping"){
                    amount_statistic.push(myValue[myKey].amount)
                }
            }

            if(category==="eating"||category==="sleeping"){
                amount_set=new Set(amount_statistic);
                amountset_array=Array.from(amount_set);
                for(i=0;i<amountset_array.length;i++){
                    amount_count.push(count_num(amountset_array[i],amount_statistic));
                }
            }

            dataset=new Set(statistic_tag);
            dataset_array=Array.from(dataset);
            for(i=0;i<dataset_array.length;i++){
                count.push(count_num(dataset_array[i],statistic_tag));}
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


//计算元素出现的次数
function count_num(tag="",array=[]){
    var num=0;
    for(var i=0; i<array.length;i++){
        if(tag===array[i]){
            num+=1;
            array.splice(i,1);
        }
    }
    return num;
}



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
      chartBox.append(div1);
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
      "                    </h4>";


  initialize();
  var ctxP1 = document.getElementById("pieChart1").getContext('2d');
  var myPieChart1 = new Chart(ctxP1, {
    type: 'pie',
    data: {
      labels: dataset_array,
      datasets: [{
        data: count,
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
    labels: amountset_array,
    datasets: [{
      data: amount_count,
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
        break;

      case 'sleeping':
        break;

      case 'social':

        myPieChart1.update();
        $(".pieChart2-container").remove();
        myPieChart2.reset();

        break;


      case 'physical':

        myPieChart1.update();
        $(".pieChart2-container").remove();
        myPieChart2.reset();

        break;

      case 'cognitive':

        myPieChart1.update();
        $(".pieChart2-container").remove();
        myPieChart2.reset();
        break;

      case 'literacy':

        myPieChart1.update();
        $(".pieChart2-container").remove();
        myPieChart2.reset();
        break;

      case 'other':

        myPieChart1.update();
        $(".pieChart2-container").remove();
        myPieChart2.reset();
        break;

    }

};
