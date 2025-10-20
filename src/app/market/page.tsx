"use client";

import Carousel from "@/components/Carousel";
import Hero from "@/components/Hero";
import InfoBlock from "@/components/InfoBlock";
import MarketCards from "@/components/MarketCards";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function MarketPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/log');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-white">Загрузка...</div>
      </div>
    );
  }

  if (!user) {
    return null; // Будет перенаправлен
  }

  return (
    <div className="flex flex-col gap-20 pt-35">
        <p className="text-right text-6xl">Лист</p>
        <p className="text-center text-9xl font-bold mt-[-50px]">Прайс</p>
        <div className="flex flex-col gap-20 mt-[-110px]">
            <MarketCards/>
        </div>
    </div>
  );
}
