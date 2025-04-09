d3.dsv(",", "data/data.csv").then(function(data) {
    // Ensure data is properly loaded and parsed
    console.log("Loaded Data:", data);

    // Parse and clean the data
    data.forEach(d => {
        d["Gemiddelde schoolcijfer"] = parseFloat(d["Gemiddelde schoolcijfer"]);
        d["Leeftijd"] = parseFloat(d["Leeftijd"]);
        d["Geslacht"] = d["Geslacht"].trim();
    });

    // Confirm parsing
    console.log("Parsed Data:", data);

    // Get the canvas context
    const ctx = document.getElementById('myChart').getContext('2d');

    // Gender color mapping
    const genderColors = {
        "Man": 'rgba(54, 162, 235, 0.8)',  // Blue for male
        "Vrouw": 'rgba(255, 99, 132, 0.8)'   // Pink for female
    };

    // Create scatter plot
    const myChart = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Average School Grade',
                data: data.map((d, index) => {
                    console.log(`Student ${index + 1}:`, d); // Log each point
                    return {
                        x: d["StudentID"],
                        y: d["Gemiddelde schoolcijfer"],
                        r: d["Leeftijd"], // Dynamic radius
                        backgroundColor: genderColors[d["Geslacht"]] || 'rgba(150, 150, 150, 0.8)'
                    };
                })
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: { display: true, text: 'Student' },
                    ticks: {
                        callback: function(value) {
                            return `Student ${value + 1}`;
                        }
                    }
                },
                y: {
                    title: { display: true, text: 'Grade' },
                    beginAtZero: true
                }
            },
            plugins: {
                legend: { display: true },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const student = data[context.dataIndex];
                            return `Grade: ${student["Gemiddelde schoolcijfer"]}, Age: ${student["Leeftijd"]}, Gender: ${student["Geslacht"]}`;
                        }
                    }
                }
            },
            elements: { point: { borderWidth: 1 } }
        }
    });
});
