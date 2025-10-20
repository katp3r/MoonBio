"use client";

import type { Metadata } from "next";
import { Unbounded } from "next/font/google";
import { useState } from "react";
import "./globals.css";

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin", "cyrillic"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const [openModal, setOpenModal] = useState<null | "policy" | "terms">(null);

  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${unbounded.variable} antialiased`}>
        <div className="min-h-screen bg-grid">
          <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-black/5 dark:border-white/10">
            <div className="mx-auto max-w-7xl px-6 py-3 flex items-center justify-between">
              <a href="/" className="font-semibold tracking-tight text-2xl">MoonBio</a>
              <button className="bg-white rounded-md hover:bg-white/80 transition-colors h-9">
                <a href="/market" className="px-5 py-5 text-black">Магазин</a>
              </button>
            </div>
          </header>

          <main className="mx-auto max-w-5xl px-6 py-10 sm:py-14">{children}</main>

          <footer className="mx-auto max-w-7xl px-6 pb-10 mt-15 text-xs text-center text-white/15 text-foreground/60">
            <p>© {new Date().getFullYear()} MoonBio</p>
            <div className="flex justify-center gap-4 mt-2">
              <button onClick={() => setOpenModal("policy")} className="hover:text-white/50 transition-colors">Политика пользования</button>
              <button onClick={() => setOpenModal("terms")} className="hover:text-white/50 transition-colors">Пользовательское соглашение</button>
            </div>
          </footer>

          {openModal && (
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn" onClick={() => setOpenModal(null)}>
              <div className="bg-neutral-900 rounded-2xl p-6 max-w-lg w-full text-left text-white relative animate-scaleIn" onClick={(e) => e.stopPropagation()}>
                <button onClick={() => setOpenModal(null)} className="absolute top-3 right-3 text-white/50 hover:text-white transition">✕</button>
                <h2 className="text-lg font-semibold mb-3">
                  {openModal === "policy" ? "Политика пользования" : "Пользовательское соглашение"}
                </h2>
                <div className="text-sm text-white/70 space-y-2 max-h-[60vh] overflow-y-auto">
                  {openModal === "policy" ? (
                    <>
                      <p>Используя MoonBio, вы соглашаетесь соблюдать правила платформы, включая запрет на публикацию оскорбительного, вводящего в заблуждение или незаконного контента.</p>
                      <p>Мы оставляем за собой право временно ограничивать доступ к сервису при нарушении этих условий.</p>
                    </>
                  ) : (
                    <>
                      <p>Настоящее соглашение регулирует отношения между пользователем и MoonBio. Продолжая использование, вы подтверждаете, что ознакомлены и принимаете все условия.</p>
                      <p>Мы уважаем конфиденциальность данных и не передаем личную информацию третьим лицам без согласия пользователя.</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <style jsx global>{`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes scaleIn {
            from { transform: scale(0.95); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }
          .animate-fadeIn { animation: fadeIn 0.3s ease forwards; }
          .animate-scaleIn { animation: scaleIn 0.25s ease forwards; }
        `}</style>
      </body>
    </html>
  );
}
