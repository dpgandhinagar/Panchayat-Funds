import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.39.0/+esm'

const supabaseUrl = 'https://jyailcsclxjzcnyrnsic.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5YWlsY3NjbHhqemNueXJuc2ljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU4MjM1OTksImV4cCI6MjA2MTM5OTU5OX0.TVh104V8SnfeRTWywzYU96j-7uKtbzX6Tf8kjQbPwKk'
const supabase = createClient(supabaseUrl, supabaseKey)

// Add village data at the top of the file
const villagesByTaluka = {
    'Gandhinagar': ["Adalaj","Adraj Moti","Alampur","Bhoyan Rathod","Bhundiya -Dharampur","Chandrala","Chekhalarani","Chhala","Chiloda - Dabhoda",
"Dabhoda","Dantali","Dashela","Dhanap","Dolarana Vasana", "Galudan","Giyod","Isanpur Mota","Jakhora - Rajpur","Jalund","Jamiyatpur",
"Kakanu Tarapur","Kanpur","Lavarpur","Lekawada","Limbadia-Karai","Madhavgadh","Magodi","Mahudara","Medra","Motipura","Mubarakpura",
"Palaj","Pindharada","Piplaj","Pirojpur","Prantiya","Pundarasan","Raipur","Ranasan","Ratanpur","Rupal","Sadra","Sardhav","Shahpur","Shertha","Shiholi Moti","Sonarda","Sonipur",
"Tarapur","Titoda","Unava","Uvarsad","Vadodara","Vaja Pura","Valad","Vankanerda","Vasan","Vira Talavdi"],
    'Mansa': ["Ajarapura","Ajol","Aluva","Amaja","Amarapur","Amarpura (Kh)","Ambod","Anandpura Ambod","Anandpura (Solaiya)","Anandpura Veda",
"Anguthala","Anodiya","Badpura","Baliyanagar (M)","Balva","Bapupura","Bhimpura (M)","Bilodra","Boru","Chadasna","Chandisana","Charada",
"Delvad","Dhameda","Dhendhu","Dholakuva","Dodipal","Fatehpura","Galthara","Govindpura (Samo)","Gulabpura","Gunma","Hanumanpura (Samau)",
"Harna Hoda","Himmatpura (B)","Himmatpura (L)","Indrapura","Iswerpura","Itadra","Itla","Jamla","Khadat","Kharna","Khata Aamba",
"Kotvas","Kunvadara","Lakroda","Limbodara","Lodra","Mahudi","Makakhad","Mandali(V)","Manekpura (Makakhad)","Maninagar (Soja)",
"Motipura (Veda)","Nadri","Padusma","Paladi Rathod","Paladi (Vyas)","Parbatpura","Parsa","Patanpura","Pratap Nagar","Pratappura (Balva)",
"Pratappura (Piyaj)","Prempura Veda","Pundhara","Rajpura","Rampura","Rangpur","Ridrol","Samou","Sobhasan","Soja","Solaiya",
"Umiyanagar","Umiyanagar (B)","Vagosana","Varsoda","Veda","Vihar","Vijayanagar"],
    'Dahegam': ["Aantroli","Ahamadpur","Amrajina Muvada","Antoli","Arajanjina Muvada","Babra","Badpur","Bahiyal","Bardoli (Bariya)",
"Bardoli (Kothi)","Bariya","Bhadroda","Bilamana","Chamla","Chekhlapagi","Chiskari","Demaliya","Devkaran Na Muvada","Dhaniyol",
"Dharisana","Dod","Dumecha","Ghamij","Halisa","Harakhjina Muvada","Harsoli-Jivajini Muvadi","Harsoli-Jivajini Muvadi","Hathijan",
"Hilol","Hilol Vasna","Isanpur Dodiya","Jaliya Math","Jalundra Mota","Jalundra Nana","Jesa Chandna Muvada","Jindva","Jindva",
"Jivraj Na Muvada","Kadadara","Kadjodra","Kalyanji Na Muvada","Kamalbandh Vasna","Kanipur","Kantharpur","Karoli","Khadiya - Thadakuva",
"Khadiya - Thadakuva","Khakhara","Khanpur","Kodrali","Krishnanagar","Lakha Na Muvada","Lavad","Lihoda","Mirapur","Mithana Muvada",
"Morali","Mosampur","Moti-Nani Machhang","Moti-Nani Machhang","Motipura","Motipura","Nagjina Muvada","Nandol","Narnavat (Khapreswar)",
"Navanagar","Ottampur","Pahadiya","Pahadiya","Palaiya","Pallano Math","Palundra","Panana Muvada","Pasuniya","Patna Kuva","Pavthi-Najupura",
"Pavthi-Najupura","Pavthi-Najupura","Piplaj","Rakhiyal","Ramnagar","Sagdalpur","Sahebji Na Muvada","Salki","Sametri","Sampa",
"Sanoda","Shiyapura","Shiyavada","Udan","Vadod","Vadvasa","Vardhana Muvada","Vasana Chaudhary","Vasna Rathod","Vasna Sogthi",
"Vatva","Velpura","Zalana Muvada","Zank"],
    'Kalol': ["Adhana","Arsodiya","Bhadol","Bhavpura","Bhimasan","Bhoyan Moti","Bileshvarpura","Borisana","Chhatral","Dantali",
"Dhamasna","Dhanaj","Dhanot","Dingucha","Ganpatpura","Golthara","Govindpura (Veda)","Hajipur","Himmatpura (Veda)","Isand","Jaspur",
"Jethlaj","Kantha","Karoli","Khatrajdabhi","Mokhasan","Mulasana","Nandoli","Nardipur","Nasmed","Nava","Ola","Paliyad",
"Palodiya","Palsana","Pansar","Piyaj","Rakanpur","Ramnagar","Rancharada","Ranchhodpura","Sabaspur","Saij","Sanavad","Santej",
"Sherisa","Unali","Usmanabad","Vadavsvami","Vadsar","Vansajada Dhedia","Vansajada (K)","Vayana","Veda"]
};

