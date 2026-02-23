// Episodes Management - Handles video streaming and episode selection

class EpisodesManager {
    constructor() {
        this.currentAnimeTitle = '';
        this.currentEpisode = 1;
        this.currentLanguage = 'english'; // Default language

        this.languages = [
            { code: 'english', name: 'English', icon: '🇺🇸', label: 'English' },
            { code: 'hindi', name: 'Hindi', icon: '🇮🇳', label: 'हिंदी' },
            { code: 'telugu', name: 'Telugu', icon: '🇮🇳', label: 'తెలుగు' },
            { code: 'tamil', name: 'Tamil', icon: '🇮🇳', label: 'தமிழ்' },
            { code: 'kannada', name: 'Kannada', icon: '🇮🇳', label: 'ಕನ್ನಡ' },
            { code: 'marathi', name: 'Marathi', icon: '🇮🇳', label: 'मराठी' },
            { code: 'malayalam', name: 'Malayalam', icon: '🇮🇳', label: 'മലയാളം' },
            { code: 'bengali', name: 'Bengali', icon: '🇮🇳', label: 'বাংলা' },
            { code: 'japanese', name: 'Japanese', icon: '🇯🇵', label: '日本語' },
            { code: 'spanish', name: 'Spanish', icon: '🇪🇸', label: 'Español' },
            { code: 'french', name: 'French', icon: '🇫🇷', label: 'Français' },
            { code: 'german', name: 'German', icon: '🇩🇪', label: 'Deutsch' }
        ];

        this.streamingSites = [
            // Piracy Sites (Fast/Direct)
            {
                name: '9Anime',
                baseUrl: 'https://www.9anime.to',
                icon: '🎬'
            },
            {
                name: 'AnimeSalt',
                baseUrl: 'https://www.animesalt.top',
                icon: '🌟'
            },
            {
                name: 'AnimeRulz',
                baseUrl: 'https://www.animerulz.com',
                icon: '👑'
            },
            {
                name: 'ZoroAnime',
                baseUrl: 'https://zoro.to',
                icon: '🔥'
            },
            // Legal FREE Sites
            {
                name: 'AnimePlanet',
                baseUrl: 'https://www.animeplanet.com',
                icon: '🌍'
            },
            {
                name: 'HIDIVE',
                baseUrl: 'https://www.hidive.com',
                icon: '📺'
            },
            {
                name: 'Crunchyroll',
                baseUrl: 'https://www.crunchyroll.com',
                icon: '🎥'
            },
            {
                name: 'Netflix',
                baseUrl: 'https://www.netflix.com',
                icon: '🎭'
            }
        ];
    }

    // Initialize the watch now feature
    initWatchNow(animeId, animeTitle, totalEpisodes) {
        this.currentAnimeTitle = animeTitle;
        this.setupWatchNowButton(animeId, animeTitle, totalEpisodes);
    }

    // Setup watch now button in detail page
    setupWatchNowButton(animeId, animeTitle, totalEpisodes) {
        // Get the buttons container
        const detailInfo = document.querySelector('.anime-detail-info');
        if (detailInfo) {
            // Find the anime-buttons div
            const buttonsDiv = detailInfo.querySelector('.anime-buttons');
            if (buttonsDiv) {
                // Add watch now button
                const watchNowBtn = document.createElement('button');
                watchNowBtn.className = 'btn btn-primary';
                watchNowBtn.style.cssText = 'background-color: #4ecdc4; padding: 1rem 2rem; font-size: 1.1rem;';
                watchNowBtn.innerHTML = `
                    <span class="en">🎬 Watch Now</span>
                    <span class="te" style="display:none;">🎬 ఇప్పుడు చూడండి</span>
                `;
                watchNowBtn.onclick = () => this.openWatchNow(animeId, animeTitle, totalEpisodes);
                buttonsDiv.insertBefore(watchNowBtn, buttonsDiv.firstChild);
            }
        }
    }

    // Open watch now modal
    openWatchNow(animeId, animeTitle, totalEpisodes) {
        const videoSection = document.getElementById('videoPlayerSection');
        if (!videoSection) return;

        videoSection.style.display = 'block';
        this.displayLanguageSelector();
        this.displayEpisodes(animeTitle, totalEpisodes || 12);
        this.loadEpisode(animeTitle, 1);
        window.scrollTo(0, videoSection.offsetTop - 100);
    }

