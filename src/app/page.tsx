"use client";

import Carousel from "@/components/Carousel";
import Hero from "@/components/Hero";
import InfoBlock from "@/components/InfoBlock";

export default function Home() {
  return (
    <div className="flex flex-col gap-20">
      <Hero />
      <Carousel/>
      <InfoBlock/>
    </div>
  );
}
