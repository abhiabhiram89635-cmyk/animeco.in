// Language System - Handles Telugu and English translations

const translations = {
    en: {
        // Navigation
        'home': 'Home',
        'browse': 'Browse',
        'search': 'Search',
        'watchlist': 'My Watchlist',
        'profile': 'Profile',
        'logout': 'Logout',
        'signin': 'Sign In',
        'signup': 'Sign Up',

        // Hero Section
        'welcome': 'Welcome to AnimeWatcher',
        'hero_desc': 'Watch your favorite anime with Telugu language support',
        'start_exploring': 'Start Exploring',

        // Sections
        'featured': 'Featured Anime',
        'popular': 'Popular Anime',
        'all_anime': 'All Anime',
        'my_watchlist': 'My Watchlist',
        'search_anime': 'Search Anime',

        // Status
        'watching': 'Watching',
        'towatch': 'To Watch',
        'completed': 'Completed',

        // Filter
        'filter_anime': 'Filter Anime',
        'genre': 'Genre',
        'status': 'Status',
        'sort_by': 'Sort By',
        'all_genres': 'All Genres',
        'all_status': 'All Status',

        // Anime Actions
        'add_watchlist': 'Add to Watchlist',
        'remove_watchlist': 'Remove from Watchlist',
        'update_status': 'Update Status',
        'marking_watched': 'Mark as Watched',

        // Detail Page
        'episodes': 'Episodes',
        'rating': 'Rating',
        'year': 'Year',
        'status_label': 'Status',
        'episodes_count': 'Episodes',
        'genres': 'Genres',
        'scores': 'Score',
        'synopsis': 'Synopsis',
        'video_sources': 'Video Sources',
        'download_links': 'Download Links',

        // Loading & Messages
        'loading': 'Loading...',
        'no_results': 'No results found. Try searching for a different anime.',
        'empty_watchlist': 'Your watchlist is empty. Start adding anime!',
        'search_placeholder': 'Search anime title...',

        // Auth
        'username': 'Username',
        'password': 'Password',
        'signin_signup': 'Sign In / Sign Up',
        'submit': 'Submit',
        'signed_in': 'Signed In As:',
        'not_signed_in': 'You are not logged in.',

        // Profile
        'user_profile': 'User Profile',
        'total_anime': 'Total Anime',
        'currently_watching': 'Currently Watching',
        'reset_data': 'Reset All Data',

        // Footer
        'copyright': '© 2024 AnimeWatcher. Watch anime in Telugu.',

        // Misc
        'loading_anime': 'Loading anime...',
        'load_more': 'Load More',
    },

    te: {
        // Navigation
        'home': 'హోమ్',
        'browse': 'బ్రౌజ్ చేయండి',
        'search': 'వెతకండి',
        'watchlist': 'నా జాబితా',
        'profile': 'ప్రొఫైల్',
        'logout': 'లాగ్‌అవుట్',
        'signin': 'సైన్ ఇన్ చేయండి',
        'signup': 'సైన్ అప్ చేయండి',

        // Hero Section
        'welcome': 'AnimeWatcher కు స్వాగతం',
        'hero_desc': 'తెలుగు భాష సమర్థన సహ మీకు ఇష్టమైన అనిమే చూడండి',
        'start_exploring': 'అన్వేషణ ప్రారంభించండి',

        // Sections
        'featured': 'ఫీచర్ చేసిన అనిమే',
        'popular': 'ప్రసిద్ధ అనిమే',
        'all_anime': 'అన్ని అనిమే',
        'my_watchlist': 'నా చూపుతెలిసిన జాబితా',
        'search_anime': 'అనిమే వెతకండి',

        // Status
        'watching': 'చూస్తున్నా',
        'towatch': 'చూడటానికి',
        'completed': 'పూర్తయిన',

        // Filter
        'filter_anime': 'అనిమే ఫిల్టర్ చేయండి',
        'genre': 'విభాగం',
        'status': 'స్థితి',
        'sort_by': 'క్రమబద్ధీకరణ',
        'all_genres': 'అన్ని వర్గాలు',
        'all_status': 'అన్ని స్థితీ',

        // Anime Actions
        'add_watchlist': 'జాబితాకు జోడించండి',
        'remove_watchlist': 'జాబితా నుండి తీసివేయండి',
        'update_status': 'స్థితిని నవీకరించండి',
        'marking_watched': 'చదువుకున్నదిగా గుర్తించండి',

        // Detail Page
        'episodes': 'ఎపిసోడ్‌లు',
        'rating': 'రేటింగ్',
        'year': 'సంవత్సరం',
        'status_label': 'స్థితి',
        'episodes_count': 'ఎపిసోడ్‌ల సంఖ్య',
        'genres': 'విభాగాలు',
        'scores': 'స్కోర్',
        'synopsis': 'సారాంశం',
        'video_sources': 'వీడియో వనరులు',
        'download_links': 'డౌన్‌లోడ్ లింకులు',

        // Loading & Messages
        'loading': 'లోడ్ చేస్తున్నా...',
        'no_results': 'ఫలితాలు కనుగొనబడలేదు. వేరే అనిమే కోసం ప్రయత్నించండి.',
        'empty_watchlist': 'మీ జాబితా ఖాళీగా ఉంది. అనిమే జోడించడం ప్రారంభించండి!',
        'search_placeholder': 'అనిమే శీర్షిక వెతకండి...',

        // Auth
        'username': 'ఉపయోగకర్త పేరు',
        'password': 'పాస్‌వర్డ్',
        'signin_signup': 'సైన్ ఇన్ / సైన్ అప్',
        'submit': 'సమర్పించు',
        'signed_in': 'సైన్ ఇన్ చేసారు:',
        'not_signed_in': 'మీరు లాగ్ ఇన్ చేయలేదు.',

        // Profile
        'user_profile': 'ఉపయోగకర్త ప్రొఫైల్',
        'total_anime': 'మొత్తం అనిమే',
        'currently_watching': 'ప్రస్తుతం చూస్తున్నా',
        'reset_data': 'సమస్త డేటా రీసెట్ చేయండి',

        // Footer
        'copyright': '© 2024 AnimeWatcher. తెలుగులో అనిమే చూడండి.',

        // Misc
        'loading_anime': 'అనిమే లోడ్ చేస్తున్నా...',
        'load_more': 'మరిన్ని లోడ్ చేయండి',
    }
};

