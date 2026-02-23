// Watchlist Page Script

let currentCategory = 'watching';

async function initWatchlist() {
    if (!storageManager.isUserLoggedIn()) {
        document.getElementById('watchlistContent').style.display = 'none';
        return;
    }

    setupTabListeners();
    displayWatchlist('watching');
}

function setupTabListeners() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const category = btn.dataset.category;
            displayWatchlist(category);
        });
    });
}

function displayWatchlist(category) {
    currentCategory = category;
    const watchlist = storageManager.getWatchlist(category);
    const container = document.getElementById('watchlistContent');

    if (!watchlist || watchlist.length === 0) {
        container.innerHTML = `
            <p class="en empty-message">Your ${category} list is empty. <a href="browse.html">Start adding anime!</a></p>
            <p class="te empty-message" style="display:none;">మీ ${category} జాబితా ఖాళీగా ఉంది. <a href="browse.html">అనిమే జోడించడం ప్రారంభించండి!</a></p>
        `;
        return;
    }

    const animeCards = watchlist.map(anime => {
        const cardHTML = `
            <div class="anime-card-with-actions" style="position: relative;">
                ${UIManager.createAnimeCard(anime)}
                <div style="padding: 1rem; background-color: #1a1a1a;">
                    <select class="filter-select" style="width: 100%; margin-bottom: 0.5rem;" onchange="changeWatchlistStatus(${anime.id}, this.value)">
                        <option value="watching" ${category === 'watching' ? 'selected' : ''}>
                            <span class="en">Watching</span> / చూస్తున్నా
                        </option>
                        <option value="towatch" ${category === 'towatch' ? 'selected' : ''}>
                            <span class="en">To Watch</span> / చూడటానికి
                        </option>
                        <option value="completed" ${category === 'completed' ? 'selected' : ''}>
                            <span class="en">Completed</span> / పూర్తయిన
                        </option>
                    </select>
                    <button class="btn btn-secondary" style="width: 100%;" onclick="removeFromWatchlistList(${anime.id})">
                        <span class="en">Remove</span>
                        <span class="te" style="display:none;">తీసివేయండి</span>
                    </button>
                </div>
            </div>
        `;
        return cardHTML;
    }).join('');

    container.innerHTML = animeCards;

    // Add click listeners to cards for navigation
    container.querySelectorAll('.anime-card').forEach(card => {
        card.addEventListener('click', () => {
            const animeId = card.dataset.animeId;
            window.location.href = `anime-detail.html?id=${animeId}`;
        });
    });

    languageManager.applyLanguage();
}

function changeWatchlistStatus(animeId, newCategory) {
    storageManager.updateWatchlistStatus(animeId, newCategory);
    displayWatchlist(currentCategory);
    alert('Watchlist updated!');
}

function removeFromWatchlistList(animeId) {
    if (confirm('Remove from watchlist?')) {
        storageManager.removeFromWatchlist(animeId);
        displayWatchlist(currentCategory);
    }
}

document.addEventListener('DOMContentLoaded', initWatchlist);
