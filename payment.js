import { supabase } from './supabase-client.js';

function getCurrentUsername() {
    try {
        const session = JSON.parse(sessionStorage.getItem('auth_session'));
        return session?.username || '';
    } catch { return ''; }
}
document.addEventListener('DOMContentLoaded', () => {
    // Tab switching
    const generalTab = document.getElementById('generalBranchTab');
    const accountsTab = document.getElementById('accountsBranchTab');
    const searchDetailsTab = document.getElementById('searchDetailsTab');
    const generalRegisterTab = document.getElementById('generalRegisterTab');
    const searchRegisterTab = document.getElementById('searchRegisterTab');


    const generalForm = document.getElementById('generalBranchForm');
    const accountsForm = document.getElementById('accountsBranchForm');
    const searchDetailsForm = document.getElementById('searchDetailsForm');
     const generalRegisterForm = document.getElementById('generalRegisterForm');
    const searchRegisterForm = document.getElementById('searchRegisterForm');
     
    const paymentSection = document.getElementById('paymentSection');

    const searchDetailsDiv = document.createElement('div');
    searchDetailsDiv.id = 'searchDetailsForm';
    searchDetailsDiv.className = 'payment-form';
    searchDetailsDiv.style.display = 'none';
    paymentSection.appendChild(searchDetailsDiv);

     const username = getCurrentUsername();
    if (username === 'admin' || username === 'accounts-br') {
        accountsTab.style.display = '';
        generalRegisterTab.style.display = '';
        searchRegisterTab.style.display ='';
    } else {
        accountsTab.style.display = 'none';
        generalRegisterTab.style.display = 'none';
        searchRegisterTab.style.display ='none';
    }

    // Remove or comment out this line:
    // const paymentTabs = document.querySelector('.payment-tabs');
    // paymentTabs.innerHTML += `<button id="searchDetailsTab" class="payment-tab">Search Details</button>`;

    // Add a new form container for Search Details
   /* const paymentSection = document.getElementById('paymentSection');
    const searchDetailsDiv = document.createElement('div');
    searchDetailsDiv.id = 'searchDetailsForm';
    searchDetailsDiv.className = 'payment-form';
    searchDetailsDiv.style.display = 'none';
    paymentSection.appendChild(searchDetailsDiv);*/

    // Tab switching logic (add for new tab)
    // const searchTab = document.getElementById('searchDetailsTab');
    // searchTab.addEventListener('click', () => {
    //     generalTab.classList.remove('active');
    //     accountsTab.classList.remove('active');
    //     searchTab.classList.add('active');
    //     generalForm.style.display = 'none';
    //     accountsForm.style.display = 'none';
    //     searchDetailsDiv.style.display = '';
    // });
    const tabFormPairs = [
        { tab: generalTab, form: generalForm },
        { tab: accountsTab, form: accountsForm },
        { tab: searchDetailsTab, form: searchDetailsForm },
        { tab: generalRegisterTab, form: generalRegisterForm },
        { tab: searchRegisterTab, form: searchRegisterForm }
    ];

    tabFormPairs.forEach(({ tab, form }) => {
        tab.addEventListener('click', () => {
            tabFormPairs.forEach(({ tab: t, form: f }) => {
                t.classList.remove('active');
                f.style.display = 'none';
            });
            tab.classList.add('active');
            form.style.display = '';
        });
    });


    // Render General Branch Form
    generalForm.innerHTML = `
        <div class="form-section">
            <h3>General Branch Bill Entry</h3>
            <form id="generalPaymentForm" class="styled-form">
                <div class="form-group">
                    <label>Praisa Bill Number</label>
                    <input type="text" name="praisa_bill_number" required>
                </div>
                <div class="form-group">
                    <label>Branch Name</label>
                    <select name="branch_name" required>
                        <option value="">Select Branch</option>
                        <option value="Panchayat">Panchayat</option>
                        <option value="Vikas">Vikas</option>
                        <option value="Vikas">Vikas</option>
                        <option value="RoadsAndBuilding">RoadsAndBuilding</option>
                        <option value="Establishment">Establishment</option>
                        <option value="Revenue">Revenue</option>
                        <option value="Education">Education</option>
                        <option value="Irrigation-1">Irrigation-1</option>
                        <option value="Irrigation-2">Irrigation-2</option>
                        <option value="ICDS">ICDS</option>
                        <option value="Health">Health</option>
                        <option value="Statistics">Statistics</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Subject</label>
                    <input type="text" name="subject" required>
                </div>
                <div class="form-group">
                    <label>Taluka Name</label>
                    <select name="taluka_name" id="talukaSelect" required>
                        <option value="">Select Taluka</option>
                        <option value="Gandhinagar">Gandhinagar</option>
                        <option value="Mansa">Mansa</option>
                        <option value="Dahegam">Dahegam</option>
                        <option value="Kalol">Kalol</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Village Name</label>
                    <select name="village_name" id="villageSelect" required>
                        <option value="">Select Taluka First</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Amount</label>
                    <input type="number" name="amount" required>
                </div>
                <div class="form-group">
                    <label>Date of Submission</label>
                    <input type="date" name="date_of_submission" value="${new Date().toISOString().split('T')[0]}" required readonly>
                </div>
                <button type="submit" class="submit-btn">Submit</button>
            </form>
            <div id="generalPaymentMsg"></div>
        </div>
    `;

    const villagesByTaluka = {
        Gandhinagar: ["Adalaj","Adraj Moti","Alampur","Bhoyan Rathod","Bhundiya -Dharampur","Chandrala","Chekhalarani","Chhala","Chiloda - Dabhoda",
"Dabhoda","Dantali","Dashela","Dhanap","Dolarana Vasana", "Galudan","Giyod","Isanpur Mota","Jakhora - Rajpur","Jalund","Jamiyatpur","Jethipura",
"Kakanu Tarapur","Kanpur","Lavarpur","Lekawada","Limbadia-Karai","Madhavgadh","Magodi","Mahudara","Medra","Motipura","Mubarakpura","Nava Dharampura",
"Palaj","Pindharada","Piplaj","Pirojpur","Prantiya","Pundarasan","Raipur","Ranasan","Ratanpur","Rupal","Sadra","Sardhav","Shahpur","Shertha","Shiholi Moti","Sonarda","Sonipur",
"Tarapur","Titoda","Unava","Uvarsad","Vadodara","Vaja Pura","Valad","Vankanerda","Vasan","Vira Talavdi"],
        Mansa: ["Ajarapura","Ajol","Aluva","Amaja","Amarapur","Amarpura (Kh)","Ambod","Anandpura Ambod","Anandpura (Solaiya)","Anandpura Veda",
"Anguthala","Anodiya","Badpura","Baliyanagar (M)","Balva","Bapupura","Bhimpura (M)","Bilodra","Boru","Chadasna","Chandisana","Charada",
"Delvad","Delvada","Dhameda","Dhendhu","Dholakuva","Dodipal","Fatehpura","Galthara","Govindpura (Samo)","Gulabpura","Gunma","Hanumanpura (Samau)",
"Harna Hoda","Himmatpura (B)","Himmatpura (L)","Indrapura","Iswerpura","Itadra","Itla","Jamla","Khadat","Kharna","Khata Aamba",
"Kotvas","Kunvadara","Lakroda","Limbodara","Lodra","Mahudi","Makakhad","Mandali(V)","Manekpura (Makakhad)","Maninagar (Soja)",
"Motipura (Veda)","Nadri","Padusma","Paladi Rathod","Paladi (Vyas)","Parbatpura","Parsa","Patanpura","Pratap Nagar","Pratappura (Balva)",
"Pratappura (Piyaj)","Prempura Veda","Pundhara","Rajpura","Rampura","Rangpur","Ridrol","Samou","Sobhasan","Soja","Solaiya",
"Umiyanagar","Umiyanagar (B)","Vagosana","Varsoda","Veda","Vihar","Vijayanagar"],
        Dahegam: ["Adhana","Arsodiya","Bhadol","Bhavpura","Bhimasan","Bhoyan Moti","Bileshvarpura","Borisana","Chhatral","Dantali",
"Dhamasna","Dhanaj","Dhanot","Dingucha","Ganpatpura","Golthara","Govindpura (Veda)","Hajipur","Himmatpura (Veda)","Isand","Jaspur",
"Jethlaj","Kantha","Karoli","Khatrajdabhi","Khoraj","Mokhasan","Mulasana","Moti-Bhoyan","Nandoli","Nardipur","Nasmed","Nava","Ola","Paliyad",
"Palodiya","Palsana","Pansar","Piyaj","Rakanpur","Ramnagar","Rancharada","Ranchhodpura","Sabaspur","Saij","Sanavad","Santej",
"Sherisa","Unali","Usmanabad","Vadavsvami","Vadsar","Vansajada Dhedia","Vansajada (K)","Vayana","Veda"],
        Kalol: ["Anguthala","Aantroli","Ahamadpur","Amrajina Muvada","Antoli","Arajanjina Muvada","Babra","Badpur","Bahiyal","Bardoli (Bariya)",
"Bardoli (Kothi)","Bariya","Bhadroda","Bilamana","Chamla","Chekhlapagi","Chiskari","Demaliya","Devkaran Na Muvada","Dhaniyol",
"Dharisana","Dod","Dolatpura","Dumecha","Ghamij","Halisa","Harakhjina Muvada","Harsoli-Jivajini Muvadi","Harsoli-Jivajini Muvadi","Hathijan",
"Hilol","Hilol Vasna","Isanpur Dodiya","Jaliya Math","Jalundra Mota","Jalundra Nana","Jesa Chandna Muvada","Jindva","Jindva",
"Jivraj Na Muvada","Kadadara","Kadjodra","Kalyanji Na Muvada","Kamalbandh Vasna","Kanipur","Kantharpur","Karoli","Khadiya - Thadakuva",
"Khadiya - Thadakuva","Khakhara","Khanpur","Kodrali","Krishnanagar","Lakha Na Muvada","Lavad","Lihoda","Mahudiya","Mirapur","Mithana Muvada",
"Morali","Mosampur","Moti-Nani Machhang","Moti-Nani Machhang","Motipura","Motipura","Nagjina Muvada","Nandol","Narnavat (Khapreswar)",
"Navanagar","Ottampur","Pahadiya","Pahadiya","Palaiya","Pallano Math","Palundra","Panana Muvada","Pasuniya","Patna Kuva","Pavthi-Najupura",
"Pavthi-Najupura","Pavthi-Najupura","Piplaj","Rakhiyal","Ramnagar","Sagdalpur","Sahebji Na Muvada","Salki","Sametri","Sampa",
"Sanoda","Shiyapura","Shiyavada","Udan","Vadod","Vadvasa","Vardhana Muvada","Vasana Chaudhary","Vasna Rathod","Vasna Sogthi",
"Vatva","Velpura","Zalana Muvada","Zank"]
    };

    // Add event listener for taluka selection to update villages
    document.getElementById('talukaSelect').addEventListener('change', function() {
        const selectedTaluka = this.value;
        const villageSelect = document.getElementById('villageSelect');
        villageSelect.innerHTML = '<option value="">Select Village</option>';
        if (villagesByTaluka[selectedTaluka]) {
            villagesByTaluka[selectedTaluka].forEach(village => {
                const opt = document.createElement('option');
                opt.value = village;
                opt.textContent = village;
                villageSelect.appendChild(opt);
            });
        }
    });

    // Handle General Branch Submission
    document.getElementById('generalPaymentForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = Object.fromEntries(new FormData(form));
        // formData will now include branch_name
        const { error } = await supabase.from('payments').insert([formData]);
        document.getElementById('generalPaymentMsg').textContent = error ? error.message : 'Submitted!';
        if (!error) form.reset();
    });

    // Render Accounts Branch Form
    accountsForm.innerHTML = `
        <div class="form-section">
            <h3>Accounts Branch Bill Entry</h3>
            <form id="accountsSearchForm" class="styled-form">
                <div class="form-group">
                    <label>Praisa Bill Number</label>
                    <input type="text" name="praisa_bill_number" required>
                </div>
                <button type="submit" class="submit-btn">Fetch</button>
            </form>
            <div id="accountsDetails"></div>
        </div>
    `;

    // Handle Accounts Branch Search
    document.getElementById('accountsSearchForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const billNo = e.target.praisa_bill_number.value;
        const { data, error } = await supabase.from('payments').select('*').eq('praisa_bill_number', billNo).single();
        const detailsDiv = document.getElementById('accountsDetails');
        if (error || !data) {
            detailsDiv.textContent = 'Bill not found!';
            return;
        }
        detailsDiv.innerHTML = `
            <div class="form-section">
                <h4>Bill Details</h4>
                <div class="bill-details">
                    <div><strong>Subject:</strong> ${data.subject}</div>
                    <div><strong>Taluka:</strong> ${data.taluka_name}</div>
                    <div><strong>Village:</strong> ${data.village_name}</div>
                    <div><strong>Amount:</strong> ₹${data.amount}</div>
                    <div><strong>Date of Submission:</strong> ${formatDateDMY(data.date_of_submission)}</div>
                </div>
                <form id="accountsPaymentForm" class="styled-form">
                    <div class="form-group">
                        <label>Cheque Number (Bill)</label>
                        <input type="text" name="cheque_number_bill" value="${data.cheque_number_bill || ''}" required>
                    </div>
                    <div class="form-group">
                        <label>Cheque Number (Labour Cess)</label>
                        <input type="text" name="cheque_number_labour_cess" value="${data.cheque_number_labour_cess || ''}" required>
                    </div>
                    <div class="form-group">
                        <label>Date of Issue of Cheque</label>
                        <input type="date" name="date_of_issue_of_cheque" value="${new Date().toISOString().split('T')[0]}" required>
                    </div>
                    <button type="submit" class="submit-btn">Submit</button>
                </form>
                <div id="accountsPaymentMsg"></div>
            </div>
        `;
        // Handle Accounts Branch Submission
        document.getElementById('accountsPaymentForm').addEventListener('submit', async (ev) => {
            ev.preventDefault();
            const updateData = Object.fromEntries(new FormData(ev.target));
            const { error } = await supabase.from('payments').update(updateData).eq('praisa_bill_number', billNo);
            document.getElementById('accountsPaymentMsg').textContent = error ? error.message : 'Updated!';
        });
    });

    // Render Search Details Form
    document.getElementById('searchDetailsForm').innerHTML = `
        <div class="form-section">
            <h3>Search Bill Details</h3>
            <form id="searchDetailsFormInner" class="styled-form">
                <div class="form-group">
                    <label>Praisa Bill Number</label>
                    <input type="text" name="praisa_bill_number" required>
                </div>
                <button type="submit" class="submit-btn">Search</button>
            </form>
            <div id="searchDetailsResult"></div>
        </div>
    `;

    // Handle Search Details Submission
    document.getElementById('searchDetailsFormInner').addEventListener('submit', async (e) => {
        e.preventDefault();
        const billNo = e.target.praisa_bill_number.value;
        const { data, error } = await supabase.from('payments').select('*').eq('praisa_bill_number', billNo).single();
        const resultDiv = document.getElementById('searchDetailsResult');
        if (error || !data) {
            resultDiv.textContent = 'Bill not found!';
            return;
        }
        resultDiv.innerHTML = `
            <div class="form-section">
                <h4>Bill Details</h4>
                <div class="bill-details">
                    <div><strong>Praisa Bill Number:</strong> ${data.praisa_bill_number}</div>
                    <div><strong>Subject:</strong> ${data.subject}</div>
                    <div><strong>Taluka:</strong> ${data.taluka_name}</div>
                    <div><strong>Village:</strong> ${data.village_name}</div>
                    <div><strong>Amount:</strong> ₹${data.amount}</div>
                    <div><strong>Branch Name:</strong> ${data.branch_name || '-'}</div>
                    <div><strong>Date of Submission:</strong> ${formatDateDMY(data.date_of_submission)}</div>
                    <div><strong>Cheque Number (Bill):</strong> ${data.cheque_number_bill || '-'}</div>
                    <div><strong>Cheque Number (Labour Cess):</strong> ${data.cheque_number_labour_cess || '-'}</div>
                    <div><strong>Date of Issue of Cheque:</strong> ${formatDateDMY(data.date_of_issue_of_cheque)}</div>
                </div>
            </div>
        `;
    });
    
    
    
    // --- Render General Register Table
    generalRegisterForm.innerHTML = `
        <div >
            <h3><u><center>All Payment Entries (General Register)</center></u></h3>
            <div id="generalRegisterTableContainer"></div>
        </div>
    `;
    generalRegisterTab.addEventListener('click', async () => {
        renderPaymentsTable('generalRegisterTableContainer');
    });
  // --- Render Search Register Form
   searchRegisterForm.innerHTML = `
        
            <h3><center><strong><u>Search Payment-Details by Date</u></strong></center></h3>
            <form id="searchRegisterFormInner" class="styled-form">
                
                    <label><center>From Date</label>
                    <input type="date"   name="from_date" required>
                
             
                    <label>To Date</label>
                    <input type="date" name="to_date" required></center>
               
                <center><button type="submit" class="submit-btn">Show Register</button></center>
            </form>
            <div id="searchRegisterResults"></div>
        
    `;
    document.getElementById('searchRegisterFormInner').addEventListener('submit', async (e) => {
        e.preventDefault();
        const from = e.target.from_date.value;
        const to = e.target.to_date.value;
        if (!from || !to) return;
        
    // Hide the form section
    //e.target.style.display = 'none'; // This hides the <div class="form-section"> containing the form

        await renderPaymentsTable('searchRegisterResults', from, to);
    });

    // --- Table Rendering Function (used by both registers)
    async function renderPaymentsTable(containerId, fromDate = null, toDate = null) {
        const tableContainer = document.getElementById(containerId);
        tableContainer.innerHTML = '<div>Loading...</div>';
        let query = supabase.from('payments').select('*');
        if (fromDate && toDate) {
            query = query.gte('date_of_submission', fromDate).lte('date_of_submission', toDate);
        }
        const { data, error } = await query.order('date_of_submission', { ascending: true });
        if (error || !data || data.length === 0) {
            tableContainer.innerHTML = '<div>No records found.</div>';
            return;
        }

        // Table headers (similar look to reports/pendency)
        let html = `
            <table class="results-table">
                <thead>
                    <tr>
                        <th>Bill No</th>
                        <th>Branch</th>
                        <th>Subject</th>
                        <th>Taluka</th>
                        <th>Village</th>
                        <th>Amount</th>
                        <th>Date of Submission</th>
                        <th>Cheque No (Bill)</th>
                        <th>Cheque No (Labour Cess)</th>
                        <th>Date of Cheque Issue</th>
                    </tr>
                </thead>
                <tbody>
        `;
        let totalAmount = 0;
        data.forEach(row => {
            totalAmount += Number(row.amount) || 0;
            html += `
                <tr>
                    <td>${row.praisa_bill_number || ''}</td>
                    <td>${row.branch_name || '-'}</td>
                    <td>${row.subject || '-'}</td>
                    <td>${row.taluka_name || '-'}</td>
                    <td>${row.village_name || '-'}</td>
                    <td>₹${row.amount ? Number(row.amount).toLocaleString('en-IN') : '-'}</td>
                    <td>${formatDateDMY(row.date_of_submission)}</td>
                    <td>${row.cheque_number_bill || '-'}</td>
                    <td>${row.cheque_number_labour_cess || '-'}</td>
                    <td>${formatDateDMY(row.date_of_issue_of_cheque)}</td>
                </tr>
            `;
        });
        html += `</tbody>
            <tfoot>
                <tr class="total-row">
                    <td colspan="5" style="text-align:right;"><strong>Total:</strong></td>
                    <td colspan="5"><strong>₹${totalAmount.toLocaleString('en-IN')}</strong></td>
                </tr>
            </tfoot>
        </table>`;

        // If search register, add summary table
        if (fromDate && toDate) {
            // Group by date
            let summary = {};
            data.forEach(row => {
                let date = row.date_of_submission ? row.date_of_submission.split('T')[0] : '';
                if (!date) return;
                if (!summary[date]) summary[date] = { bills: 0, cheques: 0 };
                summary[date].bills += 1;
                if (row.cheque_number_bill || row.cheque_number_labour_cess) summary[date].cheques += 1;
            });
            const dates = Object.keys(summary).sort();
            let totalBills = 0, totalCheques = 0;
            let summaryHtml = `
                <h4>Date-wise Summary</h4>
                <table class="results-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>No. of Bills to Account</th>
                            <th>No. of Cheques Issued</th>
                        </tr>
                    </thead>
                    <tbody>
            `;
            dates.forEach(date => {
                summaryHtml += `<tr>
                    <td>${formatDateDMY(date)}</td>
                    <td>${summary[date].bills}</td>
                    <td>${summary[date].cheques}</td>
                </tr>`;
                totalBills += summary[date].bills;
                totalCheques += summary[date].cheques;
            });
            summaryHtml += `</tbody>
                <tfoot>
                    <tr class="total-row">
                        <td style="text-align:right;"><strong>Total</strong></td>
                        <td><strong>${totalBills}</strong></td>
                        <td><strong>${totalCheques}</strong></td>
                    </tr>
                </tfoot>
                </table>
            `;
            html += summaryHtml;
        }

        tableContainer.innerHTML = html;
    }
});

  /*  // Tab switching logic for all payment tabs
    const tabIds = [
        { tab: 'generalBranchTab', form: 'generalBranchForm' },
        { tab: 'accountsBranchTab', form: 'accountsBranchForm' },
        { tab: 'searchDetailsTab', form: 'searchDetailsForm' }
    ];*/

   /* tabIds.forEach(({ tab, form }) => {
        document.getElementById(tab).addEventListener('click', () => {
            // Remove 'active' from all tabs and hide all forms
            tabIds.forEach(({ tab: t, form: f }) => {
                document.getElementById(t).classList.remove('active');
                document.getElementById(f).style.display = 'none';
            });
            // Activate the clicked tab and show its form
            document.getElementById(tab).classList.add('active');
            document.getElementById(form).style.display = '';
        });
    });
});*/


function formatDateDMY(dateStr) {
    if (!dateStr) return '-';
    const d = new Date(dateStr);
    if (isNaN(d)) return dateStr;
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
}

