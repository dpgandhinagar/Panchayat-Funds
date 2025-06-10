import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.39.0/+esm';
import bcrypt from 'https://cdn.jsdelivr.net/npm/bcryptjs@2.4.3/dist/bcrypt.min.js';

const SUPABASE_URL = 'https://jyailcsclxjzcnyrnsic.supabase.co';
const SUPABASE_KEY = 'your-supabase-key';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export class AuthService {
    static async login(username, password) {
        try {
            // Input validation
            if (!this.validateUsername(username) || !this.validatePassword(password)) {
                throw new Error('Invalid username or password format');
            }

            // Get user from database
            const { data: user, error } = await supabase
                .from('users')
                .select('*')
                .eq('username', username)
                .single();

            if (error) throw error;

            if (!user || user.account_locked) {
                throw new Error('Invalid credentials or account locked');
            }

            // Verify password
            const passwordMatch = await bcrypt.compare(password, user.password_hash);

            if (!passwordMatch) {
                // Update failed login attempts
                await supabase
                    .from('users')
                    .update({
                        failed_login_attempts: user.failed_login_attempts + 1
                    })
                    .eq('id', user.id);

                throw new Error('Invalid credentials');
            }

            // Reset failed login attempts and update last login
            await supabase
                .from('users')
                .update({
                    failed_login_attempts: 0,
                    last_login: new Date().toISOString()
                })
                .eq('id', user.id);

            // Create session data
            const sessionData = {
                id: user.id,
                username: user.username,
                role: user.role,
                sessionStart: new Date().toISOString()
            };

            // Store session securely
            sessionStorage.setItem('auth_session', JSON.stringify(sessionData));

            return sessionData;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    }

    static validateUsername(username) {
        const usernameRegex = /^[a-zA-Z0-9_]{4,30}$/;
        return usernameRegex.test(username);
    }

    static validatePassword(password) {
        // At least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    }

    static isAuthenticated() {
        const session = sessionStorage.getItem('auth_session');
        if (!session) return false;

        try {
            const sessionData = JSON.parse(session);
            const sessionAge = new Date() - new Date(sessionData.sessionStart);
            // Session expires after 2 hours
            return sessionAge < 7200000;
        } catch {
            return false;
        }
    }

    static logout() {
        sessionStorage.removeItem('auth_session');
        window.location.href = '/login.html';
    }
}