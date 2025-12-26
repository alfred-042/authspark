"use client";

import { Movie } from "@/lib/types";
import MovieCard from "./MovieCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useUserMovies } from "@/hooks/use-user-movies";
import { Film } from "lucide-react";

interface MovieGridProps {
  movies: Movie[];
  isLoading: boolean;
}

export default function MovieGrid({ movies, isLoading }: MovieGridProps) {
  const { userMovies, isLoading: isLoadingUserMovies } = useUserMovies();

  if (isLoading || isLoadingUserMovies) {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-6 text-white">Popular Movies</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {[...Array(20)].map((_, i) => (
                <div key={i} className="space-y-2">
                <Skeleton className="h-[250px] sm:h-[300px] w-full rounded-lg" />
                <Skeleton className="h-6 w-3/4" />
                </div>
            ))}
            </div>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center text-muted-foreground py-20">
        <Film className="w-16 h-16 mb-4" />
        <h2 className="text-2xl font-bold">No movies found</h2>
        <p>Try searching for something else.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-white">Popular Movies</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies.map((movie) => {
            const userMovie = userMovies?.find(um => um.movieId === movie.id.toString());
            return <MovieCard key={movie.id} movie={movie} userMovie={userMovie} />;
        })}
      </div>
    </div>
  );
}
