export interface Movie {
    id: number;
    title: string;
    poster_path: string;
    overview: string;
    release_date: string;
}

export type UserMovieStatus = 'want-to-watch' | 'watching';

export interface UserMovie {
    id: string; // Firestore document ID
    userId: string; // Firebase Auth User UID
    movieId: string; // Movie ID from TMDB
    status: UserMovieStatus;
    title: string;
    posterUrl: string;
}
