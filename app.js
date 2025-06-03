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
            }

            // Add active class to the clicked tab
            this.classList.add('active');
        });
    });

    // Show the first tab's content by default
    tabs[0].click();
});
