
var fields = function(){
	var currentTime, hour, minute, second;
	currentTime = new Date();
	second = currentTime.getSeconds();
	minute = currentTime.getMinutes();
	hour = currentTime.getHours() + minute / 60;
	return data = [
	{
		"unit":"seconds",
		"numeric": second
	}, {
		"unit": "minutes",
		"numeric": minute
	},{
		"unit": "hours",
		"numeric": hour
	}
	];
};

var width, height, offSetX, offSetY, pi, scaleSecs, scaleHours;
width = 400;
height = 200;
offSetX = 150;
offSetY = 100;

pi = Math.PI;
scaleSecs = d3.scale.linear().domain([0, 59 + 999/1000]).range([0, 2 * pi]);
scaleMins = d3.scale.linear().domain([0, 59 + 59/60]).range([0, 2 * pi]);
scaleHours = d3.scale.linear().domain([0, 11 + 59/60]).range([0, 2 * pi]);

var vis, clockGroup;
var data =[4,5,66,7,88]
vis = d3.selectAll(".chart")
  .append("svg:svg")
  .attr("width", width)
  .attr("height", height);

clockGroup = vis.append("svg:g")
  .attr("transform", "translate(" + offSetX + "," + offSetY + ")");

clockGroup.append("svg:circle")	
  .attr("r", 80).attr("fill", "none")
  .attr("class", "clock outercircle")
  .attr("stroke", "black")
  .attr("stroke-width", 2);

clockGroup.append("svg:circle")
  .attr("r", 4)
  .attr("fill", "black")
  .attr("class", "clock innercircle");


d3.select(".barchart")
.selectAll("div")
.data(data)
.enter().append("div")
.style("width",function(d){return d*10+"px";})
.text(function(d){return d;});
$(function(){
	console.log("QRT");
});

