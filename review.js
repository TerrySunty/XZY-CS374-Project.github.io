var config = {
    apiKey: "AIzaSyC8IHBEyIwBLsqE80vYcW_rvETrcdSEuzg",
    authDomain: "logkids.firebaseapp.com",
    databaseURL: "https://logkids.firebaseio.com",
    projectId: "logkids",
    storageBucket: "logkids.appspot.com",
    messagingSenderId: "77437705828"
};

firebase.initializeApp(config);//initialize firebase

// var name_idx;
// var kid_key;

//chart
var ctxP = document.getElementById("eating-pieChart1").getContext('2d');
  var myPieChart = new Chart(ctxP, {
    type: 'pie',
    data: {
      labels: ["Refuse to eat", "Fish", "Didn't finish lunch", "Apple","Didn't finish lunch", "other"],
      datasets: [{
        data: [6, 4, 3, 2, 1, 1],
        backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360", "#ADD8E6"],
        // hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870", "#A8B3C5", "#616774"]
      }]
    },
    options: {
      responsive: true
    }
  });

  var ctxP = document.getElementById("eating-pieChart2").getContext('2d');
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

var category_menu = document.getElementById('category_select_menu');
var selected_category='';

var range_radios = document.getElementsByName('customRadioInline1');
var selected_range='';


$("input[name='customRadioInline1']").click(function(){

    if(range_radios[0].checked){
        selected_range='Recent one week';
    }
    else if(range_radios[1].checked){
        selected_range='Recent one month';
    }
    else if(range_radios[2].checked){
        selected_range='Recent three months';
    }

});



// var reviewbutton = document.getElementById("review_button");
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





