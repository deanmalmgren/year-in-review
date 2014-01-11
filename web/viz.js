
var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 100;

var parseDate = d3.time.format("%Y-%m-%d %H:%M:%S").parse;

var x = d3.time.scale()
    .range([0, width])
    .domain([new Date(2013,0,1), new Date(2013,11,31)]);
var x_bounds = x.domain();
var x_tick_values = [];
d3.range(12).forEach(function (month) {
    x_tick_values.push(new Date(x_bounds[0].getFullYear(), month, 15));
});
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .tickValues(x_tick_values)
    .tickFormat(d3.time.format("%B"))

var y = d3.scale.linear()
    .range([height, 0]);
var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

// convenience methods for converting events to weeks and weeks to dates
var ms_per_week = 86400 * 1000 * 7;
function event2week(event) {
    return Math.floor((event.datetime - x_bounds[0]) / ms_per_week);
}
function week2datetime(week) {
    return new Date(Date.UTC(
	x_bounds[0].getFullYear(), x_bounds[0].getMonth(), 
	x_bounds[0].getDate(), 0, 0, 0, week * ms_per_week
    ))
}
function month2datetime(month) {
    var datetime = new Date(
	x_bounds[0].getFullYear(), x_bounds[0].getMonth(), x_bounds[0].getDate()
    )
    datetime.setMonth(month)
    return datetime
}

d3.csv("data/twitter.csv", add_timeseries("twitter"));
d3.csv("data/github.csv", add_timeseries("github"));
d3.csv("data/stackoverflow.csv", add_timeseries("stackoverflow"));
d3.csv("data/mercurial.csv", add_timeseries("mercurial"));
d3.csv("data/gcal.csv", add_timeseries("gcal"));

function add_timeseries(data_type) {

    return function(error, events) {

	// convert to Date objects
	events.forEach(function(event) {
	    event.datetime = parseDate(event.datetime);
	});

	// omit events that are out of bounds
	events = events.filter(function (event) {
	    return x_bounds[0] < event.datetime && event.datetime < x_bounds[1];
	});

	// aggregate data by week using a nest
	// https://github.com/mbostock/d3/wiki/Arrays#-nest
	var data = d3.nest().key(event2week).entries(events);
	
	// set y-axis domain
	y.domain([0, d3.max(data, function (week_events) {
	    return week_events.values.length;
	})])
	    .nice();
	
	// main svg object
	var svg = d3.select("#"+data_type)
	    .append("svg")
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
	    .append("g")
	    .attr("transform", "translate("+margin.left+","+margin.top+")");

	// tooltip for displaying more information
	tip = d3.tip()
	    .attr('class', 'd3-tip')
	    .direction('n')
	    .offset([-10, 0])
	    .html(function(d) {
		return d.values.length
	    });
	svg.call(tip);

	// add some backgrounds to highlight the months
	svg.selectAll(".month")
	    .data(d3.range(12)).enter()
	    .append("rect")
	    .attr("class", function (d){
		var cls = "odd"
		if (d%2===0) {
		    cls = "even"
		}
		return "month " + cls;
	    })
	    .attr("x", function (d) {return x(month2datetime(d))})
	    .attr("width", function (d) {return x(month2datetime(d+1))-x(month2datetime(d))})
	    .attr("y", 0)
	    .attr("height", height);
    
	// axes
	svg.append("g")
	    .attr("class", "x axis")
	    .attr("transform", "translate(0," + height + ")")
	    .call(xAxis);
    	svg.append("g")
	    .attr("class", "y axis")
	    .call(yAxis)
	    .append("text")
	    .attr("transform", "rotate(-90)")
	    .attr("y", 5)
	    .attr("dy", ".71em")
	    .style("text-anchor", "end")
	    .text(data_type)

	// show the counts per week
	svg.selectAll(".count")
	    .data(data).enter()
	    .append("rect")
	    .attr("class", "count")
	    .attr("x", function (d) {return x(week2datetime(Number(d.key)));})
	    .attr("width", width/52)
	    .attr("y", function (d) {return y(d.values.length)})
	    .attr("height", function (d) {return y(0) - y(d.values.length)})
	    .on('mouseover', tip.show)
	    .on('mouseout', tip.hide)

    }
}
