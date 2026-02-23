// Main Page Script - Homepage

async function initHomepage() {
    loadFeaturedAnime();
    loadPopularAnime();
}

async function loadFeaturedAnime() {
    UIManager.showLoading('featuredAnime');

    try {
        const data = await apiManager.getFeaturedAnime();
        if (data && data.Page && data.Page.media) {
            UIManager.displayAnimeGrid(data.Page.media, 'featuredAnime');
        } else {
            UIManager.showError('featuredAnime', 'Failed to load featured anime');
        }
    } catch (error) {
        console.error('Error loading featured anime:', error);
        UIManager.showError('featuredAnime', 'Failed to load featured anime');
    }
}

async function loadPopularAnime() {
    UIManager.showLoading('popularAnime');

    try {
        const data = await apiManager.getPopularAnime(1, 12);
        if (data && data.Page && data.Page.media) {
            UIManager.displayAnimeGrid(data.Page.media, 'popularAnime');
        } else {
            UIManager.showError('popularAnime', 'Failed to load popular anime');
        }
    } catch (error) {
        console.error('Error loading popular anime:', error);
        UIManager.showError('popularAnime', 'Failed to load popular anime');
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initHomepage);