// Initialize the reports functionality
document.addEventListener('DOMContentLoaded', function() {
    const reportTabs = document.querySelectorAll('.report-tab');
    const filterContents = document.querySelectorAll('.filter-content');
    const reportVillageTalukaSelect = document.getElementById('reportVillageTalukaSelect');
    const reportVillageSelect = document.getElementById('reportVillageSelect');

    // Handle report tab clicks
    reportTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Update active tab
            reportTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const filterType = tab.dataset.report;
            
            // Reset village selects when showing village filter
            if (filterType === 'village') {
                reportVillageSelect.disabled = true;
                reportVillageSelect.innerHTML = '<option value="" disabled selected>Select taluka first</option>';
                reportVillageTalukaSelect.value = '';
            }

            // Show correct filter content
            filterContents.forEach(content => {
                content.style.display = 'none';
            });
            const filterEl = document.getElementById(`${filterType}Filter`);
            if (filterEl) filterEl.style.display = 'block';

            // Hide results when switching tabs
            document.getElementById('resultsContainer').style.display = 'none';
        });
    });

    // Handle village taluka selection
    reportVillageTalukaSelect.addEventListener('change', function() {
        const selectedTaluka = this.value;
        console.log('Selected taluka:', selectedTaluka);
        updateVillageOptions(selectedTaluka, reportVillageSelect);
    });
});

// Update village options based on selected taluka
function updateVillageOptions(selectedTaluka, villageSelect) {
    villageSelect.innerHTML = '<option value="" disabled selected>Select a village</option>';
    villageSelect.disabled = false;

    const villages = villagesByTaluka[selectedTaluka] || [];
    villages.forEach(village => {
        const option = document.createElement('option');
        option.value = village;
        option.textContent = village;
        villageSelect.appendChild(option);
    });
}

