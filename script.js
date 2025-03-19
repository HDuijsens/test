d3.dsv(",", "data/data.csv").then(function(data) {
    // Process the data to extract labels (StudentID) and values (Gemiddelde schoolcijfer)
    const labels = data.map(d => `Student ${d.StudentID}`);  // Create labels for students
    const values = data.map(d => +d["Gemiddelde schoolcijfer"]);  // Convert Gemiddelde schoolcijfer to numbers

    // Get the context of the canvas element
    const ctx = document.getElementById('myChart').getContext('2d');

    // Create the chart with data from the CSV file
    const myChart = new Chart(ctx, {
        type: 'scatter',  // Change type to scatter for dot plot
        data: {
            datasets: [{
                label: 'Average School Grade',
                data: data.map((d, index) => ({
                    x: index,  // Use index or student ID as x
                    y: +d["Gemiddelde schoolcijfer"]  // Convert Gemiddelde schoolcijfer to numbers for y
                })),
                backgroundColor: 'rgba(233, 128, 8, 0.8)',  // Color for dots
                borderColor: 'rgba(54, 162, 235, 1)',  // Border color for dots
                borderWidth: 1,
                radius: 5  // Size of the dots
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Student'
                    },
                    ticks: {
                        callback: function(value, index, values) {
                            return `Student ${value + 1}`;  // Display student IDs or labels for x-axis
                        }
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Grade'
                    },
                    beginAtZero: true
                }
            },
            plugins: {
                legend: {
                    display: true
                },
                tooltip: {
                    enabled: true
                }
            },
            layout: {
                padding: 10  // Optional, to adjust padding around the chart
            },
            elements: {
                // Set a background color for the entire chart (canvas background)
                backgroundColor: 'rgba(218, 114, 17, 0.2)'  // Light blue background for the whole chart
            }
        }
    });
});

