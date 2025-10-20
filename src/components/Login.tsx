"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push("/");
        router.refresh();
      } else {
        setError(data.error || "Ошибка авторизации");
      }
    } catch (err) {
      setError("Ошибка соединения с сервером");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-grid px-6">
      <div className="card-theme w-full max-w-sm p-8 rounded-2xl shadow-lg border border-white/10 backdrop-blur-md">
        <h1 className="text-2xl font-semibold text-white text-center mb-6">
          Вход в MoonBio
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="bg-red-500/20 border border-red-500/30 text-red-400 px-4 py-2 rounded-md text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm text-white/70 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Введите email"
              className="w-full rounded-md bg-neutral-900 border border-white/10 text-white px-4 py-2 focus:outline-none focus:border-white/30 transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-white/70 mb-2">Пароль</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Введите пароль"
              className="w-full rounded-md bg-neutral-900 border border-white/10 text-white px-4 py-2 focus:outline-none focus:border-white/30 transition-colors"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black rounded-md py-2 font-semibold hover:bg-white/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Вход..." : "Войти"}
          </button>
        </form>
        <div className="flex gap-5 justify-center">

            <a href="" className="text-center text-sm text-white/40 mt-5 hover:text-white/60 transition-colors cursor-pointer">
                Забыли пароль?
            </a>
            <a href="/auth/reg" className="text-right text-sm text-white/40 mt-5 hover:text-white/60 transition-colors cursor-pointer">
            Нет аккаунта
            </a>

        </div>
        
      </div>
    </div>
  );
}
