const myData = [100, 80, 60, 40, 20];
d3.select("#chart")
    .selectAll("div")
    .data(myData)
    .attr("class", "bar")
    .style("width", function (d) { return d + "px" })
    .style("width", d => d + "px")