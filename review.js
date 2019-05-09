


$( function() {
    var dateFormat = "mm/dd/yy",
      from = $( "#from" )
        .datepicker({
          defaultDate: "-1w",
          changeMonth: true,
          numberOfMonths: 1,
          changeYear: true
        })
        .on( "change", function() {
          to.datepicker( "option", "minDate", getDate( this ) );
        }),
      to = $( "#to" ).datepicker({
        defaultDate: "+0w",
        changeMonth: true,
        numberOfMonths: 1,
        changeYear: true

      })
      .on( "change", function() {
        from.datepicker( "option", "maxDate", getDate( this ) );
      });
 
    function getDate( element ) {
      var date;
      try {
        date = $.datepicker.parseDate( dateFormat, element.value );
      } catch( error ) {
        date = null;
      }
 
      return date;
    }
  } );


// var ctxP = document.getElementById("pieChart").getContext('2d');
//   var myPieChart = new Chart(ctxP, {
//     type: 'pie',
//     data: {
//       labels: ["tag1", "tag2", "tag3", "tag4", "tag5"],

//       datasets: [{
//         data: [300, 50, 100, 40, 120],
//         backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360"],
//         hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870", "#A8B3C5", "#616774"]
//       }]
//     },
//     options: {
//       responsive: true
//     }
//   });

var data = {
  datasets: [{
    data: [300, 50, 100, 40, 120, 20],
    backgroundColor: [
      "#F7464A",
      "#46BFBD",
      "#FDB45C", 
      "#949FB1", 
      "#4D5360",
      "#ADD8E6"
    ]
  }],
  labels: ["tag1", "tag2", "tag3", "tag4", "tag5", "other"],
};


  $(document).ready(
  function() {
    var canvas = document.getElementById("pieChart");
    var ctx = canvas.getContext("2d");
    var myNewChart = new Chart(ctx, {
      type: 'pie',
      data: data
    });

    canvas.onclick = function(evt) {
      var activePoints = myNewChart.getElementsAtEvent(evt);
      if (activePoints[0]) {
        var chartData = activePoints[0]['_chart'].config.data;
        var idx = activePoints[0]['_index'];

        var label = chartData.labels[idx];
        var value = chartData.datasets[0].data[idx];

        var url = "http://example.com/?label=" + label + "&value=" + value;
        console.log(url);
        alert(url);
      }
    };
  }
);




