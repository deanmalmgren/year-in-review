
var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 70 - margin.top - margin.bottom;

var parseDate = d3.time.format("%Y-%m-%d %H:%M:%S").parse;

var x = d3.time.scale()
    .range([0, width])
    .domain([new Date(2013,0,1), new Date(2013,11,31)]);

var y = d3.scale.linear()
    .range([height, 0])
    .domain([0,1]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

d3.csv("data/twitter.csv", add_timeseries("twitter"));
d3.csv("data/github.csv", add_timeseries("github"));
d3.csv("data/stackoverflow.csv", add_timeseries("stackoverflow"));
d3.csv("data/mercurial.csv", add_timeseries("mercurial"));

function add_timeseries(data_type) {

    return function(error, data) {

	// convert to Date objects
	data.forEach(function(d) {
	    d.datetime = parseDate(d.datetime);
	});

	var svg = d3.select("#"+data_type)
	    .append("svg")
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
	    .append("g")
	    .attr("transform", "translate("+margin.left+","+margin.top+")");
    
	svg.append("g")
	    .attr("class", "x axis")
	    .attr("transform", "translate(0," + height + ")")
	    .call(xAxis);
    
	svg.append("g")
	    .attr("class", "y axis")
	    .append("text")
	    .attr("transform", "rotate(-90)")
	    .attr("y", -30)
	    .attr("dy", ".71em")
	    .style("text-anchor", "end")
	    .text(data_type);
    
	svg.selectAll(".event")
	    .data(data).enter()
	    .filter(function (d) {}))
	    .append("line")
	    .attr("class", "event")
	    .attr("x1", function (d){return x(d.datetime)})
	    .attr("x2", function (d){return x(d.datetime)})
	    .attr("y1", y(0))
	    .attr("y2", y(1))
    }
}
