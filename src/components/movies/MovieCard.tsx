"use client";

import Image from "next/image";
import { useState } from "react";
import { Movie, UserMovie, UserMovieStatus } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Eye, Bookmark, Check } from "lucide-react";
import { useUserMovies } from "@/hooks/use-user-movies";

interface MovieCardProps {
  movie: Movie;
  userMovie: UserMovie | undefined;
}

export default function MovieCard({ movie, userMovie }: MovieCardProps) {
  const { addUserMovie, removeUserMovie } = useUserMovies();
  const [currentStatus, setCurrentStatus] = useState(userMovie?.status);

  const handleStatusChange = (status: UserMovieStatus) => {
    if (currentStatus === status) {
      // If the user clicks the same button again, remove the status
      removeUserMovie(movie.id.toString());
      setCurrentStatus(undefined);
    } else {
      // Otherwise, set the new status
      const newUserMovie: Omit<UserMovie, 'id' | 'userId'> = {
        movieId: movie.id.toString(),
        status: status,
        title: movie.title,
        posterUrl: movie.poster_path,
      };
      addUserMovie(newUserMovie);
      setCurrentStatus(status);
    }
  };

  return (
    <div className="group relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:scale-105">
      <Image
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        width={500}
        height={750}
        className="object-cover w-full h-full"
      />
      <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        <h3 className="text-lg font-bold text-white mb-2">{movie.title}</h3>
        <div className="flex space-x-2">
          <Button
            size="sm"
            variant={currentStatus === "watching" ? "default" : "secondary"}
            onClick={() => handleStatusChange("watching")}
            className="flex-1"
          >
            {currentStatus === "watching" ? <Check className="mr-2 h-4 w-4" /> : <Eye className="mr-2 h-4 w-4" />}
            Watching
          </Button>
          <Button
            size="sm"
            variant={currentStatus === "want-to-watch" ? "default" : "secondary"}
            onClick={() => handleStatusChange("want-to-watch")}
            className="flex-1"
          >
             {currentStatus === "want-to-watch" ? <Check className="mr-2 h-4 w-4" /> : <Bookmark className="mr-2 h-4 w-4" />}
            Want to Watch
          </Button>
        </div>
      </div>
    </div>
  );
}
