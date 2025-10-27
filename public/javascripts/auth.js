document.addEventListener('DOMContentLoaded', () => {
    const getToken = () => localStorage.getItem('authToken');
    const getUser = () => {
        try { return JSON.parse(localStorage.getItem('authUser') || 'null'); } catch { return null; }
    };

    const updateUI = () => {
        const token = getToken();
        const isAuthenticated = !!token;
        const user = getUser();

        window.authToken = token;
        window.isAuthenticated = isAuthenticated;

        document.querySelectorAll('[data-auth-only]').forEach(el => {
            el.style.display = isAuthenticated ? '' : 'none';
        });
        document.querySelectorAll('[data-guest-only]').forEach(el => {
            el.style.display = isAuthenticated ? 'none' : '';
        });

        // Fill elements that want a user display (e.g. <span data-auth-user></span>)
        document.querySelectorAll('[data-auth-user]').forEach(el => {
            el.textContent = user ? (user.name || user.username || user.email || '') : '';
        });

        // Attach logout handlers to elements marked with data-auth-logout
        document.querySelectorAll('[data-auth-logout]').forEach(el => {
            if (el.dataset._logoutAttached === 'true') return;
            el.addEventListener('click', (e) => {
                e.preventDefault();
                localStorage.removeItem('authToken');
                updateUI();
                window.location.href = '/';
            });
            el.dataset._logoutAttached = 'true';
        });

        document.dispatchEvent(new CustomEvent('auth:loaded', {
            detail: { isAuthenticated, token }
        }));
    };

    updateUI();

    // Keep UI in sync across tabs/windows when localStorage changes
    window.addEventListener('storage', (e) => {
        if (e.key === 'authToken' || e.key === 'authUser') updateUI();
    });
});