// Storage Management - Handles localStorage operations

class StorageManager {
    constructor() {
        this.initializeStorage();
    }

    initializeStorage() {
        if (!localStorage.getItem('users')) {
            localStorage.setItem('users', JSON.stringify({}));
        }
        if (!localStorage.getItem('currentUser')) {
            localStorage.setItem('currentUser', null);
        }
    }

    // User Management
    registerUser(username, password) {
        const users = JSON.parse(localStorage.getItem('users'));
        if (users[username]) {
            return { success: false, message: 'User already exists' };
        }

        users[username] = {
            password: password, // In production, this should be hashed
            watchlist: {
                watching: [],
                towatch: [],
                completed: []
            },
            createdAt: new Date().toISOString()
        };

        localStorage.setItem('users', JSON.stringify(users));
        return { success: true, message: 'User registered successfully' };
    }

    loginUser(username, password) {
        const users = JSON.parse(localStorage.getItem('users'));
        if (!users[username]) {
            // Auto-register if user doesn't exist
            return this.registerUser(username, password);
        }

        const user = users[username];
        if (user.password !== password) {
            return { success: false, message: 'Incorrect password' };
        }

        localStorage.setItem('currentUser', username);
        return { success: true, message: 'Logged in successfully' };
    }

    logoutUser() {
        localStorage.setItem('currentUser', null);
    }

    getCurrentUser() {
        return localStorage.getItem('currentUser');
    }

    isUserLoggedIn() {
        return localStorage.getItem('currentUser') !== 'null' && localStorage.getItem('currentUser') !== null;
    }

    // Watchlist Management
    addToWatchlist(animeId, category = 'towatch') {
        const currentUser = this.getCurrentUser();
        if (!currentUser) return false;

        const users = JSON.parse(localStorage.getItem('users'));
        const watchlist = users[currentUser].watchlist;

        // Get anime data from sessionStorage if available
        const animeData = this.getAnimeData(animeId);

        if (!watchlist[category]) {
            watchlist[category] = [];
        }

        // Check if already in watchlist
        if (watchlist[category].find(a => a.id === animeId)) {
            return false;
        }

        watchlist[category].push({
            id: animeId,
            ...animeData,
            addedAt: new Date().toISOString()
        });

        localStorage.setItem('users', JSON.stringify(users));
        return true;
    }

    removeFromWatchlist(animeId) {
        const currentUser = this.getCurrentUser();
        if (!currentUser) return false;

        const users = JSON.parse(localStorage.getItem('users'));
        const watchlist = users[currentUser].watchlist;

        ['watching', 'towatch', 'completed'].forEach(category => {
            watchlist[category] = watchlist[category].filter(a => a.id !== animeId);
        });

        localStorage.setItem('users', JSON.stringify(users));
        return true;
    }

    updateWatchlistStatus(animeId, newCategory) {
        const currentUser = this.getCurrentUser();
        if (!currentUser) return false;

        const users = JSON.parse(localStorage.getItem('users'));
        const watchlist = users[currentUser].watchlist;

        let animeItem = null;

        // Find anime in any category
        ['watching', 'towatch', 'completed'].forEach(category => {
            const found = watchlist[category].find(a => a.id === animeId);
            if (found) {
                animeItem = found;
                watchlist[category] = watchlist[category].filter(a => a.id !== animeId);
            }
        });

        if (animeItem && newCategory) {
            if (!watchlist[newCategory]) {
                watchlist[newCategory] = [];
            }
            watchlist[newCategory].push(animeItem);
        }

        localStorage.setItem('users', JSON.stringify(users));
        return true;
    }

    getWatchlist(category = null) {
        const currentUser = this.getCurrentUser();
        if (!currentUser) return null;

        const users = JSON.parse(localStorage.getItem('users'));
        const watchlist = users[currentUser].watchlist;

        if (category) {
            return watchlist[category] || [];
        }

        return watchlist;
    }

    isInWatchlist(animeId) {
        const currentUser = this.getCurrentUser();
        if (!currentUser) return false;

        const users = JSON.parse(localStorage.getItem('users'));
        const watchlist = users[currentUser].watchlist;

        return ['watching', 'towatch', 'completed'].some(category =>
            watchlist[category].find(a => a.id === animeId)
        );
    }

    getAnimeWatchlistStatus(animeId) {
        const currentUser = this.getCurrentUser();
        if (!currentUser) return null;

        const users = JSON.parse(localStorage.getItem('users'));
        const watchlist = users[currentUser].watchlist;

        for (const [category, animes] of Object.entries(watchlist)) {
            if (animes.find(a => a.id === animeId)) {
                return category;
            }
        }

        return null;
    }

    // Anime Data Cache
    saveAnimeData(animeId, data) {
        const cache = JSON.parse(sessionStorage.getItem('animeCache') || '{}');
        cache[animeId] = data;
        sessionStorage.setItem('animeCache', JSON.stringify(cache));
    }

    getAnimeData(animeId) {
        const cache = JSON.parse(sessionStorage.getItem('animeCache') || '{}');
        return cache[animeId] || null;
    }

    // Statistics
    getUserStats() {
        const currentUser = this.getCurrentUser();
        if (!currentUser) return null;

        const users = JSON.parse(localStorage.getItem('users'));
        const watchlist = users[currentUser].watchlist;

        return {
            total: ['watching', 'towatch', 'completed'].reduce((sum, cat) => sum + watchlist[cat].length, 0),
            watching: watchlist.watching.length,
            towatch: watchlist.towatch.length,
            completed: watchlist.completed.length
        };
    }

    // Data Reset
    resetUserData() {
        const currentUser = this.getCurrentUser();
        if (!currentUser) return false;

        const users = JSON.parse(localStorage.getItem('users'));
        users[currentUser].watchlist = {
            watching: [],
            towatch: [],
            completed: []
        };

        localStorage.setItem('users', JSON.stringify(users));
        return true;
    }

    deleteUserAccount(username) {
        const users = JSON.parse(localStorage.getItem('users'));
        delete users[username];
        localStorage.setItem('users', JSON.stringify(users));

        if (this.getCurrentUser() === username) {
            this.logoutUser();
        }
    }
}

// Initialize storage manager
const storageManager = new StorageManager();
