import { protectRoute } from './routeGuard.js';

// Protect data entry page
protectRoute(['admin', 'user']);

document.addEventListener('DOMContentLoaded', function () {
    const tabs = document.querySelectorAll('.tab');
    const contents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', function (e) {
            e.preventDefault();

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
            }

            // Add active class to the clicked tab
            this.classList.add('active');
        });
    });

    // Show the first tab's content by default
    tabs[0].click();

    // Handle search functionality in "Edit Work Details"
    const searchButton = document.getElementById('searchButton');
    const editFields = document.getElementById('editFields');

    searchButton.addEventListener('click', function () {
        // Simulate fetching data for the entered Work ID
        const workId = document.getElementById('searchWorkId').value;
        if (workId) {
            // Show editable fields (you can populate these fields with fetched data)
            editFields.style.display = 'block';
        }
    });

    const schemeSelection = document.getElementById('schemeSelection');
    const freshEntry = document.getElementById('freshEntry');
    const proceedButton = document.getElementById('proceedButton');
    const schemeDropdown = document.getElementById('scheme');

    console.log('JavaScript loaded'); // Debugging log

    // Handle "Proceed" button click
    proceedButton.addEventListener('click', function () {
        console.log('Proceed button clicked'); // Debugging log

        const selectedScheme = schemeDropdown.value;

        if (!selectedScheme) {
            alert('Please select a scheme before proceeding.');
            return;
        }

        console.log('Selected scheme:', selectedScheme); // Debugging log

        // Hide the scheme selection section
        schemeSelection.style.display = 'none';

        // Show the fresh entry form
        freshEntry.style.display = 'block';
    });
});
