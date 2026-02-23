// UI Management - Handles DOM updates and UI interactions

class UIManager {
    // Create anime card HTML
    static createAnimeCard(anime) {
        const title = apiManager.getTitle(anime.title);
        const coverImage = anime.coverImage?.large || 'https://via.placeholder.com/200x300';
        const score = anime.meanScore ? `${anime.meanScore}%` : 'N/A';
        const year = anime.startDate?.year || 'N/A';
        const episodes = anime.episodes || '?';

        const cardHTML = `
            <div class="anime-card" data-anime-id="${anime.id}">
                <img src="${coverImage}" alt="${title}" class="anime-poster" onerror="this.src='https://via.placeholder.com/200x300'">
                <div class="anime-info">
                    <h3 class="anime-title">${title}</h3>
                    <div class="anime-meta">
                        <span>${year}</span> |
                        <span>${episodes} ${languageManager.currentLanguage === 'en' ? 'episodes' : 'ఎపిసోడ్‌లు'}</span>
                    </div>
                    <div class="anime-rating">⭐ ${score}</div>
                </div>
            </div>
        `;

        return cardHTML;
    }

    // Display anime grid
    static displayAnimeGrid(animes, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        if (!animes || animes.length === 0) {
            container.innerHTML = `
                <p class="en empty-message">No anime found</p>
                <p class="te empty-message" style="display:none;">అనిమే కనుగొనబడలేదు</p>
            `;
            return;
        }

        container.innerHTML = animes.map(anime => UIManager.createAnimeCard(anime)).join('');

        // Add click listeners to cards
        container.querySelectorAll('.anime-card').forEach(card => {
            card.addEventListener('click', () => {
                const animeId = card.dataset.animeId;
                window.location.href = `anime-detail.html?id=${animeId}`;
            });
        });
    }

    // Format synopsis (truncate)
    static formatSynopsis(text, maxLength = 200) {
        if (!text) return 'No description available';
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    }

