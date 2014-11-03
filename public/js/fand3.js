var width = "100%";
var height = 400;
var pi = Math.PI;
function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
//barchart data global



scale = d3.scale.linear().domain([0, 100]).range([0, 2 * pi]);
x = d3.scale.ordinal().domain(d3.range(3)).rangePoints([0, width], 2);
var myFields = function(next1, next2){
	return [
	{
//		"primary1":67,
//		"primary2": 13
	}, {
//		"unit1":"attack",
		"secondary1":next1,
//		"unit2":"defense",
		"secondary2":next2
	},{
//		"other1":22,
//		"other2":43
	}
	];
};
var offSetY = 200;



var chart = d3.selectAll(".mychart")
	.append("svg:svg")
	.attr("width", width)
	.attr("height", height);

var offSetX = $(".mychart").width()/2;

var gaugeGroup = chart.append("svg:g")
  .attr("transform", "translate(" + offSetX + "," + offSetY + ")");
var nova=gaugeGroup.append("circle")	
  .attr("r", 700).attr("fill", "none")
  .attr("class", "gauge1 outerGauge ")
  .attr("stroke", "green")
  .attr("stroke-width", 8);


 /*gaugeGroup.append("svg:circle")	
  .attr("r", 160).attr("fill", "none")
  .attr("class", "gauge1 outerGauge ")
  .attr("stroke", "red")
  .attr("stroke-width", 10);
*/

var svg = d3.select("mychart");
var render = function(data){

	data[0].previous=0;
	data[1].previous=0;
	data[2].previous=0;
	console.log(data[0]);

	var arc1 = d3.svg.arc()
    .innerRadius(100)
    .outerRadius(120)
    .startAngle(0)
    .endAngle(function(d){
			return scale(d.secondary1);
		});
    var arc2= d3.svg.arc()
    .innerRadius(120)
    .outerRadius(140)
    .startAngle(0)
    .endAngle(function(d){
			return scale(d.secondary2);
		});
    var arc0= d3.svg.arc()
    .innerRadius(120)
    .outerRadius(140)
    .startAngle(0)
    .endAngle(function(d){
			return scale(0);
		});


    var path = gaugeGroup.selectAll("path")
    .data(data);

    gaugeGroup.selectAll(".gauge")
    .data(data)
    .enter()
    .append("svg:path")
    .attr("transform", function(d, i) { return "translate(" + scale(i) + ",0)"; })
    .transition()
    .ease("elastic")
      .duration(750)
      .attrTween("d", arcTween)
      //.attr("d",function(d){
      //	return arc0(d);
      //});

gaugeGroup.selectAll(".gauge").selectAll("svg:path").transition()
.ease("elastic")
      .duration(1000)
      .delay(500)
      .attrTween("d", arcTween)
      .attr("d",function(d){
      	return arc1(d);
      });

    gaugeGroup.selectAll(".gauge")
    .data(data)
    .enter()
    .append("svg:path")
    .attr("d",function(d){
    return arc2(d);
    })
    .attr("stroke-width",0)
    .attr("fill", "red");
console.log("qwrreq");
    function arcTween(b) {
  var i = d3.interpolate({value: b.previous}, b);
  return function(t) {
    return arc1(i(t));
  };
}
}
//---------------------------------bar chart-------------------------

var width = 420,
    barHeight = 20;

var data = [33,45];
var dataHolder = function(){
	return data;
}    


function renderbar(data){


	var x = d3.scale.linear()
    .domain([0, d3.max(data)])
    .range([0, d3.max(data)*2]);

var barchart = d3.select(".barchart")
    .attr("width", d3.max(data)*2)
    .attr("height", barHeight * data.length);

var bar = barchart.selectAll("g")
    .data(data)
  .enter().append("g")
    .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });



bar.selectAll("rect").remove();
var myRect=bar.append("rect")
    .attr("width", 0)
    .attr("height", barHeight - 1);



myRect.transition()
.ease("elastic")
      .duration(1000)
      .delay(500)
.attr("width",x);

bar.append("text")
    .attr("x", function(d) { return x(d) - 3; })
    .attr("y", barHeight / 2)
    .attr("dy", ".35em")
    .text(function(d) { console.log("QWEREREQWWRERWRQ");console.log(d);return d; });
}

function addstats(stat1,stat2){
	console.log(data[0]);
	data[0]=data[0]+stat1;
	console.log(data[0]);
	data[1]=data[1]+stat2;
	renderbar(data);
}
function removecurrent(){

  nova.transition()
  .attr('r',0);

	var begone = d3.selectAll("path");
	begone.transition()
	.duration(750)
	//.attrTween("d",arcTween)
	.remove();
	d3.select(".barchart").remove();
	$("body").append("<svg class=\"barchart\"></div>");

  window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

  var field = document.getElementById("field");
  var ball = document.getElementById("ball");
  var ball2 = document.getElementById("ball2");
$("#ball").css("background",getRandomColor());
  var maxX = field.clientWidth - ball.offsetWidth;
  var maxY = field.clientHeight - ball.offsetHeight;

  var duration = 5; // seconds
  var gridSize = 50; // pixels

  var start = null;

  
  function step(timestamp)
  {

    var progress, x, y;
    if(start === null) start = timestamp;

    progress = (timestamp - start) / duration / 300; // percent

    x = progress *progress*progress* maxX/gridSize; // x = ƒ(t)
    y = 1 * Math.sin(x+9)-0.5; // y = ƒ(x)


    ball.style.right = Math.min(maxX, gridSize * x) + "px";
    ball.style.top = maxY/2 + (gridSize * y) + "px";


    if(progress >= 1){
    	$("#ball").attr("right","0px").toggle(); 
    	
    	return; 
    }
    requestAnimationFrame(step);
  }

  requestAnimationFrame(step);

	$("img").toggle("fast");


}

/*var ballField = d3.select("#field").append("svg:svg");

var ballFieldSvg=ballField.append("svg:g")
  .attr("transform", "translate(" + offSetX + "," + offSetY + ")");
 
 var nova=ballFieldSvg.append("circle")	
  .attr("r", 700).attr("fill", "none")
  .attr("class", "gauge1 outerGauge ")
  .attr("stroke", "green")
  .attr("stroke-width", 8); */

$(function(){
		renderbar(data);
render(myFields(Math.random()*100,Math.random()*100));	
$('.mychart').append('<img id="pikachu" class="centered picture"src="/img/pikachu1.png" />');
$("#pikachu").css("transform", "translate(" + offSetX + "," + offSetY + ")");
$("#pikachu").click(function(){

	removecurrent();
	setTimeout(function(){
		addstats(6,9);
	},900);
	
	console.log("stop clicking me");
}).hover(function(){
	console.log("hover");
})

});

