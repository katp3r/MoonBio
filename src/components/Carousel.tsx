"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import clsx from "clsx";

const users = Array.from({ length: 40 }, () => ({
  name: "shipov",
  desc: "/name",
  avatar: "/avatars/1be890f2f48520fb6b57e0dc5c1c1734.jpg",
}));

export default function Carousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let animationFrameId: number;
    let position = 0;
    const speed = 0.6;

    const smoothScroll = () => {
      if (!pausedRef.current) {
        position += speed;

        if (position >= container.scrollWidth - container.clientWidth) {
          position = 0;
        }

        container.scrollTo({ left: position });
      }

      animationFrameId = requestAnimationFrame(smoothScroll);
    };

    animationFrameId = requestAnimationFrame(smoothScroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="relative w-full overflow-hidden bg-black py-6">
      <div className="pointer-events-none absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-black to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-black to-transparent z-10" />

      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-hidden px-6 py-4"
        style={{ whiteSpace: "nowrap" }}
      >
        {users.map((u, i) => (
          <div key={i} onMouseEnter={() => (pausedRef.current = true)} onMouseLeave={() => (pausedRef.current = false)} className={clsx( "card-theme flex items-center gap-5 rounded-xl px-5 py-3 min-w-[180px] shrink-0", "transition-transform duration-300 ease-out cursor-pointer hover:scale-[1.05]" )}>
            <div className="relative w-12 h-12">
              <Image src={u.avatar} alt={u.name} fill className="rounded-full object-cover"/>
            </div>

            <div className="flex flex-col">
              <p className="text-white font-semibold text-sm">{u.name}</p>
              <p className="text-gray-400 text-xs">{u.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
