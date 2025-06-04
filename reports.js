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
            document.getElementById(`${filterType}Filter`).style.display = 'block';

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
        console.log('Applying filter for:', filterType); // Debug log
        let query = supabase.from('work_details').select('*');

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
        }

        console.log('Fetching data...'); // Debug log
        const { data, error } = await query;

        if (error) throw error;
        
        if (!data || data.length === 0) {
            alert('No records found for the selected criteria');
            return;
        }

        console.log('Data fetched successfully:', data.length, 'records'); // Debug log
        displayResults(data);
    } catch (error) {
        console.error('Error fetching results:', error);
        alert('Failed to fetch results: ' + error.message);
    }
}

// Update the displayResults function
function displayResults(data) {
    const resultsContainer = document.getElementById('resultsContainer');
    const resultsBody = document.getElementById('resultsBody');
    
    resultsBody.innerHTML = '';
    
    if (data.length === 0) {
        alert('No results found for the selected criteria.');
        return;
    }
    
    data.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${formatScheme(row.scheme)}</td>
            <td>${row.year}</td>
            <td>${row.work_id}</td>
            <td>${row.taluka_name}</td>
            <td>${row.village_name}</td>
            <td>${formatWorkType(row.work_type)}</td>
            <td>${row.work_name}</td>
            <td>₹${row.amount.toLocaleString()}</td>
            <td>${formatDate(row.primary_approval_date)}</td>
            <td>${formatDate(row.technical_approval_date)}</td>
            <td>${formatDate(row.administrative_approval_date)}</td>
            <td>${formatDate(row.work_completion_date)}</td>
        `;
        resultsBody.appendChild(tr);
    });

    // Show results container
    resultsContainer.style.display = 'block';
    
    // Log success
    console.log('Results displayed successfully:', data.length, 'records');
}

// Helper functions for formatting
function formatScheme(scheme) {
    const schemes = {
        'finance_commission': 'Finance Commission',
        'stamp_duty': 'Stamp Duty',
        'sand_gravel': 'Sand Gravel'
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

function formatDate(dateString) {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString();
}

// Make applyFilter function globally available
window.applyFilter = applyFilter;