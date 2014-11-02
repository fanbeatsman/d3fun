var pi=Math.PI;
var w = 960,
    h = 500,
    x = d3.scale.linear().domain([0, 100]).range([0, 2 * pi]);


var fields = [
  {name: "hours", value: 0, size: 24},
  {name: "minutes", value: 0, size: 60},
  {name: "seconds", value: 0, size: 60}
];

var arc = d3.svg.arc()
    .innerRadius(100)
    .outerRadius(140)
    .startAngle(0)
    .endAngle(function(d) { return (d.value / d.size) * 2 * Math.PI; });

var svg = d3.select("body").append("svg:svg")
    .attr("width", w)
    .attr("height", h)
  .append("svg:g")
    .attr("transform", "translate(0," + (h / 2) + ")");
var fuck = function() {
  var now = new Date();

  fields[0].previous = fields[0].value; fields[0].value = now.getHours();
  fields[1].previous = fields[1].value; fields[1].value = now.getMinutes();
  fields[2].previous = fields[2].value; fields[2].value = now.getSeconds();

  var path = svg.selectAll("path")
      .data(fields.filter(function(d) { return d.value; }), function(d) { return d.name; });

  path.enter().append("svg:path")
      .attr("transform", function(d, i) { return "translate(" + x(i) + ",0)"; })
    .transition()
      .ease("elastic")
      .duration(750)
      .attrTween("d", arcTween);

  path.transition()
      .ease("elastic")
      .duration(750)
      .attrTween("d", arcTween);

  path.exit().transition()
      .ease("bounce")
      .duration(750)
      .attrTween("d", arcTween)
      .remove();

}


setInterval(function(){fuck();},1000);


function arcTween(b) {
  var i = d3.interpolate({value: b.previous}, b);
  return function(t) {
    return arc(i(t));
  };
}