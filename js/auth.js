// Authentication Management

class AuthManager {
    constructor() {
        this.setupAuthListeners();
        this.updateAuthUI();
    }

    setupAuthListeners() {
        const authBtn = document.getElementById('authBtn');
        const submitAuthBtn = document.getElementById('submitAuthBtn');
        const authModal = document.getElementById('authModal');
        const closeBtn = document.querySelector('.close');
        const logoutBtn = document.getElementById('logoutBtn');

        if (authBtn) {
            authBtn.addEventListener('click', () => this.openAuthModal());
        }

        if (submitAuthBtn) {
            submitAuthBtn.addEventListener('click', () => this.handleAuth());
        }

        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeAuthModal());
        }

        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => this.logout());
        }

        // Close modal when clicking outside
        if (authModal) {
            window.addEventListener('click', (event) => {
                if (event.target === authModal) {
                    this.closeAuthModal();
                }
            });
        }

        // Allow Enter key to submit
        const usernameInput = document.getElementById('username');
        const passwordInput = document.getElementById('password');

        if (usernameInput && passwordInput) {
            [usernameInput, passwordInput].forEach(input => {
                input.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        this.handleAuth();
                    }
                });
            });
        }
    }

    openAuthModal() {
        const authModal = document.getElementById('authModal');
        if (authModal) {
            authModal.style.display = 'block';
            document.getElementById('username').focus();
        }
    }

    closeAuthModal() {
        const authModal = document.getElementById('authModal');
        if (authModal) {
            authModal.style.display = 'none';
        }
        // Clear form
        const usernameInput = document.getElementById('username');
        const passwordInput = document.getElementById('password');
        if (usernameInput) usernameInput.value = '';
        if (passwordInput) passwordInput.value = '';
    }

    handleAuth() {
        const usernameInput = document.getElementById('username');
        const passwordInput = document.getElementById('password');

        const username = usernameInput?.value?.trim();
        const password = passwordInput?.value?.trim();

        if (!username || !password) {
            alert('Please enter both username and password');
            return;
        }

        if (username.length < 3) {
            alert('Username must be at least 3 characters');
            return;
        }

        if (password.length < 3) {
            alert('Password must be at least 3 characters');
            return;
        }

        const result = storageManager.loginUser(username, password);

        if (result.success) {
            this.closeAuthModal();
            this.updateAuthUI();
            alert(`Welcome, ${username}!`);
        } else {
            alert(result.message);
        }
    }

    logout() {
        if (confirm('Are you sure you want to logout?')) {
            storageManager.logoutUser();
            this.updateAuthUI();
            window.location.href = 'index.html';
        }
    }

    updateAuthUI() {
        const authBtn = document.getElementById('authBtn');
        const logoutBtn = document.getElementById('logoutBtn');
        const isLoggedIn = storageManager.isUserLoggedIn();
        const currentUser = storageManager.getCurrentUser();

        if (authBtn) {
            authBtn.style.display = isLoggedIn ? 'none' : 'block';
        }

        if (logoutBtn) {
            logoutBtn.style.display = isLoggedIn ? 'block' : 'none';
            if (isLoggedIn) {
                // Update logout button text to show username
                const span = logoutBtn.querySelector('span.en');
                if (span) {
                    span.textContent = `Logout (${currentUser})`;
                }
            }
        }
    }

    requireLogin(callback) {
        if (!storageManager.isUserLoggedIn()) {
            alert('Please sign in to continue');
            document.getElementById('authBtn').click();
            return false;
        }
        return true;
    }
}

// Initialize auth manager
const authManager = new AuthManager();
