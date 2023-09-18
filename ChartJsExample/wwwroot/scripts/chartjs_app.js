    // This function is responsible for drawing a line chart based on maintenance reports data
    export async function draw(reports, startDate, endDate) {
        // and just rendering very simple chart according to tutorial page: https://www.chartjs.org/docs/latest/getting-started/usage.html
        const ctx = document.getElementById('chartCanvas');

        // Create a dataset to hold dates and maintenance minutes
        const dataSet = createDataSet(reports, startDate, endDate);

        // Create and render the chart
        window.myChart = new Chart(ctx, {
            type: 'line',
            data: {
                // Set the dates from the dataSet as labels
                labels: Object.keys(dataSet),
                datasets: [{
                    // Set the label for the vertical axis
                    label: 'Maintenance Time in minutes',
                    // Plot the data points for maintenance minutes
                    data: Object.values(dataSet),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    };

    // This function updates the chart by deleting the existing chart and redrawing it
    export async function update(reports, startDate, endDate) {
        window.myChart.destroy();
        draw(reports, startDate, endDate);
    };

    // This function creates a dataSet object to hold dates for the chart and initializes maintenance minutes to 0
    // Then it updates the maintenance minutes in the dataSet for dates within the specified range
function createDataSet(reports, startDate, endDate) {
    const dataSet = {};
    let currentDate = new Date(startDate); // Use a separate variable for iterating through dates
    const endDateObj = new Date(endDate); // Convert the end date to a Date object

    while (currentDate <= endDateObj) {
        const formattedDate = `${currentDate.getFullYear()}/${(currentDate.getMonth() + 1).toString().padStart(2, '0')}/${currentDate.getDate().toString().padStart(2, '0')}`;
        dataSet[formattedDate] = 0;

        // Move to the next day without modifying startDate
        currentDate.setDate(currentDate.getDate() + 1);
    }

    reports.forEach((r) => {
        const date = new Date(r["workDate"]);
        const maintenance = r["workTime"]["maintenance"];
        const formattedDate = `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`;
        if (dataSet[formattedDate] !== undefined) {
            dataSet[formattedDate] += maintenance;
        } else {
            dataSet[formattedDate] = maintenance;
        }
    });

    return dataSet;
}