var width = "100%";
var height = 400;
scale = d3.scale.linear().domain([0, 100]).range([0, 2 * pi]);
var myFields = function(next1, next2){
	return data = [
	{
		"primary1":67,
		"primary2": 13
	}, {
		"unit1":"attack",
		"secondary1":next1,
		"unit2":"defense",
		"secondary2":next2
	},{
		"other1":22,
		"other2":43
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

/* gaugeGroup.append("svg:circle")	
  .attr("r", 150).attr("fill", "none")
  .attr("class", "gauge1 outerGauge ")
  .attr("stroke", "green")
  .attr("stroke-width", 10); 

 gaugeGroup.append("svg:circle")	
  .attr("r", 140).attr("fill", "none")
  .attr("class", "gauge1 outerGauge ")
  .attr("stroke", "red")
  .attr("stroke-width", 10);
*/
var addstats = function(){

}

var svg = d3.select("mychart")
var render = function(data){
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

    gaugeGroup.selectAll(".gauge")
    .data(data)
    .enter()
    .append("svg:path")
    .attr("d",function(d){
    return arc1(d);
    })
    .attr("stroke-width",0)
    .attr("fill", "green");

    gaugeGroup.selectAll(".gauge")
    .data(data)
    .enter()
    .append("svg:path")
    .attr("d",function(d){
    return arc2(d);
    })
    .attr("stroke-width",0)
    .attr("fill", "red");
}


$(function(){
$(".pikachu").click(function(){
	addstats();
})
render(myFields(Math.random()*100,Math.random()*100));	
$('.mychart').prepend('<img id="pikachu" class="centered picture"src="/img/pikachu1.png" />');

})

