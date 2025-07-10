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

        // Generate summary
        const talukaNames = Object.entries(talukaData)
            .map(([taluka, amt]) => `${taluka}: ₹${(amt / 1e7).toFixed(2)} Cr`)
            .join('</br>');
        document.getElementById('talukaChartSummary').innerHTML = `
            <strong><u><center>Taluka wise Allocation details(in Crores)</u></strong>
            <span style="font-size:0.97em;">${talukaNames}</span></center>
        `;
    } catch (error) {
        console.error('Error creating taluka chart:', error);
    }
}

async function createWorkTypeChart() {
    try {
        const { data, error } = await supabase
            .from('work_details')
            .select('work_type, amount');

        if (error) throw error;

        // Aggregate data by work type
        const workTypeData = data.reduce((acc, curr) => {
            acc[curr.work_type] = (acc[curr.work_type] || 0) + parseFloat(curr.amount || 0);
            return acc;
        }, {});

        const colors = [
            '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', 
            '#FFEEAD', '#D4A5A5', '#9FA8DA', '#FFD93D',
            '#A3A847', '#B388FF', '#FFB74D', '#81C784'
        ];

        // Generate summary
        const workTypeValues = Object.values(workTypeData);
        const workTypeLabels = Object.keys(workTypeData);
        const workTypeTotal = workTypeValues.reduce((a, b) => a + b, 0);

        // Create labels with percentage
        const workTypeLabelsWithPercent = workTypeLabels.map((type, i) => {
            const percent = workTypeTotal > 0 ? ((workTypeValues[i] / workTypeTotal) * 100).toFixed(1) : 0;
            return `${type} (${percent}%)`;
        });

        const ctx = document.getElementById('workTypeChart').getContext('2d');
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: workTypeLabelsWithPercent,
                datasets: [{
                    data: workTypeValues,
                    backgroundColor: colors.slice(0, workTypeLabels.length),
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
                            padding: 15
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const value = context.raw;
                                const percent = workTypeTotal > 0 ? ((value / workTypeTotal) * 100).toFixed(1) : 0;
                                return `${context.label}: ₹${value.toLocaleString('en-IN')} (${percent}%)`;
                            }
                        }
                    }
                }
            }});

        // Generate summary
        const workTypeNames = Object.entries(workTypeData)
            .map(([type, amt]) => `${type}: ₹${amt >= 1e7 ? (amt / 1e7).toFixed(2) + ' Cr' : (amt / 1e5).toFixed(2) + ' Lakh'}`)
            .join('<br/>');
        document.getElementById('workTypeChartSummary').innerHTML = `
            <strong><u><center>Weightage of work-Type(in Figures)</u></strong> 
            <span style="font-size:0.97em;">${workTypeNames} </span></center>
        `;
    } catch (error) {
        console.error('Error creating work type chart:', error);
    }
}

async function createSchemeChart() {
  // 1. Define all the schemes as they appear in your DB
  const allSchemes = [
    'finance_commission',
    'stamp_duty',
    'sand_gravel',
    'President',
    'Vice-President',
    'Exec chairman'
  ];
  const schemeDisplayNames = {
    finance_commission: 'Finance Commission',
    stamp_duty: 'Stamp Duty',
    sand_gravel: 'Sand & Gravel',
    President: 'President',
    'Vice-President': 'Vice President',
    'Exec chairman': 'Executive Chairman'
  };

  // 2. Fetch ALL rows via pagination, since Supabase caps at 1000 per request
  let allData = [];
  const pageSize = 1000;
  let from = 0;
  let to = pageSize - 1;
  let moreData = true;
  while (moreData) {
    const { data, error } = await supabase
      .from('work_details')
      .select('scheme, amount')
      .in('scheme', allSchemes)
      .range(from, to);

    if (error) {
      console.error('Supabase error:', error);
      document.getElementById('schemechartsummary').innerHTML = "<span style='color: red;'>Error fetching scheme data.</span>";
      return;
    }

    allData = allData.concat(data);
    if (!data || data.length < pageSize) {
      moreData = false; // last page
    } else {
      from += pageSize;
      to += pageSize;
    }
  }

  // 3. Aggregate totals per scheme
  const schemeTotals = {};
  allSchemes.forEach(scheme => { schemeTotals[scheme] = 0; });
  allData.forEach(row => {
    // Defensive: trim whitespace, convert amount to number
    const schemeKey = (row.scheme || '').trim();
    const amt = Number(row.amount) || 0;
    if (schemeTotals.hasOwnProperty(schemeKey)) {
      schemeTotals[schemeKey] += amt;
    }
  });

  // 4. Prepare chart data
  const labels = allSchemes.map(s => schemeDisplayNames[s]);
  const values = allSchemes.map(s => schemeTotals[s]);

  // 5. Destroy previous chart if any
  if (window.schemeChart && typeof window.schemeChart.destroy === "function") {
    window.schemeChart.destroy();
    window.schemeChart = undefined;
  }

  // 6. Draw the horizontal bar chart
  const ctx = document.getElementById('schemeChart').getContext('2d');
  window.schemeChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Scheme Amount',
        data: values,
        backgroundColor: [
          '#4e79a7', '#f28e2b', '#e15759', '#76b7b2', '#59a14f', '#edc949'
        ]
      }]
    },
    options: {
      indexAxis: 'y', // <--- This makes the chart horizontal
      responsive: true,
      plugins: {
        legend: { display: false },
       
      },
      scales: {
        x: { beginAtZero: true }
      }
    }
  });

  // 7. Show the scheme summary below in crores (cr)
  function formatAmountCr(amount) {
    const cr = amount / 1e7;
    return cr.toLocaleString('en-IN', { maximumFractionDigits: 2 }) + ' cr';
  }
  let descHTML = '<ul style="list-style: none; padding-left: 0; font-size: 0.9em;">';
  allSchemes.forEach(scheme => {
    descHTML += `<li>${schemeDisplayNames[scheme]}: ${formatAmountCr(schemeTotals[scheme])}</li>`;
  });
  descHTML += '</ul>';
  document.getElementById('schemechartsummary').innerHTML =' <strong><u><center>Scheme wise Allocation of Funds(in crores)</u></strong>'+descHTML;
}

// Call after DOM loaded!
document.addEventListener('DOMContentLoaded', createSchemeChart);
