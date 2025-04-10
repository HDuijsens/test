// Define the column names for x and y at the beginning
const xColumn = 'Leeftijd';  // Replace with your actual x-axis column name
const yColumn = 'Gemiddelde schoolcijfer';  // Replace with your actual y-axis column name
const studieColumn = 'Studie';  // Column for color
const inkomenColumn = 'Inkomen';  // Column for size
const geslachtColumn = 'StudentID';  // Column for hover information

// Set margins, width, and height for the SVG container
const margin = { top: 100, right: 100, bottom: 100, left: 100 };
const width = 1000 - margin.left - margin.right;
const height = 800 - margin.top - margin.bottom;

// Append the SVG element
const svg = d3.select("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

svg.append("rect")
    .attr("x", -100)  // Make the rectangle 50px wider than the graph on the left
    .attr("y", -100)  // Make the rectangle 50px taller than the graph on the top
    .attr("width", width + margin.right+ 100)  // Increase width by 100px (50px on each side)
    .attr("height", height + margin.bottom + 100)  // Increase height by 100px (50px on each side)
    .attr("fill", "lightgray")  // Set the background color (light gray here)
    .attr("opacity", 0.5);  // Adjust opacity (0 is fully transparent, 1 is fully opaque)


// Load data from the CSV file
d3.csv("data/data.csv").then(function(data) {
  console.log("Data loaded successfully:", data); // Debugging line
  const tooltip = d3.select("#tooltip");

  // Process the data (convert x and y to numbers)
  data.forEach(function(d) {
    d[xColumn] = +d[xColumn];  // Convert the x column to a number
    d[yColumn] = +d[yColumn];  // Convert the y column to a number
    d[inkomenColumn] = +d[inkomenColumn];
  });

  // Create scales for the X and Y axes
  const xScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d[xColumn])]) // Set the domain of the x-axis
    .range([0, width]);

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d[yColumn])]) // Set the domain of the y-axis
    .range([height, 0]);


  // Create a color scale based on the 'Studie' column (categorical)
  const colorScale = d3.scaleOrdinal(d3.schemeCategory10)  // Use D3's built-in color scheme
    .domain([...new Set(data.map(d => d[studieColumn]))]);  // Get unique values from the 'Studie' column

  // Create a size scale based on the 'Inkomen' column (linear)
  const sizeScale = d3.scaleLinear()
    .domain([d3.min(data, d => d[inkomenColumn]), d3.max(data, d => d[inkomenColumn])]) // Set domain for 'Inkomen'
    .range([5, 20]); // Map 'Inkomen' to a circle radius range (from 5 to 20)

  // Create X and Y axes
  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale)
    .tickPadding(15);

  // Add X and Y axes to the SVG container
  svg.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(xAxis)
    .attr("class", "axis");

  svg.append("g")
    .call(yAxis)
    .attr("class", "axis");


    svg.append("text")
    .attr("x", width / 2)
    .attr("y", height + margin.bottom / 2)
    .style("text-anchor", "middle")
    .style("font-size", "24px")
    .text("Leeftijd"); // Change to your desired X-axis label

  svg.append("text")
    .attr("transform", "rotate(-90)")  // Rotate the Y-axis label
    .attr("x", -height / 2)
    .attr("y", -margin.left + 40)
    .style("text-anchor", "middle")
    .style("font-size", "24px")
    .text("Leeftijd"); // Change to your desired Y-axis label
  // Create circles for the scatter plot
  
  svg.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => xScale(d[xColumn]))  // Set the x position based on the xColumn value
    .attr("cy", d => yScale(d[yColumn]))  // Set the y position based on the yColumn value
    .attr("r", d => sizeScale(d[inkomenColumn]))  // Set the radius based on 'Inkomen'
    .attr("fill", d => colorScale(d[studieColumn]))  // Set the fill color based on 'Studie'
    .on("mouseover", function(event, d) {
        d3.select(this).attr("fill", "white"); // Change color on hover
        tooltip.style("visibility", "visible")  // Show the tooltip on hover
        .html(`
          <strong>ID:</strong> ${d[geslachtColumn]}<br>
          <strong>Leeftijd:</strong> ${d[xColumn]}<br>
          <strong>Gem. Cijfer:</strong> ${d[yColumn]}<br>
          <strong>Studie:</strong> ${d[studieColumn]}<br>
          <strong>Inkomen:</strong> €${d[inkomenColumn]}
        `);  // Show the 'Geslacht' info
      })
      .on("mousemove", function(event) {
        tooltip.style("top", (event.pageY + 5) + "px")  // Move the tooltip with the mouse
          .style("left", (event.pageX + 5) + "px");
      })
      .on("mouseout", function(event, d) {
        d3.select(this).attr("fill", colorScale(d[studieColumn])); // Reset color when hover ends
        tooltip.style("visibility", "hidden");  // Hide the tooltip
    });
}).catch(function(error) {
  console.error("Error loading the CSV data:", error);
});