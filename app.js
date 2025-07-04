import { supabase } from './supabase-client.js';

document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.tab');
    const contents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            // Skip the "Data Entry" tab to allow navigation to the new page
            if (this.getAttribute('href') === 'data-entry.html') {
                return; // Allow the default behavior
            }

            e.preventDefault(); // Prevent default behavior for other tabs

            // Hide all contents
            contents.forEach(content => {
                content.style.display = 'none';
            });

            // Remove active class from all tabs
            tabs.forEach(t => {
                t.classList.remove('active');
            });

            // Show the clicked tab's content
            const targetContent = document.querySelector(`#${this.dataset.target}`);
            if (targetContent) {
                targetContent.style.display = 'block';

                // Always show pendency filter when switching to pendencyReports tab
                if (this.dataset.target === 'pendencyReports') {
                    const filterContainer = document.getElementById('pendencyFilterContainer');
                    const filter = document.getElementById('pendencyFilter');
                    const results = document.getElementById('pendencyResultsContainer');
                    if (filterContainer) filterContainer.style.display = 'block';
                    if (filter) filter.style.display = 'block';
                    if (results) results.style.display = 'none';
                }
            }

            // Add active class to the clicked tab
            this.classList.add('active');
        });
    });

    // Show the first tab's content by default
    tabs[0].click();

    // Check authentication status
    checkAuthStatus();
    
    // Auth button click handler
    document.getElementById('authButton').addEventListener('click', handleAuth);

    // Pendency Reports logic
    const pendencyTabs = document.querySelectorAll('#pendencyReports .report-tab');
    let currentPendencyType = 'technical';

    pendencyTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            pendencyTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            currentPendencyType = this.dataset.pendency;

            // Only hide results, never touch filter
            const results = document.getElementById('pendencyResultsContainer');
            if (results) results.style.display = 'none';
        });
    });

    // Default: select first pendency tab
    if (pendencyTabs.length) pendencyTabs[0].click();

    document.getElementById('pendencyShowBtn').addEventListener('click', async function() {
        const scheme = document.getElementById('pendencySchemeSelect').value;
        const year = document.getElementById('pendencyYearSelect').value;
        const taluka = document.getElementById('pendencyTalukaSelect').value;
        if (!scheme || !year || !taluka) {
            alert('Please select all filters.');
            return;
        }

        let query = supabase.from('work_details').select('*')
            .eq('scheme', scheme)
            .eq('year', year)
            .eq('taluka_name', taluka);

        // Add pendency filter
        if (currentPendencyType === 'technical') {
            query = query.is('technical_approval_date', null);
        } else if (currentPendencyType === 'administrative') {
            query = query.is('administrative_approval_date', null);
        } else if (currentPendencyType === 'completion') {
            query = query.is('work_completion_date', null);
        }

        const { data, error } = await query;
        if (error) {
            alert('Error fetching data: ' + error.message);
            return;
        }
        displayPendencyResults(data || []);
    });

    function displayPendencyResults(data) {
        const container = document.getElementById('pendencyResultsContainer');
        const body = document.getElementById('pendencyResultsBody');
        body.innerHTML = '';
        if (!data.length) {
            container.style.display = 'none';
            alert('No records found.');
            return;
        }
        container.style.display = 'block';

        // Sort by work_id ascending
        data.sort((a, b) => {
            // If work_id is numeric
            if (!isNaN(a.work_id) && !isNaN(b.work_id)) {
                return Number(a.work_id) - Number(b.work_id);
            }
            // If work_id is string
            return String(a.work_id).localeCompare(String(b.work_id));
        });

        data.forEach(row => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${row.scheme || ''}</td>
                <td>${row.year || ''}</td>
                <td>${row.work_id || ''}</td>
                <td>${row.taluka_name || ''}</td>
                <td>${row.village_name || ''}</td>
                <td>${row.work_type || ''}</td>
                <td>${row.work_name || ''}</td>
                <td>₹${parseFloat(row.amount || 0).toLocaleString('en-IN')}</td>
                <td>${row.primary_approval_date || ''}</td>
                <td>${row.technical_approval_date || ''}</td>
                <td>${row.administrative_approval_date || ''}</td>
                <td>${row.work_completion_date || ''}</td>
            `;
            body.appendChild(tr);
        });
    }

    document.getElementById('printPendencyReport').addEventListener('click', function() {
        const printContents = document.getElementById('pendencyResultsTable').outerHTML;
        const style = Array.from(document.querySelectorAll('link[rel="stylesheet"], style'))
            .map(node => node.outerHTML).join('\n');
        const win = window.open('', '', 'height=700,width=900');
        win.document.write('<html><head><title>Pendency Report</title>');
        win.document.write(style);
        win.document.write('</head><body>');
        win.document.write('<h2>Pendency Report</h2>');
        win.document.write('<div class="results-container">');
        win.document.write(printContents);
        win.document.write('</div>');
        win.document.write('</body></html>');
        win.document.close();
        win.print();
    });
});

function checkAuthStatus() {
    const user = sessionStorage.getItem('auth_session');
    const authButton = document.getElementById('authButton');
    const userInfo = document.getElementById('userInfo');
    const authRequiredLinks = document.querySelectorAll('.auth-required'); // Select all

    if (user) {
        // User is logged in
        const userData = JSON.parse(user);
        document.getElementById('userName').textContent = userData.username;
        userInfo.style.display = 'inline';
        authButton.textContent = 'Logout';
        
        // Show all auth-required links
        authRequiredLinks.forEach(link => link.style.display = '');
    } else {
        // User is not logged in
        userInfo.style.display = 'none';
        authButton.textContent = 'Login';
        
        // Hide all auth-required links
        authRequiredLinks.forEach(link => link.style.display = 'none');
    }
}

function handleAuth() {
    const user = sessionStorage.getItem('auth_session');
    
    if (user) {
        // Logout
        sessionStorage.removeItem('auth_session');
        checkAuthStatus();
    } else {
        // Redirect to login page
        window.location.href = 'auth.html';
    }
}

// Make handleAuth available globally
window.handleAuth = handleAuth;

// Add logout functionality
function logout() {
    sessionStorage.removeItem('auth_session');
    window.location.href = 'login.html';
}

// Add auth check to data entry page access
function checkDataEntryAccess() {
    const user = sessionStorage.getItem('auth_session');
    if (!user && window.location.href.includes('data-entry.html')) {
        alert('Please login to access data entry.');
        window.location.href = 'index.html';
    }
}
