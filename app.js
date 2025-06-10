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

    // Check authentication status
    checkAuthStatus();
    
    // Auth button click handler
    document.getElementById('authButton').addEventListener('click', handleAuth);
});

function checkAuthStatus() {
    const user = sessionStorage.getItem('auth_session');
    const authButton = document.getElementById('authButton');
    const userInfo = document.getElementById('userInfo');
    const dataEntryLink = document.querySelector('.auth-required');

    if (user) {
        // User is logged in
        const userData = JSON.parse(user);
        document.getElementById('userName').textContent = userData.username;
        userInfo.style.display = 'inline';
        authButton.textContent = 'Logout';
        
        // Show data entry link
        if (dataEntryLink) {
            dataEntryLink.style.display = '';
        }
    } else {
        // User is not logged in
        userInfo.style.display = 'none';
        authButton.textContent = 'Login';
        
        // Hide data entry link
        if (dataEntryLink) {
            dataEntryLink.style.display = 'none';
        }
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
