import axios from 'axios';
import dotenv from 'dotenv';

// Load environment variables
try {
  dotenv.config();
} catch (error) {
  console.error("Error loading .env file:", error);
}

// Fallback to hardcoded key if environment variable is not available
const apiKey = process.env.OMDB_API_KEY || 'f6f3f823';

const OMDB = axios.create({
    baseURL: 'https://www.omdbapi.com/',
    params: { apikey: apiKey },
    timeout: 10000 // Add timeout to prevent hanging requests
});

export const searchmovies = async ({ query, page = 1 }) => {
    try {
        const data = await OMDB.get('/', {
            params: { s: query, page },
        });
        return data;
    } catch (error) {
        console.error("OMDB API search error:", error.message);
        return { data: { Error: "Failed to connect to movie database" } };
    }
};

export const getmovies = async (id) => {
    try {
        const data = await OMDB.get('/', {
            params: { i: id, plot: "full" },
        });
        return data;
    } catch (error) {
        console.error("OMDB API get movie error:", error.message);
        return { data: { Error: "Failed to fetch movie details" } };
    }
};