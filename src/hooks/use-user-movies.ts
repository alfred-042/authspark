"use client";

import { useMemo } from 'react';
import { collection, doc, deleteDoc, setDoc } from 'firebase/firestore';
import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import type { UserMovie, UserMovieStatus } from '@/lib/types';
import { useToast } from './use-toast';
import { FirestorePermissionError } from '@/firebase/errors';
import { errorEmitter } from '@/firebase/error-emitter';

export function useUserMovies() {
  const { user } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();

  const userMoviesColRef = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return collection(firestore, `users/${user.uid}/userMovies`);
  }, [firestore, user]);


  const { data: userMovies, isLoading, error } = useCollection<UserMovie>(userMoviesColRef);

  const addUserMovie = async (movieData: Omit<UserMovie, 'id' | 'userId'>) => {
    if (!user || !firestore) {
        toast({ title: 'Error', description: 'You must be logged in.', variant: 'destructive' });
        return;
    }

    const movieRef = doc(firestore, `users/${user.uid}/userMovies`, movieData.movieId);

    setDoc(movieRef, movieData, { merge: true })
        .catch(error => {
            const contextualError = new FirestorePermissionError({
                operation: 'write',
                path: movieRef.path,
                requestResourceData: movieData,
            });
            errorEmitter.emit('permission-error', contextualError);
            toast({
                title: 'Error Saving Movie',
                description: 'Could not save your movie preference.',
                variant: 'destructive',
            });
    });
  };

  const removeUserMovie = async (movieId: string) => {
    if (!user || !firestore) {
        toast({ title: 'Error', description: 'You must be logged in.', variant: 'destructive' });
        return;
    }
    const movieRef = doc(firestore, `users/${user.uid}/userMovies`, movieId);

    deleteDoc(movieRef).catch(error => {
        const contextualError = new FirestorePermissionError({
            operation: 'delete',
            path: movieRef.path,
        });
        errorEmitter.emit('permission-error', contextualError);
        toast({
            title: 'Error Removing Movie',
            description: 'Could not remove your movie preference.',
            variant: 'destructive',
        });
    });
  };

  return {
    userMovies,
    isLoading,
    error,
    addUserMovie,
    removeUserMovie,
  };
}