// Handle filter application
async function applyFilter(filterType) {
    try {
        console.log('Applying filter for:', filterType);
        let query = supabase
            .from('work_details')
            .select('*')
            .order('year', { ascending: true });  // First sort by year

        switch (filterType) {
            case 'village':
                const village = document.getElementById('reportVillageSelect').value;
                if (!village) {
                    alert('Please select a village');
                    return;
                }
                query = query.eq('village_name', village);
                break;
            case 'taluka':
                const taluka = document.getElementById('reportTalukaSelect').value;
                if (!taluka) {
                    alert('Please select a taluka');
                    return;
                }
                query = query.eq('taluka_name', taluka);
                break;
            case 'scheme':
                const scheme = document.getElementById('reportSchemeSelect').value;
                if (!scheme) {
                    alert('Please select a scheme');
                    return;
                }
                query = query.eq('scheme', scheme);
                break;
            case 'year':
                const year = document.getElementById('reportYearSelect').value;
                if (!year) {
                    alert('Please select a year');
                    return;
                }
                query = query.eq('year', year);
                break;
            case 'taluka_scheme':
                const selectedTaluka = document.getElementById('reportTalukaSchemeSelect').value;
                const selectedScheme = document.getElementById('reportSchemeTalukaSelect').value;
                
                if (!selectedTaluka || !selectedScheme) {
                    alert('Please select both Taluka and Scheme');
                    return;
                }
                
                query = query
                    .eq('taluka_name', selectedTaluka)
                    .eq('scheme', selectedScheme);
                break;
        }

        console.log('Fetching data...');
        const { data, error } = await query;

        if (error) throw error;
        
        if (!data || data.length === 0) {
            alert('No records found for the selected criteria');
            return;
        }

        // Sort data by work_id after fetching
        data.sort((a, b) => {
            // First compare by year
            if (a.year !== b.year) {
                return a.year - b.year;
            }
            // If same year, compare work_ids
            const workIdA = parseInt(a.work_id.replace(/\D/g, '')) || 0;
            const workIdB = parseInt(b.work_id.replace(/\D/g, '')) || 0;
            return workIdA - workIdB;
        });

        console.log('Data fetched and sorted:', data.length, 'records');
        displayResults(data);
    } catch (error) {
        console.error('Error fetching results:', error);
        alert('Failed to fetch results: ' + error.message);
    }
}

// Update the formatDate function
function formatDate(dateString) {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    }).replace(/\//g, '-');
}