class LanguageManager {
    constructor() {
        this.currentLanguage = localStorage.getItem('language') || 'en';
        this.applyLanguage();
        this.setupToggle();
    }

    setupToggle() {
        const toggle = document.getElementById('langToggle');
        if (toggle) {
            toggle.addEventListener('click', () => this.toggleLanguage());
        }
    }

    toggleLanguage() {
        this.currentLanguage = this.currentLanguage === 'en' ? 'te' : 'en';
        localStorage.setItem('language', this.currentLanguage);
        this.applyLanguage();
    }

    applyLanguage() {
        // Update visible/hidden classes for language spans
        const enElements = document.querySelectorAll('.en');
        const teElements = document.querySelectorAll('.te');

        if (this.currentLanguage === 'en') {
            enElements.forEach(el => el.style.display = '');
            teElements.forEach(el => el.style.display = 'none');
        } else {
            enElements.forEach(el => el.style.display = 'none');
            teElements.forEach(el => el.style.display = '');
        }

        // Add Noto Sans Telugu font when Telugu is selected
        if (this.currentLanguage === 'te' && !document.querySelector('link[href*="Noto+Sans+Telugu"]')) {
            const link = document.createElement('link');
            link.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans+Telugu:wght@400;600;700&display=swap';
            link.rel = 'stylesheet';
            document.head.appendChild(link);
        }
    }

    get(key) {
        return translations[this.currentLanguage][key] || translations['en'][key] || key;
    }

    getLanguage() {
        return this.currentLanguage;
    }
}

// Initialize language manager
const languageManager = new LanguageManager();
