"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

const cards = [
  { name: "— Разметка", desc: "Улучшите описание с помощью разметки. Используйте наш простой в применении синтаксис для создания красиво оформленного контента.", avatar: "✍️" },
  { name: "— Цвета, шрифты и курсоры", desc: "Выберите акцентные цвета, шрифты и курсоры, чтобы придать странице индивидуальный вид. Сделайте её визуально привлекательной!!", avatar: "🎨" },
  { name: "— Аватары, баннеры и фоны", desc: "Персонализируйте свою страницу с помощью пользовательских аватарок, баннеров и фонов.", avatar: "🖼️" },
  { name: "— Музыка", desc: "Делитесь своими любимыми мелодиями или оригинальными композициями без лишних усилий. Оживи свою страницу с помощью волшебной музыки!", avatar: "🎹" },
  { name: "— Социальные платформы", desc: "Позвольте посетителям Вашей страницы исследовать Ваш разнообразный цифровой контент в одном месте. Объедините свою цифровую идентичность!", avatar: "🔗" },
  { name: "— Интеграция с Discord", desc: "Поделитесь своим Discord. Пусть люди видят Вас настоящим как в работе, так и в цифровой жизни.", avatar: "✈️" }
];

export default function InfoBlock() {
  const ref = useRef(null);
  const controls = useAnimation();
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView, controls]);

  const highlight = {
    hidden: { backgroundSize: "0% 100%" },
    visible: (i: number) => ({
      backgroundSize: "100% 100%",
      transition: {
        delay: i * 0.6,
        duration: 0.8,
        ease: "easeInOut"
      }
    })
  };

  return (
    <div ref={ref} className="flex flex-col gap-10">
      {/* Заголовок */}
      <div>
        <p className="text-2xl font-semibold text-left text-white">
          Просто и интуитивно понятно
        </p>

        <p className="mt-3 text-sm leading-relaxed text-left text-white/70 max-w-xl">
          Наш{" "}
          <motion.span custom={0} initial="hidden" animate={controls} variants={highlight} className="bg-gradient-to-r from-pink-600 to-pink-600 bg-[length:0%_100%] bg-no-repeat bg-left-bottom px-1 transition-all duration-700">
            удобный
          </motion.span>{" "} интерфейс позволяет{" "}
          <motion.span custom={1} initial="hidden" animate={controls} variants={highlight} className="bg-gradient-to-r from-pink-600 to-pink-600 bg-[length:0%_100%] bg-no-repeat bg-left-bottom px-1 transition-all duration-700">
            любому
          </motion.span>{" "} пользователю, независимо от уровня технических знаний,{" "}
          <motion.span custom={2} initial="hidden" animate={controls} variants={highlight} className="bg-gradient-to-r from-pink-600 to-pink-600 bg-[length:0%_100%] bg-no-repeat bg-left-bottom px-1 transition-all duration-700">
            легко
          </motion.span>{" "}создавать и настраивать свои биографические страницы.{" "}
          <br /> Продемонстрируйте свои{" "}
          <motion.span custom={3} initial="hidden" animate={controls} variants={highlight} className="bg-gradient-to-r from-pink-600 to-pink-600 bg-[length:0%_100%] bg-no-repeat bg-left-bottom px-1 transition-all duration-700">
            творческие
          </motion.span>{" "} способности, опыт и интересы за{" "}
          <motion.span custom={4} initial="hidden" animate={controls} variants={highlight} className="bg-gradient-to-r from-pink-600 to-pink-600 bg-[length:0%_100%] bg-no-repeat bg-left-bottom px-1 transition-all duration-700">
            считанные минуты
          </motion.span>
          .
        </p>
      </div>

      {/* Карточки */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 gap-7">
        {cards.map((card, i) => (
          <div
            key={i}
            className="infob-theme flex flex-col h-[255px] p-5 border border-white/10 bg-white/10 backdrop-blur-md rounded-2xl transition-transform duration-300 hover:scale-[1.05]"
          >
            <div className="flex items-center justify-center w-12 h-12 mb-2 text-2xl bg-pink-600 border border-pink-500 rounded-lg">
              {card.avatar}
            </div>
            <h3 className="text-left font-semibold">{card.name}</h3>
            <p className="w-[273px] mt-1 text-xs font-light leading-snug text-white/60">
              {card.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
