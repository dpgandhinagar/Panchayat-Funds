import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.39.0/+esm'

const supabaseUrl = 'https://jyailcsclxjzcnyrnsic.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5YWlsY3NjbHhqemNueXJuc2ljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU4MjM1OTksImV4cCI6MjA2MTM5OTU5OX0.TVh104V8SnfeRTWywzYU96j-7uKtbzX6Tf8kjQbPwKk'
const supabase = createClient(supabaseUrl, supabaseKey)

async function fetchDashboardData() {
    try {
        // Fetch data for taluka-wise allocation
        const { data: talukaData, error: talukaError } = await supabase
            .from('work_details')
            .select('taluka_name, amount');
        
        if (talukaError) throw talukaError;

        // Fetch data for work type allocation
        const { data: workTypeData, error: workTypeError } = await supabase
            .from('work_details')
            .select('work_type, amount');

        if (workTypeError) throw workTypeError;

        // Fetch data for scheme-wise allocation
        const { data: schemeData, error: schemeError } = await supabase
            .from('work_details')
            .select('scheme, amount');

        if (schemeError) throw schemeError;

        return { talukaData, workTypeData, schemeData };
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        return null;
    }
}

function processChartData(data, groupByField) {
    const groupedData = data.reduce((acc, item) => {
        const key = item[groupByField];
        acc[key] = (acc[key] || 0) + item.amount;
        return acc;
    }, {});

    return {
        labels: Object.keys(groupedData),
        values: Object.values(groupedData)
    };
}

function createBarChart(canvasId, labels, data, title) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    
    // Destroy existing chart if it exists
    const existingChart = Chart.getChart(ctx);
    if (existingChart) {
        existingChart.destroy();
    }

    // Create new chart
    return new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Amount',
                data: data,
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '₹' + value.toLocaleString('en-IN');
                        }
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: title,
                    font: {
                        size: 16
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return '₹' + context.raw.toLocaleString('en-IN');
                        }
                    }
                }
            }
        }
    });
}

function createPieChart(ctx, labels, data, title) {
    return new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: [
                    'rgba(54, 162, 235, 0.7)',
                    'rgba(255, 99, 132, 0.7)',
                    'rgba(75, 192, 192, 0.7)',
                    'rgba(255, 206, 86, 0.7)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: title
                }
            }
        }
    });
}

async function initializeDashboard() {
    try {
        const data = await fetchDashboardData();
        if (!data) {
            console.error('No data received');
            return;
        }

        console.log('Raw data:', data); // Debug data

        // Process data for charts
        const talukaData = processChartData(data.talukaData, 'taluka_name');
        const workTypeData = processChartData(data.workTypeData, 'work_type');
        const schemeData = processChartData(data.schemeData, 'scheme');

        console.log('Processed data:', { talukaData, workTypeData, schemeData }); // Debug processed data

        // Create charts with clean canvas
        document.getElementById('talukaChart').innerHTML = '';
        document.getElementById('workTypeChart').innerHTML = '';
        document.getElementById('schemeChart').innerHTML = '';

        // Create new charts
        createBarChart('talukaChart', 
            talukaData.labels, 
            talukaData.values, 
            'Amount Allocated by Taluka'
        );

        createPieChart('workTypeChart', 
            workTypeData.labels, 
            workTypeData.values, 
            'Amount by Work Type'
        );

        createBarChart('schemeChart', 
            schemeData.labels, 
            schemeData.values, 
            'Amount Allocated by Scheme'
        );

    } catch (error) {
        console.error('Dashboard initialization error:', error);
    }
}

// Initialize dashboard when the page loads
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded'); // Debug log
    initializeDashboard();
});

// Update dashboard when switching to the dashboard tab
document.querySelector('a[data-target="dashboard"]').addEventListener('click', () => {
    // Clear existing charts
    const charts = ['talukaChart', 'workTypeChart', 'schemeChart'];
    charts.forEach(chartId => {
        const canvas = document.getElementById(chartId);
        const existingChart = Chart.getChart(canvas);
        if (existingChart) {
            existingChart.destroy();
        }
    });
    
    // Initialize new charts
    initializeDashboard();
});
