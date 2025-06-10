import { AuthService } from './authService.js';

export function protectRoute(allowedRoles = ['admin', 'user']) {
    const session = sessionStorage.getItem('auth_session');
    
    if (!session) {
        const currentPath = encodeURIComponent(window.location.pathname);
        window.location.href = `/auth.html?returnUrl=${currentPath}`;
        return;
    }

    try {
        const userData = JSON.parse(session);
        
        // Check if session is expired
        if (!AuthService.isAuthenticated()) {
            AuthService.logout();
            return;
        }

        // Check role authorization
        if (!allowedRoles.includes(userData.role)) {
            window.location.href = '/unauthorized.html';
            return;
        }

    } catch (error) {
        console.error('Route guard error:', error);
        AuthService.logout();
    }
}