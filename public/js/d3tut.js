
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


var render = function(data){
	var hourArc, minuteArc, secondArc;
	clockGroup.selectAll(".clockhand").remove();
	secondArc=d3.svg.arc()
		.innerRadius(0)
		.outerRadius(70)
		.startAngle(function(d){
			return scaleSecs(d.numeric);
		})
		.endAngle(function(d){
			return scaleSecs(d.numeric);
		});

	minuteArc=d3.svg.arc()
		.innerRadius(0)
		.outerRadius(70)
		.startAngle(function(d){
			return scaleMins(d.numeric); //wut? no specifying array index? theres 3 numeric keys
		})
		.endAngle(function(d){
			return scaleMins(d.numeric);
		});

	hourArc=d3.svg.arc()
		.innerRadius(0)
		.outerRadius(50)
		.startAngle(function(d){
			return scaleHours(d.numeric%12);
		})
		.endAngle(function(d) {
    return scaleHours(d.numeric % 12);
  });

	clockGroup.selectAll(".clockhand")
	.data(data)
	.enter()
	.append("svg:path")
	.attr("d", function(d){//<g transform></> attr d is a string containing a bunch of path descriptions like MoveTo CurveTo..
		if (d.unit === "seconds"){
			return secondArc(d);
		}else if (d.unit === "minutes"){
			return minuteArc(d);
		}else if (d.unit === "hours"){
			return hourArc(d);
		}
	})
	.attr("class", "clockhand")
	.attr("stroke", "black")
	.attr("stroke-width", function(d){
		if (d.unit === "seconds"){
			return 2;
		}else if (d.unit === "minutes"){
			return 3;
		}else if (d.unit === "hours"){
			return 4;
		}
	})
	.attr("fill","none");

};

setInterval(function(){
	var data;
	data = fields();
	return render(data);
},1000);



var data =[4,5,66,7,88]
var x = d3.scale.linear()
	.domain([0,d3.max(data)])
	.range([0,d3.max(data)*10]);


visavis = d3.select(".barchart")
.selectAll("div")
.data(data) //is .data made to pass down "data" as the variable d?
.enter().append("div")
.style("width",function(d){return (x(d)+"px");})
.text(function(d){return d;});

visavis.append("svg:svg")
	.attr("height",height)
	.attr("width",width);

$(function(){
	console.log("QRT");
});

