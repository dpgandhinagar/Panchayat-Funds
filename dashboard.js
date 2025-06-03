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

function createBarChart(ctx, labels, data, title) {
    return new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Amount Allocated',
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
                },
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Amount (₹)'
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
    console.log('Initializing dashboard...'); // Debug log

    const data = await fetchDashboardData();
    if (!data) {
        console.error('No data received from fetchDashboardData');
        return;
    }

    console.log('Received data:', data); // Debug log

    try {
        // Process data for each chart
        const talukaChart = processChartData(data.talukaData, 'taluka_name');
        const workTypeChart = processChartData(data.workTypeData, 'work_type');
        const schemeChart = processChartData(data.schemeData, 'scheme');

        console.log('Processed chart data:', { talukaChart, workTypeChart, schemeChart }); // Debug log

        // Get chart contexts
        const talukaCtx = document.getElementById('talukaChart');
        const workTypeCtx = document.getElementById('workTypeChart');
        const schemeCtx = document.getElementById('schemeChart');

        if (!talukaCtx || !workTypeCtx || !schemeCtx) {
            console.error('One or more chart containers not found');
            return;
        }

        // Create charts
        createBarChart(
            talukaCtx,
            talukaChart.labels,
            talukaChart.values,
            'Amount Allocated by Taluka'
        );

        createPieChart(
            workTypeCtx,
            workTypeChart.labels,
            workTypeChart.values,
            'Amount Allocated by Work Type'
        );

        createBarChart(
            schemeCtx,
            schemeChart.labels,
            schemeChart.values,
            'Amount Allocated by Scheme'
        );

        console.log('Charts created successfully'); // Debug log
    } catch (error) {
        console.error('Error creating charts:', error);
    }
}

// Initialize dashboard when the page loads
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded'); // Debug log
    initializeDashboard();
});

// Update dashboard when switching to the dashboard tab
document.querySelector('a[data-target="dashboard"]').addEventListener('click', initializeDashboard);