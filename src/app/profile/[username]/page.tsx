"use client";

import Profile from "@/components/Profile";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/log');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-white">Загрузка...</div>
      </main>
    );
  }

  if (!user) {
    return null; // Будет перенаправлен
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <Profile />
    </main>
  );
}