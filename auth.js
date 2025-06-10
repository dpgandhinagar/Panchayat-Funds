import { AuthService } from './authService.js';

document.getElementById('authForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const errorDiv = document.getElementById('authError');
    const submitBtn = document.querySelector('.auth-submit-btn');
    
    try {
        // Disable submit button
        submitBtn.disabled = true;
        submitBtn.textContent = 'Logging in...';
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Attempt login
        const userData = await AuthService.login(username, password);
        
        // Get return URL or default to index
        const returnUrl = new URLSearchParams(window.location.search).get('returnUrl') || 'index.html';
        window.location.href = returnUrl;

    } catch (error) {
        console.error('Auth error:', error);
        errorDiv.textContent = error.message;
        errorDiv.style.display = 'block';
    } finally {
        // Re-enable submit button
        submitBtn.disabled = false;
        submitBtn.textContent = 'Login';
    }
});