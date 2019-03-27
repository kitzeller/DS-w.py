function main(){
    var margin = {top: 10, right: 30, bottom: 30, left: 40},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    var x = d3.scaleLinear()
        .range([0, width])
        .domain([0,10]);
    var y = d3.scaleLinear()
        .range([height, 0]);

    var histogram = d3.histogram()
        .value(function(d) { return d.OverallQual; })
        .domain(x.domain());

    var svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("data/train.csv").then(function(data){

        console.log(data);
        // group the data for the bars
        var bins = histogram(data);

        // Scale the range of the data in the y domain
        y.domain([0, d3.max(bins, function(d) { return d.length; })]);

        // append the bar rectangles to the svg element
        svg.selectAll("rect")
            .data(bins)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", 1)
            .attr("transform", function(d) {
                return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
            .attr("width", function(d) { return x(d.x1) - x(d.x0) -1 ; })
            .attr("height", function(d) { return height - y(d.length); });

        // add the x Axis
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        // add the y Axis
        svg.append("g")
            .call(d3.axisLeft(y));

    });


}

main();