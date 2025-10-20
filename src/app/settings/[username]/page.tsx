"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useRef } from "react";

const fonts = [
  {
    label: 'Unbounded (стандарт)',
    value: 'var(--font-unbounded), system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  { label: 'Без засечек', value: 'Arial, Helvetica, sans-serif' },
  { label: 'С засечками', value: 'Georgia, serif' }
];

export default function Settings() {
  const { user, loading } = useAuth();
  const router = useRouter();
  // Локальные состояния для предпросмотра и отправки
  const [avatarFile, setAvatarFile] = useState<File|null>(null);
  const [bannerFile, setBannerFile] = useState<File|null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string|null>(null);
  const [bannerPreview, setBannerPreview] = useState<string|null>(null);
  const [bio, setBio] = useState(user?.bio || "");
  const [music, setMusic] = useState(user?.music || "");
  const [font, setFont] = useState(fonts[0].value);
  const [icons, setIcons] = useState<string[]>(() => {
    try { return user?.badges ? JSON.parse(user.badges) : []; } catch { return []; }
  });

  const bannerInput = useRef<HTMLInputElement>(null);
  const avatarInput = useRef<HTMLInputElement>(null);
  
  const handleSelectBanner = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBannerFile(file);
      setBannerPreview(URL.createObjectURL(file));
    }
  };
  const handleSelectAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleAddIcon = (icon: string) => {
    if (!icons.includes(icon)) setIcons([...icons, icon]);
  };
  const handleRemoveIcon = (icon: string) => {
    setIcons(icons.filter(i => i !== icon));
  };

  // "Сохранить" (будет готовить данные для загрузки на сервер в реальности)
  const handleSave = async () => {
    if (!user) return;
    let avatarFileName = user.avatar || null;
    if (avatarFile) {
      const fd = new FormData();
      fd.append('avatar', avatarFile);
      try {
        const uploadRes = await fetch('/api/upload-avatar', { method: 'POST', body: fd });
        if (uploadRes.ok) {
          const fileData = await uploadRes.json();
          avatarFileName = fileData.filename;
        } else {
          alert('Ошибка загрузки аватара');
          return;
        }
      } catch (e) {
        alert('Ошибка загрузки аватара');
        return;
      }
    }
    const data: any = {
      bio,
      music,
      badges: JSON.stringify(icons),
      font,
      avatar: avatarFileName || undefined,
    };
    try {
      const res = await fetch('/api/auth/update-profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        router.push(`/profile/${user.username}`);
      } else {
        const err = await res.json();
        alert(err.error || 'Ошибка при обновлении профиля');
      }
    } catch(e) {
      alert('Ошибка сети');
    }
  };

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
    <main className="relative min-h-screen flex flex-col items-center justify-center bg-black text-white font-[var(--font-unbounded)] px-4">
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.06] pointer-events-none" />
      <div className="absolute top-20 text-center select-none">
        <h2 className="text-5xl font-light text-right text-white">Ваша</h2>
        <h1 className="text-9xl font-extrabold leading-none tracking-tight">Страница</h1>
      </div>

      <div className="flex flex-col md:flex-row mt-20 w-full max-w-[950px] h-auto md:h-[600px] rounded-3xl bg-white/10 border border-white/10 backdrop-blur shadow-[0_0_40px_rgba(255,255,255,0.05)] overflow-hidden">
        {/* Settings Panel */}
        <div className="md:w-1/2 w-full px-10 py-10 flex flex-col gap-6 overflow-y-auto">
          <div>
            <h3 className="text-white text-lg mb-2 border-b border-pink-500 pb-1 inline-block">Аватарка</h3>
            <div className="flex gap-4 items-center">
              <button onClick={() => avatarInput.current?.click()} className="rounded-full w-20 h-20 overflow-hidden border border-pink-400 flex items-center justify-center bg-neutral-800 hover:bg-neutral-700">
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Аватарка" className="object-cover w-full h-full" />
                ) : user.avatar ? (
                  <img src={`/avatars/${user.avatar}`} alt="Аватарка" className="object-cover w-full h-full" />
                ) : (
                  <span className="text-4xl">🤖</span>
                )}
              </button>
              <input ref={avatarInput} type="file" accept="image/*" className="hidden" onChange={handleSelectAvatar} />
              {avatarPreview && (
                <button className="text-xs text-red-400 ml-2" onClick={() => { setAvatarFile(null); setAvatarPreview(null); }}>Удалить</button>
              )}
            </div>
          </div>
          <div>
            <h3 className="text-white text-lg mb-2 border-b border-pink-500 pb-1 inline-block">Баннер</h3>
            <button onClick={() => bannerInput.current?.click()} className="block w-full h-24 rounded-lg overflow-hidden border border-pink-400 bg-neutral-800 hover:bg-neutral-700 mb-2">
              {bannerPreview ? (
                <img src={bannerPreview} alt="Баннер" className="object-cover w-full h-full" />
              ) : <span className="text-2xl w-full h-full flex items-center justify-center text-white/30">+ Выбрать баннер</span>}
            </button>
            <input ref={bannerInput} type="file" accept="image/*" className="hidden" onChange={handleSelectBanner} />
            {bannerPreview && (
                <button className="text-xs text-red-400 mt-1" onClick={() => { setBannerFile(null); setBannerPreview(null); }}>Удалить</button>
              )}
          </div>
          <div>
            <h3 className="text-white text-lg mb-2 border-b border-pink-500 pb-1 inline-block">Музыка</h3>
            <input type="text" value={music} onChange={e => setMusic(e.target.value)} placeholder="Введите название" className="w-full px-3 py-2 bg-neutral-900 rounded border border-white/10 text-white mb-2" />
          </div>
          <div>
            <h3 className="text-white text-lg mb-2 border-b border-pink-500 pb-1 inline-block">Описание</h3>
            <textarea value={bio} onChange={e => setBio(e.target.value)} placeholder="Расскажите о себе..." rows={2} className="w-full px-3 py-2 bg-neutral-900 rounded border border-white/10 text-white mb-2 resize-none" />
          </div>
          <div>
            <h3 className="text-white text-lg mb-2 border-b border-pink-500 pb-1 inline-block">Шрифт страницы</h3>
            <select value={font} onChange={e => setFont(e.target.value)} className="w-full px-3 py-2 bg-neutral-900 border border-white/10 rounded text-white">
              {fonts.map(f => <option value={f.value} key={f.value}>{f.label}</option>)}
            </select>
          </div>
          <div>
            <h3 className="text-white text-lg mb-2 border-b border-pink-500 pb-1 inline-block">Иконки/значки</h3>
            <div className="flex gap-2 flex-wrap mb-2">
              {icons.map((icon, i) => (
                <span key={i} onClick={() => handleRemoveIcon(icon)} className="cursor-pointer h-9 w-9 flex items-center justify-center text-2xl rounded-full border border-pink-400 bg-pink-600/10 hover:bg-pink-600/30 transition">{icon}</span>
              ))}
              {icons.length === 0 && <span className="text-white/50 text-sm">Нет значков</span>}
            </div>
            <div className="flex gap-1 flex-wrap">
              {["🎸","🎧","🔥","💡","🦄","🌟","🌈","🚀","✨","🎹","⚡"].map(ic => (
                <button key={ic} type="button" onClick={() => handleAddIcon(ic)} disabled={icons.includes(ic)} className="h-7 w-7 flex items-center justify-center text-lg rounded-full border border-pink-400 bg-white/10 hover:bg-pink-600/30 transition disabled:opacity-40">{ic}</button>
              ))}
            </div>
          </div>
          <button className="text-md text-white/80 hover:text-white bg-pink-600/80 hover:bg-pink-600 transition select-none cursor-pointer mt-4 border border-pink-500/30 rounded-md px-6 py-3 font-semibold tracking-wider" onClick={handleSave}>
            Сохранить изменения
          </button>
        </div>
        {/* Profile Preview */}
        <div className="md:w-1/2 w-full px-10 py-10 flex flex-col items-center justify-center relative" style={{fontFamily: font}}>
          <div className="w-full h-24 rounded-lg overflow-hidden mb-6 relative border border-pink-300">
            {bannerPreview ? <img src={bannerPreview} alt="Баннер" className="object-cover w-full h-full" /> : <div className="w-full h-full bg-neutral-900" /> }
          </div>
          <div className="flex flex-col items-center">
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-pink-300 bg-neutral-900">
              {avatarPreview ? <img src={avatarPreview} alt="Аватарка" className="object-cover w-full h-full" /> : user.avatar ? <img src={`/avatars/${user.avatar}`} alt="Аватарка" className="object-cover w-full h-full" /> : <span className="text-5xl">🤖</span>}
            </div>
            <h2 className="text-3xl font-bold text-white mt-4">{user.name}</h2>
            <p className="text-white/50 text-base">/{user.username}</p>
            {bio && <p className="mt-3 text-white/60 text-center text-md max-w-[90%]">{bio}</p>}
            {music && (<div className="mt-5 w-full">
              <div className="flex justify-between items-center text-xs text-white/50 mb-1">
                <span>{music}</span>
              </div>
              <div className="relative w-full h-[2px] bg-white/15 rounded-full">
                <div className="absolute left-0 top-0 h-full w-[60%] bg-pink-600/40 rounded-full" />
              </div>
            </div>)}
            {icons.length > 0 && (
              <div className="flex gap-2 mt-5 text-lg">
                {icons.map((icon, i) => (
                  <div key={i} className="h-10 w-10 flex justify-center items-center border border-pink-500/20 bg-pink-600/20 rounded-full">
                    <span className="text-xl text-center">{icon}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}