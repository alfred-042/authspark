import type { Movie } from './types';

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY || "YOUR_TMDB_API_KEY";
const API_URL = 'https://api.themoviedb.org/3';

// Create a .env.local file in your root directory and add:
// NEXT_PUBLIC_TMDB_API_KEY=your_actual_api_key

if (API_KEY === "YOUR_TMDB_API_KEY") {
    console.warn("Warning: TMDB API key is not set. Please create a .env.local file with NEXT_PUBLIC_TMDB_API_KEY.");
}


export async function getPopularMovies(): Promise<Movie[]> {
  try {
    const response = await fetch(`${API_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Could not fetch popular movies:", error);
    return [];
  }
}