    // Display language selector
    displayLanguageSelector() {
        const seasonTabs = document.getElementById('seasonTabs');
        if (!seasonTabs) return;

        let languageHTML = '<div class="language-selector">';
        languageHTML += '<h4 style="color: #4ecdc4; margin-bottom: 1rem;"><span class="en">Select Language / భాష ఎంచుకోండి</span></h4>';
        languageHTML += '<div class="language-buttons">';

        this.languages.forEach(lang => {
            const isActive = lang.code === this.currentLanguage ? 'active' : '';
            languageHTML += `
                <button class="language-btn ${isActive}" onclick="episodesManager.setLanguage('${lang.code}')">
                    <span class="lang-icon">${lang.icon}</span>
                    <span class="lang-label">${lang.label}</span>
                </button>
            `;
        });

        languageHTML += '</div></div>';
        seasonTabs.innerHTML = languageHTML;
    }

    // Set selected language
    setLanguage(langCode) {
        this.currentLanguage = langCode;

        // Update active button
        document.querySelectorAll('.language-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.closest('.language-btn').classList.add('active');
    }

    // Display episodes list and seasons
    displayEpisodes(animeTitle, totalEpisodes) {
        const episodesList = document.getElementById('episodesList');
        if (!episodesList) return;

        let episodesHTML = '<div class="episodes-container">';

        for (let i = 1; i <= Math.min(totalEpisodes, 100); i++) {
            episodesHTML += `
                <button class="episode-btn ${i === 1 ? 'active' : ''}" onclick="episodesManager.loadEpisode('${animeTitle}', ${i})">
                    <span class="en">EP ${i}</span>
                    <span class="te" style="display:none;">ఎపి ${i}</span>
                </button>
            `;
        }

        episodesHTML += '</div>';
        episodesList.innerHTML = episodesHTML;
    }

    // Load episode
    loadEpisode(animeTitle, episodeNumber) {
        this.currentEpisode = episodeNumber;

        // Update active episode button
        document.querySelectorAll('.episode-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.classList.add('active');

        // Show streaming sites options
        this.showStreamingSites(animeTitle, episodeNumber);
    }

    // Show available streaming sites
    showStreamingSites(animeTitle, episodeNumber) {
        const videoPlayer = document.getElementById('videoPlayer');
        if (!videoPlayer) return;

        const langDetail = this.languages.find(l => l.code === this.currentLanguage);
        const langName = langDetail ? langDetail.name : 'English';

        let html = `
            <div class="streaming-sites-container">
                <div style="margin-bottom: 1rem;">
                    <h3 style="color: #4ecdc4; margin-bottom: 1rem;">
                        <span class="en">Watch Episode ${episodeNumber} in ${langName}</span>
                        <span class="te" style="display:none;">ఎపిసోడ్ ${episodeNumber} ను ${langName} లో చూడండి</span>
                    </h3>
                    <p style="color: #b0b0b0; margin-bottom: 1rem;">
                        <span class="en">Click to watch on your preferred platform:</span>
                        <span class="te" style="display:none;">ఎంచుకున్న ప్ల్యాట్‌ఫారమ్‌లో చూడటానికి క్లిక్ చేయండి:</span>
                    </p>
                </div>
                <div class="streaming-buttons">
        `;

        this.streamingSites.forEach(site => {
            let searchUrl = '';

            // Build URLs based on site with language preference
            if (site.name === '9Anime') {
                searchUrl = `${site.baseUrl}/search?keyword=${encodeURIComponent(animeTitle)} ${langName}`;
            } else if (site.name === 'AnimeSalt') {
                searchUrl = `${site.baseUrl}/search?query=${encodeURIComponent(animeTitle)} ${langName}`;
            } else if (site.name === 'AnimeRulz') {
                searchUrl = `${site.baseUrl}/?s=${encodeURIComponent(animeTitle)} ${langName}`;
            } else if (site.name === 'ZoroAnime') {
                searchUrl = `${site.baseUrl}/search?keyword=${encodeURIComponent(animeTitle)} ${langName}`;
            } else if (site.name === 'AnimePlanet') {
                searchUrl = `${site.baseUrl}/anime/search?name=${encodeURIComponent(animeTitle)}`;
            } else if (site.name === 'HIDIVE') {
                searchUrl = `${site.baseUrl}/search/${encodeURIComponent(animeTitle)}`;
            } else if (site.name === 'Crunchyroll') {
                searchUrl = `${site.baseUrl}/search?q=${encodeURIComponent(animeTitle)}`;
            } else if (site.name === 'Netflix') {
                searchUrl = `${site.baseUrl}/search?q=${encodeURIComponent(animeTitle)}`;
            }

            html += `
                <a href="${searchUrl}" target="_blank" class="streaming-link">
                    <span class="site-icon">${site.icon}</span>
                    <span class="site-name">${site.name}</span>
                </a>
            `;
        });

        html += '</div></div>';

        videoPlayer.outerHTML = html;
        languageManager.applyLanguage();
    }
}

// Initialize episodes manager
const episodesManager = new EpisodesManager();
