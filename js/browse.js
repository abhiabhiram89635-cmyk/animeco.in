// Browse Page Script

let currentPage = 1;
let currentData = null;
let hasNextPage = false;

async function initBrowse() {
    setupFilterListeners();
    loadAnimeList();
}

function setupFilterListeners() {
    const genreFilter = document.getElementById('genreFilter');
    const statusFilter = document.getElementById('statusFilter');
    const sortFilter = document.getElementById('sortFilter');

    [genreFilter, statusFilter, sortFilter].forEach(filter => {
        if (filter) {
            filter.addEventListener('change', () => {
                currentPage = 1;
                loadAnimeList();
            });
        }
    });
}

async function loadAnimeList() {
    UIManager.showLoading('animeList');

    const genreValue = document.getElementById('genreFilter')?.value;
    const statusValue = document.getElementById('statusFilter')?.value;
    const sortValue = document.getElementById('sortFilter')?.value;

    try {
        let data = null;

        if (genreValue) {
            data = await apiManager.getAnimeByGenre(genreValue, currentPage, 12);
        } else if (statusValue) {
            data = await apiManager.getAnimeByStatus(statusValue, currentPage, 12);
        } else if (sortValue === 'trending') {
            data = await apiManager.getTrendingAnime(currentPage, 12);
        } else {
            data = await apiManager.getPopularAnime(currentPage, 12);
        }

        if (data && data.Page && data.Page.media) {
            currentData = data;
            hasNextPage = data.Page.pageInfo.hasNextPage;

            UIManager.displayAnimeGrid(data.Page.media, 'animeList');

            const loadMoreBtn = document.getElementById('loadMoreBtn');
            if (loadMoreBtn) {
                loadMoreBtn.style.display = hasNextPage ? 'block' : 'none';
                loadMoreBtn.onclick = () => loadMoreAnime();
            }
        } else {
            UIManager.showError('animeList', 'Failed to load anime list');
        }
    } catch (error) {
        console.error('Error loading anime:', error);
        UIManager.showError('animeList', 'Failed to load anime list');
    }
}

async function loadMoreAnime() {
    currentPage++;
    const container = document.getElementById('animeList');
    const currentHTML = container.innerHTML;

    try {
        const genreValue = document.getElementById('genreFilter')?.value;
        const statusValue = document.getElementById('statusFilter')?.value;
        const sortValue = document.getElementById('sortFilter')?.value;

        let data = null;

        if (genreValue) {
            data = await apiManager.getAnimeByGenre(genreValue, currentPage, 12);
        } else if (statusValue) {
            data = await apiManager.getAnimeByStatus(statusValue, currentPage, 12);
        } else if (sortValue === 'trending') {
            data = await apiManager.getTrendingAnime(currentPage, 12);
        } else {
            data = await apiManager.getPopularAnime(currentPage, 12);
        }

        if (data && data.Page && data.Page.media) {
            hasNextPage = data.Page.pageInfo.hasNextPage;
            const newCards = data.Page.media.map(anime => UIManager.createAnimeCard(anime)).join('');
            container.innerHTML = currentHTML + newCards;

            // Add click listeners to new cards
            container.querySelectorAll('.anime-card').forEach(card => {
                card.addEventListener('click', () => {
                    const animeId = card.dataset.animeId;
                    window.location.href = `anime-detail.html?id=${animeId}`;
                });
            });

            const loadMoreBtn = document.getElementById('loadMoreBtn');
            if (loadMoreBtn && !hasNextPage) {
                loadMoreBtn.style.display = 'none';
            }

            // Scroll to new content
            window.scrollBy(0, 500);
        }
    } catch (error) {
        console.error('Error loading more anime:', error);
        currentPage--;
    }
}

document.addEventListener('DOMContentLoaded', initBrowse);
