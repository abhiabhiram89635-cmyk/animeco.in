// Search Page Script

async function initSearch() {
    setupSearchListeners();
}

function setupSearchListeners() {
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');

    if (searchBtn) {
        searchBtn.addEventListener('click', performSearch);
    }

    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
}

async function performSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput?.value?.trim();

    if (!searchTerm) {
        alert('Please enter a search term');
        return;
    }

    const resultsContainer = document.getElementById('searchResults');
    const noResults = document.getElementById('noResults');
    const initialMessage = document.getElementById('initialMessage');

    // Show loading
    resultsContainer.style.display = 'none';
    noResults.style.display = 'none';
    initialMessage.style.display = 'none';

    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'loading';
    loadingDiv.innerHTML = `
        <span class="en">Searching...</span>
        <span class="te" style="display:none;">వెతుకుతున్నా...</span>
    `;
    resultsContainer.innerHTML = '';
    resultsContainer.appendChild(loadingDiv);
    resultsContainer.style.display = 'grid';

    try {
        const data = await apiManager.searchAnime(searchTerm, 1, 24);

        if (data && data.Page && data.Page.media && data.Page.media.length > 0) {
            resultsContainer.innerHTML = '';
            UIManager.displayAnimeGrid(data.Page.media, 'searchResults');
            resultsContainer.style.display = 'grid';
            noResults.style.display = 'none';
        } else {
            resultsContainer.style.display = 'none';
            noResults.style.display = 'block';
        }
    } catch (error) {
        console.error('Search error:', error);
        resultsContainer.style.display = 'none';
        noResults.style.display = 'block';
    }

    languageManager.applyLanguage();
}

document.addEventListener('DOMContentLoaded', initSearch);
