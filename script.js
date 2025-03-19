// Load CSV data
d3.dsv(",", "path/to/your/data.csv").then(function(data) {
    // Process the data
    const labels = data.map(d => d.label); // Extract labels (Red, Blue, Yellow, etc.)
    const values = data.map(d => +d.value); // Extract values (12, 19, 3, etc.)

    // Get the context of the canvas element
    const ctx = document.getElementById('myChart').getContext('2d');

    // Create the chart with data from the CSV file
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels, // Labels from CSV
            datasets: [{
                label: 'Votes',
                data: values, // Data from CSV
                backgroundColor: ['red', 'blue', 'yellow', 'green', 'purple', 'orange']
            }]
        }
    });
});