"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser, useAuth } from "@/firebase";
import { Button } from "@/components/ui/button";
import { LogOut, Clapperboard } from "lucide-react";
import { signOut } from "firebase/auth";
import { useToast } from "@/hooks/use-toast";
import MovieGrid from "@/components/movies/MovieGrid";
import { getPopularMovies } from "@/lib/movies";
import { Movie } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";

export default function HomePage() {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loadingMovies, setLoadingMovies] = useState(true);

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push("/login");
    }
  }, [user, isUserLoading, router]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoadingMovies(true);
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
        toast({
          title: "Error",
          description: "Failed to load movies. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoadingMovies(false);
      }
    };

    if(user) {
      fetchMovies();
    }
  }, [user, toast]);


  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await signOut(auth);
      router.push("/login");
    } catch (error: any) {
        toast({
            title: "Sign Out Failed",
            description: error.message,
            variant: "destructive",
          });
        setIsSigningOut(false);
    }
  };

  if (isUserLoading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="flex justify-between items-center py-4">
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-10 w-24" />
          </header>
          <main className="mt-8">
            <Skeleton className="h-8 w-1/4 mb-6" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-[250px] w-full" />
                  <Skeleton className="h-6 w-3/4" />
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="flex justify-between items-center py-6">
          <div className="flex items-center space-x-2">
            <Clapperboard className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-white">MovieFlix</h1>
          </div>
          <div className="flex items-center space-x-4">
             <p className="text-sm text-muted-foreground hidden sm:block">
                Welcome, {user.displayName || user.email}
            </p>
            <Button onClick={handleSignOut} variant="ghost" size="sm" disabled={isSigningOut}>
              <LogOut className="mr-2 h-4 w-4" />
              {isSigningOut ? "Signing Out..." : "Sign Out"}
            </Button>
          </div>
        </header>

        <main className="mt-4">
           <MovieGrid movies={movies} isLoading={loadingMovies} />
        </main>
      </div>
    </div>
  );
}