    // Show loading state
    static showLoading(containerId) {
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = `
                <div class="loading">
                    <span class="en">Loading...</span>
                    <span class="te" style="display:none;">లోడ్ చేస్తున్నా...</span>
                </div>
            `;
        }
    }

    // Show error state
    static showError(containerId, message = 'An error occurred') {
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = `
                <div class="error-message" style="text-align: center; padding: 2rem; color: #ff6b6b;">
                    <p>${message}</p>
                    <p style="font-size: 0.9rem; color: #b0b0b0;">Please try again later</p>
                </div>
            `;
        }
    }

    // Format date
    static formatDate(dateObj) {
        if (!dateObj || (!dateObj.day && !dateObj.month && !dateObj.year)) {
            return 'Unknown';
        }

        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const month = dateObj.month ? months[dateObj.month - 1] : '';
        const day = dateObj.day ? dateObj.day : '';
        const year = dateObj.year ? dateObj.year : '';

        return `${day} ${month} ${year}`.trim();
    }

    // Create detail page HTML
    static createDetailPage(anime) {
        const title = apiManager.getTitle(anime.title);
        const coverImage = anime.coverImage?.extraLarge || anime.coverImage?.large;
        const score = anime.meanScore || 'N/A';
        const episodes = anime.episodes || '?';
        const status = anime.status || 'Unknown';
        const genres = anime.genres?.join(', ') || 'N/A';
        const startDate = this.formatDate(anime.startDate);
        const endDate = this.formatDate(anime.endDate);
        const description = anime.description || 'No description available';
        const studios = anime.studios?.edges?.map(e => e.node.name).join(', ') || 'Unknown';

        let watchlistHTML = '';
        if (storageManager.isUserLoggedIn()) {
            const isInWatchlist = storageManager.isInWatchlist(anime.id);
            const status = storageManager.getAnimeWatchlistStatus(anime.id);

            if (isInWatchlist) {
                watchlistHTML = `
                    <div class="watchlist-status">
                        <p class="en">Added to your <strong>${status}</strong> list</p>
                        <p class="te" style="display:none;">మీ <strong>${status}</strong> జాబితాకు చేర్చారు</p>
                        <button class="btn btn-secondary" onclick="removeFromWatchlist(${anime.id})">
                            <span class="en">Remove from Watchlist</span>
                            <span class="te" style="display:none;">జాబితా నుండి తీసివేయండి</span>
                        </button>
                    </div>
                `;
            }
        }

        const html = `
            <div class="anime-detail-header">
                <img src="${coverImage}" alt="${title}" class="anime-detail-poster">
                <div class="anime-detail-info">
                    <h2>${title}</h2>
                    <div class="anime-detail-meta">
                        <div class="meta-item">
                            <div class="meta-label"><span class="en">Score</span><span class="te" style="display:none;">స్కోర్</span></div>
                            <div class="meta-value">⭐ ${score}%</div>
                        </div>
                        <div class="meta-item">
                            <div class="meta-label"><span class="en">Episodes</span><span class="te" style="display:none;">ఎపిసోడ్‌లు</span></div>
                            <div class="meta-value">${episodes}</div>
                        </div>
                        <div class="meta-item">
                            <div class="meta-label"><span class="en">Status</span><span class="te" style="display:none;">స్థితి</span></div>
                            <div class="meta-value">${status}</div>
                        </div>
                        <div class="meta-item">
                            <div class="meta-label"><span class="en">Studios</span><span class="te" style="display:none;">స్టూడియోలు</span></div>
                            <div class="meta-value">${studios}</div>
                        </div>
                    </div>

                    <div class="anime-buttons">
                        ${storageManager.isUserLoggedIn() ? `
                            <button class="btn btn-primary" onclick="addToWatchlistFromDetail(${anime.id}, 'towatch')">
                                <span class="en">Add to Watch List</span>
                                <span class="te" style="display:none;">జాబితాకు జోడించండి</span>
                            </button>
                            <button class="btn btn-secondary" onclick="addToWatchlistFromDetail(${anime.id}, 'watching')">
                                <span class="en">Add to Currently Watching</span>
                                <span class="te" style="display:none;">ప్రస్తుతం చూస్తున్న జాబితాకు జోడించండి</span>
                            </button>
                        ` : `
                            <p class="en">Please <a href="index.html">sign in</a> to add to watchlist</p>
                            <p class="te" style="display:none;">జాబితాకు జోడించడానికి <a href="index.html">సైన్ ఇన్ చేయండి</a></p>
                        `}
                    </div>

                    ${watchlistHTML}
                </div>
            </div>

            <div class="anime-detail-meta">
                <div class="meta-item">
                    <div class="meta-label"><span class="en">Start Date</span><span class="te" style="display:none;">ప్రారంభ తేదీ</span></div>
                    <div class="meta-value">${startDate}</div>
                </div>
                <div class="meta-item">
                    <div class="meta-label"><span class="en">End Date</span><span class="te" style="display:none;">ముగింపు తేదీ</span></div>
                    <div class="meta-value">${endDate}</div>
                </div>
                <div class="meta-item">
                    <div class="meta-label"><span class="en">Genres</span><span class="te" style="display:none;">విభాగాలు</span></div>
                    <div class="meta-value">${genres}</div>
                </div>
                <div class="meta-item">
                    <div class="meta-label"><span class="en">Popularity</span><span class="te" style="display:none;">ప్రాచుర్యం</span></div>
                    <div class="meta-value">#${anime.popularity}</div>
                </div>
            </div>

            <div style="clear: both;"></div>

            <h3 class="section-title">
                <span class="en">Synopsis</span>
                <span class="te" style="display:none;">సారాంశం</span>
            </h3>
            <div class="anime-synopsis">${description}</div>

            <div class="video-section">
                <h3><span class="en">Watch Online</span><span class="te" style="display:none;">ఆన్‌లైన్‌లో చూడండి</span></h3>
                <p style="color: var(--text-secondary); margin-bottom: 1rem;">
                    <span class="en">You can watch this anime on various platforms. Search for "${title}" on your preferred streaming service.</span>
                    <span class="te" style="display:none;">మీరు ఈ అనిమే వివిధ ప్ల్యాట్‌ఫారమ్‌లలో చూడవచ్చు. మీకు ఇష్టమైన స్ట్రీమింగ్ సేవలో "${title}" కోసం వెతకండి.</span>
                </p>
                <div class="video-sources">
                    <div class="video-source">
                        <span><span class="en">Popular Streaming Platforms</span><span class="te" style="display:none;">ప్రసిద్ధ స్ట్రీమింగ్ ప్ల్యాట్‌ఫారమ్‌లు</span></span>
                        <a target="_blank" href="https://www.9anime.to/search?keyword=${encodeURIComponent(title)}">9anime</a>
                    </div>
                    <div class="video-source">
                        <span></span>
                        <a target="_blank" href="https://www.crunchyroll.com/search?q=${encodeURIComponent(title)}">Crunchyroll</a>
                    </div>
                    <div class="video-source">
                        <span></span>
                        <a target="_blank" href="https://www.netflix.com/search?q=${encodeURIComponent(title)}">Netflix</a>
                    </div>
                    <div class="video-source">
                        <span></span>
                        <a target="_blank" href="https://www.animeplanet.com/anime/all?name=${encodeURIComponent(title)}">AnimePlanet</a>
                    </div>
                </div>
            </div>
        `;

        return html;
    }
}

// Detail page functions
function addToWatchlistFromDetail(animeId, category) {
    if (!storageManager.isUserLoggedIn()) {
        alert('Please sign in to add anime to watchlist');
        return;
    }

    const success = storageManager.addToWatchlist(animeId, category);
    if (success) {
        alert('Added to watchlist!');
        location.reload();
    } else {
        alert('Already in watchlist');
    }
}

function removeFromWatchlist(animeId) {
    if (confirm('Remove from watchlist?')) {
        storageManager.removeFromWatchlist(animeId);
        alert('Removed from watchlist');
        location.reload();
    }
}