// Update the displayResults function
function displayResults(data) {
    const resultsContainer = document.querySelector('.results-container');
    const resultsBody = document.getElementById('resultsBody');
    const resultsTotalRow = document.getElementById('resultsTotalRow');

    if (!data || data.length === 0) {
        resultsContainer.style.display = 'none';
        alert('No results found');
        return;
    }

    resultsContainer.style.display = 'block';
    resultsBody.innerHTML = '';

    // Calculate total amount
    let totalAmount = 0;

    // Display data rows
    data.forEach(row => {
        const amount = parseFloat(row.amount) || 0;
        totalAmount += amount;

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${row.scheme || ''}</td>
            <td>${row.year || ''}</td>
            <td>${row.work_id || ''}</td>
            <td>${row.taluka_name || ''}</td>
            <td>${row.village_name || ''}</td>
            <td>${row.work_type || ''}</td>
            <td>${row.work_name || ''}</td>
            <td>₹${amount.toLocaleString('en-IN', {
                maximumFractionDigits: 2
            })}</td>
            <td>${formatDate(row.primary_approval_date)}</td>
            <td>${formatDate(row.technical_approval_date)}</td>
            <td>${formatDate(row.administrative_approval_date)}</td>
            <td>${formatDate(row.work_completion_date)}</td>
        `;
        resultsBody.appendChild(tr);
    });

    // Display total row
    resultsTotalRow.innerHTML = `
        <tr class="total-row">
            <td colspan="7" style="text-align: right;"><strong>Total Amount:</strong></td>
            <td colspan="5"><strong>₹${totalAmount.toLocaleString('en-IN', {
                maximumFractionDigits: 2
            })}</strong></td>
        </tr>
    `;

    // Initialize download buttons after displaying results
    initializeDownloadButtons();
}

// Helper functions for formatting
function formatScheme(scheme) {
    const schemes = {
        'finance_commission': 'Finance Commission',
        'stamp_duty' : 'Stamp Duty' ,
        'sand_gravel': 'Sand Gravel' ,
        'President'  : 'President DP grant',
        'Vice-President': 'Vice-President DP grant',
        'Exec chairman ': 'Executive chairman DP grant'
    };
    return schemes[scheme] || scheme;
}

function formatWorkType(type) {
    const types = {
        'cc_road': 'CC Road',
        'paver_block': 'Paver Block',
        'drainage_work': 'Drainage Work'
    };
    return types[type] || type;
}

// Make applyFilter function globally available
window.applyFilter = applyFilter;

// Initialize download buttons
function initializeDownloadButtons() {
    const printButton = document.getElementById('downloadPDF'); // Keep same ID for now
    const excelButton = document.getElementById('downloadExcel');

    if (printButton) {
        printButton.removeEventListener('click', printResults);
        printButton.addEventListener('click', printResults);
        // Update button text
        printButton.textContent = 'Print Report';
    }

    if (excelButton) {
        excelButton.removeEventListener('click', downloadAsExcel);
        excelButton.addEventListener('click', downloadAsExcel);
    }
}

// Add this to ensure buttons are initialized when DOM loads
document.addEventListener('DOMContentLoaded', () => {
    initializeDownloadButtons();
});

// Remove the downloadAsPDF function and replace with printResults
function printResults() {
    try {
        // Store current document body
        const originalBody = document.body.innerHTML;
        
        // Get the table
        const table = document.getElementById('resultsTable');
        if (!table) {
            throw new Error('No data to print');
        }

        // Get the current filter type and selection
        let reportTitle = 'Work Details Report';
        const activeTab = document.querySelector('.report-tab.active');
        if (activeTab) {
            const filterType = activeTab.dataset.report;
            let selection = '';
            
            switch (filterType) {
                case 'village':
                    selection = document.getElementById('reportVillageSelect').options[
                        document.getElementById('reportVillageSelect').selectedIndex
                    ].text;
                    reportTitle = `Village-wise Report: ${selection}`;
                    break;
                case 'taluka':
                    selection = document.getElementById('reportTalukaSelect').options[
                        document.getElementById('reportTalukaSelect').selectedIndex
                    ].text;
                    reportTitle = `Taluka-wise Report: ${selection}`;
                    break;
                case 'scheme':
                    selection = document.getElementById('reportSchemeSelect').options[
                        document.getElementById('reportSchemeSelect').selectedIndex
                    ].text;
                    reportTitle = `Scheme-wise Report: ${selection}`;
                    break;
                case 'year':
                    selection = document.getElementById('reportYearSelect').options[
                        document.getElementById('reportYearSelect').selectedIndex
                    ].text;
                    reportTitle = `Year-wise Report: ${selection}`;
                    break;
                case 'taluka_scheme':
                    const taluka = document.getElementById('reportTalukaSchemeSelect').options[
                        document.getElementById('reportTalukaSchemeSelect').selectedIndex
                    ].text;
                    const scheme = document.getElementById('reportSchemeTalukaSelect').options[
                        document.getElementById('reportSchemeTalukaSelect').selectedIndex
                    ].text;
                    reportTitle = `Taluka & Scheme Report: ${taluka} - ${scheme}`;
                    break;
            }
        }

        // Create print-friendly view
        const printContent = `
            <html>
                <head>
                    <title>${reportTitle}</title>
                    <style>
                        @page {
                            size: landscape;
                            margin: 10mm;
                        }
                        body {
                            margin: 0;
                            padding: 15px;
                        }
                        h2 {
                            text-align: center;
                            color: #2980b9;
                            margin-bottom: 20px;
                        }
                        table { 
                            width: 100%; 
                            border-collapse: collapse; 
                            margin-bottom: 1em;
                            font-size: 12px;
                        }
                        th, td { 
                            border: 1px solid #ddd; 
                            padding: 6px; 
                            text-align: left;
                            overflow-wrap: break-word;
                        }
                        th { 
                            background-color: #2980b9; 
                            color: white;
                            white-space: nowrap;
                        }
                        .total-row {
                            background-color: #f0f7ff;
                            font-weight: bold;
                        }
                        .total-row td {
                            border-top: 2px solid #2980b9;
                        }
                        td:nth-child(8) {
                            text-align: right;
                        }
                        @media print {
                            table { page-break-inside: auto; }
                            tr { page-break-inside: avoid; }
                            thead { display: table-header-group; }
                            tfoot { display: table-footer-group; }
                        }
                    </style>
                </head>
                <body>
                    <h2>${reportTitle}</h2>
                    ${table.outerHTML}
                </body>
            </html>
        `;

        // Replace document content with print content
        document.body.innerHTML = printContent;
        
        // Print
        window.print();
        
        // Restore original content after print dialog closes
        document.body.innerHTML = originalBody;
        
        // Reattach event listeners
        initializeDownloadButtons();

    } catch (error) {
        console.error('Print error:', error);
        alert('Error printing. Please try again.');
    }
}

// Add event listener for the download button
document.addEventListener('DOMContentLoaded', () => {
    const downloadBtn = document.getElementById('downloadPDF');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', printResults);
    }
});

async function downloadAsExcel() {
    try {
        // Get report title based on active filter
        let reportTitle = 'Work Details Report';
        const activeTab = document.querySelector('.report-tab.active');
        if (activeTab) {
            const filterType = activeTab.dataset.report;
            switch (filterType) {
                case 'village':
                    reportTitle = `Village-wise Report: ${document.getElementById('reportVillageSelect').selectedOptions[0].text}`;
                    break;
                case 'taluka':
                    reportTitle = `Taluka-wise Report: ${document.getElementById('reportTalukaSelect').selectedOptions[0].text}`;
                    break;
                case 'scheme':
                    reportTitle = `Scheme-wise Report: ${document.getElementById('reportSchemeSelect').selectedOptions[0].text}`;
                    break;
                case 'year':
                    reportTitle = `Year-wise Report: ${document.getElementById('reportYearSelect').selectedOptions[0].text}`;
                    break;
                case 'taluka_scheme':
                    const taluka = document.getElementById('reportTalukaSchemeSelect').selectedOptions[0].text;
                    const scheme = document.getElementById('reportSchemeTalukaSelect').selectedOptions[0].text;
                    reportTitle = `Taluka & Scheme Report: ${taluka} - ${scheme}`;
                    break;
            }
        }

        // Get table data
        const table = document.getElementById('resultsTable');
        if (!table) throw new Error('No data to export');

        // Create workbook and worksheet
        const wb = XLSX.utils.book_new();
        
        // Get headers and data
        const headers = Array.from(table.querySelectorAll('thead th')).map(th => th.textContent);
        const rows = Array.from(table.querySelectorAll('tbody tr')).map(tr => 
            Array.from(tr.querySelectorAll('td')).map(td => td.textContent)
        );
        const totalRow = Array.from(table.querySelector('.total-row').querySelectorAll('td')).map(td => td.textContent);

        // Combine all data
        const wsData = [[reportTitle], [], headers, ...rows, totalRow];
        const ws = XLSX.utils.aoa_to_sheet(wsData);

        // Set column widths
        ws['!cols'] = [
            {wch: 20}, {wch: 8}, {wch: 10}, {wch: 15}, {wch: 20}, 
            {wch: 15}, {wch: 45}, {wch: 15}, {wch: 12}, {wch: 12}, 
            {wch: 12}, {wch: 12}
        ];

        // Style the cells
        const range = XLSX.utils.decode_range(ws['!ref']);
        
        for (let R = 0; R <= range.e.r; R++) {
            for (let C = 0; C <= range.e.c; C++) {
                const cellRef = XLSX.utils.encode_cell({r: R, c: C});
                if (!ws[cellRef]) {
                    // Create empty cell if it doesn't exist to ensure borders
                    ws[cellRef] = { v: '', t: 's' };
                }

                // Apply styles to all cells
                ws[cellRef].s = {
                    border: {
                        top: { style: 'medium', color: { rgb: "000000" } },
                        bottom: { style: 'medium', color: { rgb: "000000" } },
                        left: { style: 'medium', color: { rgb: "000000" } },
                        right: { style: 'medium', color: { rgb: "000000" } }
                    },
                    font: { name: 'Arial', sz: 11 },
                    alignment: {
                        vertical: 'center',
                        horizontal: C === 7 ? 'right' : 'left', // Right align amount column
                        wrapText: true
                    }
                };

                // Title row styling
                if (R === 0) {
                    ws[cellRef].s.font = { bold: true, sz: 14 };
                }
                // Header row styling
                else if (R === 2) {
                    ws[cellRef].s.fill = {
                        patternType: 'solid',
                        fgColor: { rgb: "CCCCCC" }
                    };
                    ws[cellRef].s.font = { ...ws[cellRef].s.font, bold: true };
                }
                // Total row styling
                else if (R === range.e.r) {
                    ws[cellRef].s.font = { ...ws[cellRef].s.font, bold: true };
                    ws[cellRef].s.fill = {
                        patternType: 'solid',
                        fgColor: { rgb: "F0F7FF" }
                    };
                }
            }
        }

        // Add worksheet to workbook
        XLSX.utils.book_append_sheet(wb, ws, 'Work Details');

        // Save file with timestamp
        const timestamp = new Date().toLocaleString('en-IN').replace(/[/:]/g, '-');
        const filename = `work_details_report_${timestamp}.xlsx`;
        XLSX.writeFile(wb, filename);

    } catch (error) {
        console.error('Excel generation error:', error);
        alert('Error generating Excel file. Please try again.');
    }
}

// Create work type donut chart
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

        // Calculate percentages
        const total = Object.values(workTypeCounts).reduce((a, b) => a + b, 0);
        const percentages = {};
        Object.keys(workTypeCounts).forEach(type => {
            percentages[type] = ((workTypeCounts[type] / total) * 100).toFixed(1);
        });

        // Define distinct colors
        const colors = [
            '#FF6B6B', // Bright Red
            '#4ECDC4', // Turquoise
            '#45B7D1', // Sky Blue
            '#96CEB4', // Sage Green
            '#FFEEAD', // Light Yellow
            '#D4A5A5', // Dusty Rose
            '#9FA8DA', // Periwinkle
            '#FFD93D'  // Golden Yellow
        ];

        const ctx = document.getElementById('workTypeChart').getContext('2d');
        
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: Object.keys(workTypeCounts).map(type => 
                    `${formatWorkType(type)} (${percentages[type]}%)`
                ),
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
                            font: {
                                size: 14
                            },
                            generateLabels: function(chart) {
                                const data = chart.data;
                                if (data.labels.length && data.datasets.length) {
                                    return data.labels.map((label, i) => {
                                        const value = data.datasets[0].data[i];
                                        const percentage = ((value / total) * 100).toFixed(1);
                                        return {
                                            text: `${label} (${value} works)`,
                                            fillStyle: data.datasets[0].backgroundColor[i],
                                            hidden: isNaN(data.datasets[0].data[i]),
                                            lineCap: 'round',
                                            lineDash: [],
                                            lineDashOffset: 0,
                                            lineJoin: 'round',
                                            lineWidth: 1,
                                            strokeStyle: '#ffffff',
                                            borderRadius: 2
                                        };
                                    });
                                }
                                return [];
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const value = context.raw;
                                const percentage = ((value / total) * 100).toFixed(1);
                                return ` ${value} works (${percentage}%)`;
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
