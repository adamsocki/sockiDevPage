var svg = d3.select("#subway")
    .append("svg")
    .attr("width", 600)
    .attr("height", 600);

var stations = [];
var lines = [];
var colors = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#9400D3", "#8B0000"];

d3.select("#addLine").on("click", function() {
    var newLine = {id: lines.length, stations: []};
    lines.push(newLine);

    d3.select("#buttons")
        .append("button")
        .attr("id", "addStation" + newLine.id)
        .text("Add Station to Line " + (newLine.id + 1))
        .on("click", function() {
            var newStation = {id: stations.length + 1, x: Math.random() * 600, y: Math.random() * 600, lineIndex: newLine.id};
            stations.push(newStation);
            newLine.stations.push(newStation);
            update();
            mergeStations();
        });
});

var drag = d3.drag()
    .on("drag", function(d) {
        d.x = d3.event.x;
        d.y = d3.event.y;
        d3.select(this).attr("cx", d.x).attr("cy", d.y);
        updateLines();
        mergeStations();
    });

function update() {
    var circles = svg.selectAll("circle").data(stations, function(d) { return d.id; });
    circles.enter().append("circle")
        .attr("class", "station")
        .attr("r", 10)
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; })
        .style("fill", function(d) {
            if (d.merged) {  
                return "url(#gradient" + d.id + ")";
            } else {
                return colors[d.lineIndex];
            }
        })
        .call(drag)
        .merge(circles);
    circles.exit().remove();
    
    updateLines();
}

function mergeStations() {
    var mergeDistance = 15; 
    for (var i = 0; i < stations.length; i++) {
        for (var j = i + 1; j < stations.length; j++) {
            var dx = stations[i].x - stations[j].x;
            var dy = stations[i].y - stations[j].y;
            var distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < mergeDistance) {
                stations[i].merged = true;
                stations[j].merged = true;
                stations[i].color2 = colors[stations[j].lineIndex];
                stations[j].color2 = colors[stations[i].lineIndex];
                updateGradient(stations[i], stations[j]);
            }
        }
    }
    update();
}

function updateLines() {
    svg.selectAll("line").remove();
    lines.forEach(function(line) {
        for (var i = 0; i < line.stations.length - 1; i++) {
            svg.append("line")
                .attr("class", "line")
                .attr("x1", line.stations[i].x)
                .attr("y1", line.stations[i].y)
                .attr("x2", line.stations[i + 1].x)
                .attr("y2", line.stations[i + 1].y);
            }
        });
    }
    
    function updateGradient(station1, station2) {
        var gradient = svg.append("defs")
            .append("linearGradient")
            .attr("id", "gradient" + station1.id)
            .attr("x1", "0%")
            .attr("y1", "0%")
            .attr("x2", "100%")
            .attr("y2", "0%");
    
        gradient.append("stop")
            .attr("offset", "50%")
            .attr("stop-color", colors[station1.lineIndex]);
    
        gradient.append("stop")
            .attr("offset", "50%")
            .attr("stop-color", colors[station2.lineIndex]);
    }