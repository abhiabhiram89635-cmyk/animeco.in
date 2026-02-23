// API Management - Handles AniList GraphQL API calls

class APIManager {
    constructor() {
        this.baseURL = 'https://graphql.anilist.co';
        this.cache = new Map();
        this.cacheExpiry = 3600000; // 1 hour
    }

    // Helper method to make GraphQL queries
    async query(query, variables = {}) {
        try {
            const response = await fetch(this.baseURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    query: query,
                    variables: variables
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (data.errors) {
                console.error('GraphQL Error:', data.errors);
                throw new Error(data.errors[0].message);
            }

            return data.data;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    // Get featured/trending anime
    async getFeaturedAnime() {
        const cacheKey = 'featured';
        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey);
        }

        const query = `
            query {
                Page(page: 1, perPage: 6) {
                    media(type: ANIME, sort: TRENDING_DESC, status: RELEASING) {
                        id
                        title {
                            english
                            romaji
                        }
                        coverImage {
                            large
                        }
                        description
                        episodes
                        meanScore
                        genres
                    }
                }
            }
        `;

        try {
            const data = await this.query(query);
            this.cache.set(cacheKey, data);
            setTimeout(() => this.cache.delete(cacheKey), this.cacheExpiry);
            return data;
        } catch (error) {
            return null;
        }
    }

    // Get popular anime
    async getPopularAnime(page = 1, perPage = 12) {
        const query = `
            query($page: Int, $perPage: Int) {
                Page(page: $page, perPage: $perPage) {
                    pageInfo {
                        hasNextPage
                        total
                    }
                    media(type: ANIME, sort: POPULARITY_DESC) {
                        id
                        title {
                            english
                            romaji
                        }
                        coverImage {
                            large
                        }
                        description
                        episodes
                        meanScore
                        genres
                        startDate {
                            year
                        }
                    }
                }
            }
        `;

        try {
            return await this.query(query, { page, perPage });
        } catch (error) {
            return null;
        }
    }

    // Search anime
    async searchAnime(searchTerm, page = 1, perPage = 12) {
        const query = `
            query($search: String, $page: Int, $perPage: Int) {
                Page(page: $page, perPage: $perPage) {
                    pageInfo {
                        hasNextPage
                        total
                    }
                    media(type: ANIME, search: $search) {
                        id
                        title {
                            english
                            romaji
                        }
                        coverImage {
                            large
                        }
                        episodes
                        meanScore
                        genres
                        startDate {
                            year
                        }
                    }
                }
            }
        `;

        try {
            return await this.query(query, { search: searchTerm, page, perPage });
        } catch (error) {
            return null;
        }
    }

    // Get anime details
    async getAnimeDetails(animeId) {
        const cacheKey = `anime_${animeId}`;
        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey);
        }

        const query = `
            query($id: Int) {
                Media(id: $id, type: ANIME) {
                    id
                    title {
                        english
                        romaji
                        native
                    }
                    coverImage {
                        extraLarge
                        large
                    }
                    bannerImage
                    description
                    episodes
                    status
                    format
                    genres
                    startDate {
                        year
                        month
                        day
                    }
                    endDate {
                        year
                        month
                        day
                    }
                    meanScore
                    popularity
                    trending
                    nextAiringEpisode {
                        airingAt
                        timeUntilAiring
                        episode
                    }
                    studios {
                        edges {
                            node {
                                name
                            }
                        }
                    }
                    relations {
                        edges {
                            node {
                                id
                                title {
                                    english
                                    romaji
                                }
                            }
                            relationType
                        }
                    }
                }
            }
        `;

        try {
            const data = await this.query(query, { id: animeId });
            this.cache.set(cacheKey, data);
            setTimeout(() => this.cache.delete(cacheKey), this.cacheExpiry);
            return data;
        } catch (error) {
            return null;
        }
    }

    // Get anime by genre
    async getAnimeByGenre(genre, page = 1, perPage = 12) {
        const query = `
            query($page: Int, $perPage: Int, $genre: String) {
                Page(page: $page, perPage: $perPage) {
                    pageInfo {
                        hasNextPage
                        total
                    }
                    media(type: ANIME, genre: $genre, sort: POPULARITY_DESC) {
                        id
                        title {
                            english
                            romaji
                        }
                        coverImage {
                            large
                        }
                        episodes
                        meanScore
                        genres
                        startDate {
                            year
                        }
                    }
                }
            }
        `;

        try {
            return await this.query(query, { page, perPage, genre });
        } catch (error) {
            return null;
        }
    }

    // Get anime by status
    async getAnimeByStatus(status, page = 1, perPage = 12) {
        const query = `
            query($page: Int, $perPage: Int, $status: MediaStatus) {
                Page(page: $page, perPage: $perPage) {
                    pageInfo {
                        hasNextPage
                        total
                    }
                    media(type: ANIME, status: $status, sort: POPULARITY_DESC) {
                        id
                        title {
                            english
                            romaji
                        }
                        coverImage {
                            large
                        }
                        episodes
                        meanScore
                        genres
                        startDate {
                            year
                        }
                    }
                }
            }
        `;

        try {
            return await this.query(query, { page, perPage, status });
        } catch (error) {
            return null;
        }
    }

    // Get trending anime
    async getTrendingAnime(page = 1, perPage = 12) {
        const query = `
            query($page: Int, $perPage: Int) {
                Page(page: $page, perPage: $perPage) {
                    pageInfo {
                        hasNextPage
                        total
                    }
                    media(type: ANIME, sort: TRENDING_DESC) {
                        id
                        title {
                            english
                            romaji
                        }
                        coverImage {
                            large
                        }
                        episodes
                        meanScore
                        genres
                        trending
                        startDate {
                            year
                        }
                    }
                }
            }
        `;

        try {
            return await this.query(query, { page, perPage });
        } catch (error) {
            return null;
        }
    }

    // Helper to get title (English or Romaji)
    getTitle(titleObj) {
        return titleObj?.english || titleObj?.romaji || 'Unknown';
    }

    // Clear cache
    clearCache() {
        this.cache.clear();
    }
}

// Initialize API manager
const apiManager = new APIManager();
