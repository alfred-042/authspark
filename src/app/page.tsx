"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";
import { LogOut } from "lucide-react";

export default function HomePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [isSigningOut, setIsSigningOut] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

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

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-10 w-32 mt-4" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8 animate-fade-in">
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold font-headline">Welcome to <span className="text-primary">AuthSpark</span></h1>
        <p className="mt-4 text-lg text-muted-foreground">
          You are logged in as {user.displayName || user.email}.
        </p>
        <Button onClick={handleSignOut} className="mt-8" disabled={isSigningOut}>
          <LogOut className="mr-2 h-4 w-4" />
          {isSigningOut ? "Signing Out..." : "Sign Out"}
        </Button>
      </div>
    </div>
  );
}
