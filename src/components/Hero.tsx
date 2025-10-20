"use client";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function Hero() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/auth/log');
    router.refresh();
  };

  return (
    <div className="flex flex-col gap-10 items-center justify-center pt-35">

      <div className="flex flex-col items-center justify-center">

        <span className="ln-n z-index-10 text-5xl font-bold text-center">Расширьте своё цифровое присутствие <span className="z-index-2 bg-pink-600 text-white px-2 py-1 ">легко и <br></br>быстро</span></span>

      </div>

      <div className="items-center justify-center">
        <p className="text-center font-light text-white/35 ">Moon — это незаменимая платформа для создания<br></br>современных, настраиваемых биографических<br></br>страниц в сочетании с гибким, быстрым и безопасным<br></br>файловым хостингом, который удовлетворит все<br></br>ваши цифровые потребности.</p>
      </div>

      <div className="flex gap-5">
        {loading ? (
          <div className="text-white/60">Загрузка...</div>
        ) : user ? (
          <>
            <button 
              onClick={() => router.push(`/profile/${user.username}`)}
              className="text-center rounded-md border border-white/15 w-30 h-10"
            >
              Профиль
            </button>
            <button 
              onClick={handleLogout}
              className="text-center rounded-md border border-white/15 w-30 h-10 bg-pink-600"
            >
              Выйти
            </button>
          </>
        ) : (
          <>
            <button className="text-center rounded-md border border-white/15 w-30 h-10">
              <a href="/auth/log" className="px-6 py-6">Вход</a>
            </button>
            <button className="text-center rounded-md border border-white/15 w-30 h-10 bg-pink-600">
              <a href="/auth/reg" className="px-6 py-6">Начать</a>
            </button>
          </>
        )}
      </div>
    
    </div>
  );
}