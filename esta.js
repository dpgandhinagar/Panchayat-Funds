import { supabase } from './supabase-client.js';

document.addEventListener('DOMContentLoaded', function() {
    // --- GLOBAL TABLE STYLES ---
    const style = document.createElement('style');
    style.textContent = `
      .results-table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 10px;
        font-family: Arial, sans-serif;
        font-size: 14px;
      }
      .results-table th, 
      .results-table td {
        border: 1px solid black;   /* visible borders */
        padding: 10px;
        text-align: left;
      }
      .results-table th {
        background-color: #0074D9; /* blue heading */
        color: white;
        font-weight: bold;
        text-align: center;
      }
      .results-table tr:nth-child(even) {
        background-color: #f2f2f2; /* alternate rows */
      }
    `;
    document.head.appendChild(style);

    // Establishment sub-tabs logic
    const estabTabs = document.querySelectorAll('.estab-tab');
    const estabForms = document.querySelectorAll('.estab-form');
    if (estabTabs.length) {
        estabTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                estabTabs.forEach(t => t.classList.remove('active'));
                estabForms.forEach(f => f.style.display = 'none');
                this.classList.add('active');
                if (this.id === 'cadreDetailsTab') {
                    document.getElementById('cadreDetailsForm').style.display = 'block';
                } else if (this.id === 'ageDetailsTab') {
                    document.getElementById('ageDetailsForm').style.display = 'block';
                } else if (this.id === 'searchEstabDetailsTab') {
                    document.getElementById('searchEstabDetailsForm').style.display = 'block';
                }
            });
        });
    }

    // Cadre Details Query Logic
    const cadreForm = document.getElementById('cadreDetailsQueryForm');
    const cadreResultsDiv = document.getElementById('cadreDetailsResults');
    const cadreTableContainer = document.getElementById('cadreDetailsTable'); // must be a DIV in HTML

    if (cadreForm) {
        cadreForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const cadre = document.getElementById('cadreSelect').value;
            if (!cadre) return;

            // Show loading
            cadreResultsDiv.style.display = 'block';
            cadreTableContainer.innerHTML = '<p>Loading...</p>';

            // Fetch from Supabase
            const { data, error } = await supabase
                .from('establishment')
                .select('*')
                .eq('cadre', cadre);
                
            if (error || !data || data.length === 0) {
                cadreTableContainer.innerHTML = '<p>No records found.</p>';
                return;
            }

            // Build table
            const columns = Object.keys(data[0]);

            let html = `
              <table class="results-table">
                <thead>
                  <tr>
                    ${columns.map(col => `<th>${col.replace(/_/g, ' ').toUpperCase()}</th>`).join('')}
                  </tr>
                </thead>
                <tbody>
                  ${data.map(row =>
                    `<tr>${columns.map(col => `<td>${row[col] ?? ''}</td>`).join('')}</tr>`
                  ).join('')}
                </tbody>
              </table>
              <div id="pendencyTotalCount" style="margin:16px 0 0 0; font-weight:bold;">
                Total cadre strength: ${data.length}
              </div>
            `;

            cadreTableContainer.innerHTML = html;
        });
    }
});
