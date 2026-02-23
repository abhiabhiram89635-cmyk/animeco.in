// Anime Detail Page Script

async function initDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const animeId = urlParams.get('id');

    if (!animeId) {
        UIManager.showError('animeDetail', 'Anime not found');
        return;
    }

    await loadAnimeDetail(animeId);
}

async function loadAnimeDetail(animeId) {
    UIManager.showLoading('animeDetail');

    try {
        const data = await apiManager.getAnimeDetails(animeId);

        if (data && data.Media) {
            const anime = data.Media;
            storageManager.saveAnimeData(animeId, {
                id: anime.id,
                title: anime.title,
                coverImage: anime.coverImage,
                episodes: anime.episodes,
                meanScore: anime.meanScore,
                genres: anime.genres
            });

            const detailHTML = UIManager.createDetailPage(anime);
            document.getElementById('animeDetail').innerHTML = detailHTML;

            // Initialize watch now feature
            const animeTitle = apiManager.getTitle(anime.title);
            const totalEpisodes = anime.episodes || 12;
            episodesManager.initWatchNow(animeId, animeTitle, totalEpisodes);

            // Re-apply language after updating content
            languageManager.applyLanguage();
        } else {
            UIManager.showError('animeDetail', 'Failed to load anime details');
        }
    } catch (error) {
        console.error('Error loading anime detail:', error);
        UIManager.showError('animeDetail', 'Failed to load anime details');
    }
}

document.addEventListener('DOMContentLoaded', initDetail);
