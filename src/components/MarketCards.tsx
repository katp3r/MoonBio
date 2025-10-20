"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const cards = [
  { name: "Инвайт", cost: "200₽", time: "бессрочно", desc: "— Пожизненный доступ к биографии moon\n— Пожизненный доступ к moon imagehost" },
  { name: "Премиум", cost: "500₽", time: "2 месяца", desc: "— Премиальная роль и значок\n— Все шрифты, курсоры и следы курсоров\n— Загружайте файлы размером до 100 МБ\n— Без водяного знака" },
  { name: "Даритель", cost: "1200₽", time: "бессрочно", desc: "— Проявите любовь с помощью эксклюзивных значков для доноров\n— Инвестируйте в наше будущее своим пожертвованием" }
];

export default function MarketCards() {
  return (
    <div className="relative flex flex-col gap-10 z-10 perspective-[1000px]">
      {cards.map((card, i) => (<TiltCard key={i} card={card} />))}
    </div>
  );
}

function TiltCard({ card }: { card: { name: string; cost: string; time: string; desc: string } }) {
  const [style, setStyle] = useState({ transform: "rotateX(0deg) rotateY(0deg)" });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const midX = rect.width / 2;
    const midY = rect.height / 2;
    const rotateX = ((y - midY) / midY) * -10;
    const rotateY = ((x - midX) / midX) * 10;

    setStyle({
      transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`,
      transition: "transform 0.1s ease-out",
      transformStyle: "preserve-3d"
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: "rotateX(0deg) rotateY(0deg) scale(1)",
      transition: "transform 0.5s ease",
      transformStyle: "preserve-3d"
    });
  };

  return (
    <motion.div
      className="market-card h-[328px] w-full border border-white/10 bg-white/20 backdrop-blur-sm rounded-2xl p-5 flex flex-col shadow-2xl shadow-black/30 transition-all duration-500"
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="grid grid-cols-2 gap-2">
        <div className="px-4 py-4">
          <div className="text-3xl text-white">{card.name}</div>
          <p className="pt-20 font-light text-white/40 whitespace-pre-line">{card.desc}</p>
        </div>

        <div className="px-4 py-4">
          <p className="text-right text-white text-7xl">{card.cost}</p>
          <p className="text-right text-white/40 text-xl font-extralight">{card.time}</p>
        </div>
      </div>
    </motion.div>
  );
}
