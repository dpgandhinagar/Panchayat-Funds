import { supabase } from './supabase-client.js'

document.addEventListener('DOMContentLoaded', async () => {
    console.log('Testing database connection...');
    try {
        const { data, error } = await supabase.from('work_details').select('count');
        if (error) throw error;
        console.log('Connected to database. Row count:', data[0].count);
        
        await createTalukaChart();
        await createWorkTypeChart();
        await createSchemeChart();
    } catch (error) {
        console.error('Database connection error:', error);
    }
});

async function createTalukaChart() {
    try {
        const { data, error } = await supabase
            .from('work_details')
            .select('taluka_name, amount');

        if (error) throw error;

        // Aggregate data by taluka
        const talukaData = data.reduce((acc, curr) => {
            acc[curr.taluka_name] = (acc[curr.taluka_name] || 0) + parseFloat(curr.amount || 0);
            return acc;
        }, {});

        const ctx = document.getElementById('talukaChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: Object.keys(talukaData),
                datasets: [{
                    label: 'Total Amount (₹)',
                    data: Object.values(talukaData),
                    backgroundColor: '#4e73df',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: (value) => '₹' + value.toLocaleString('en-IN')
                        }
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: (context) => '₹' + context.raw.toLocaleString('en-IN')
                        }
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error creating taluka chart:', error);
    }
}

async function createWorkTypeChart() {
    try {
        const { data, error } = await supabase
            .from('work_details')
            .select('work_type');

        if (error) throw error;

        // Count work types
        const workTypeCounts = data.reduce((acc, curr) => {
            acc[curr.work_type] = (acc[curr.work_type] || 0) + 1;
            return acc;
        }, {});

        const colors = [
            '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', 
            '#FFEEAD', '#D4A5A5', '#9FA8DA', '#FFD93D'
        ];

        const ctx = document.getElementById('workTypeChart').getContext('2d');
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: Object.keys(workTypeCounts),
                datasets: [{
                    data: Object.values(workTypeCounts),
                    backgroundColor: colors.slice(0, Object.keys(workTypeCounts).length),
                    borderWidth: 2,
                    borderColor: '#ffffff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '60%',
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            padding: 20,
                            generateLabels: (chart) => {
                                const data = chart.data;
                                const total = data.datasets[0].data.reduce((a, b) => a + b, 0);
                                return data.labels.map((label, i) => ({
                                    text: `${label} (${((data.datasets[0].data[i] / total) * 100).toFixed(1)}%)`,
                                    fillStyle: data.datasets[0].backgroundColor[i],
                                    strokeStyle: '#fff',
                                    lineWidth: 2,
                                    hidden: false
                                }));
                            }
                        }
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error creating work type chart:', error);
    }
}

async function createSchemeChart() {
    try {
        const { data, error } = await supabase
            .from('work_details')
            .select('scheme, amount');

        if (error) throw error;

        // Aggregate data by scheme
        const schemeData = data.reduce((acc, curr) => {
            acc[curr.scheme] = (acc[curr.scheme] || 0) + parseFloat(curr.amount || 0);
            return acc;
        }, {});

        const ctx = document.getElementById('schemeChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: Object.keys(schemeData),
                datasets: [{
                    label: 'Total Amount (₹)',
                    data: Object.values(schemeData),
                    backgroundColor: [
                        '#36b9cc',  // Light Blue
                        '#1cc88a',  // Green
                        '#f6c23e'   // Yellow
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                indexAxis: 'y',  // This makes the bars horizontal
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        beginAtZero: true,
                        ticks: {
                            callback: (value) => '₹' + value.toLocaleString('en-IN')
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false  // Hide legend since we have labels on Y axis
                    },
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                const value = context.raw;
                                const total = Object.values(schemeData).reduce((a, b) => a + b, 0);
                                const percentage = ((value / total) * 100).toFixed(1);
                                return `₹${value.toLocaleString('en-IN')} (${percentage}%)`;
                            }
                        }
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error creating scheme chart:', error);
    }
}
