import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.39.0/+esm'

const supabaseUrl = 'https://jyailcsclxjzcnyrnsic.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5YWlsY3NjbHhqemNueXJuc2ljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU4MjM1OTksImV4cCI6MjA2MTM5OTU5OX0.TVh104V8SnfeRTWywzYU96j-7uKtbzX6Tf8kjQbPwKk'
const supabase = createClient(supabaseUrl, supabaseKey)

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    try {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('username', username)
            .eq('password', password)
            .single();

        if (error) throw error;

        if (data) {
            // Store user session
            localStorage.setItem('user', JSON.stringify(data));
            // Redirect to main page
            window.location.href = 'index.html';
        } else {
            document.getElementById('loginError').textContent = 'Invalid username or password';
        }
    } catch (error) {
        console.error('Login error:', error);
        document.getElementById('loginError').textContent = 'Login failed. Please try again.';
    }
});