"use client";

import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  const handleEdit = (field: string, currentValue: string) => {
    setEditingField(field);
    setEditValue(currentValue);
  };

  const handleSave = async () => {
    if (!user || !editingField) return;
    
    setSaving(true);
    try {
      const response = await fetch('/api/auth/update-profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          field: editingField,
          value: editValue,
        }),
      });

      if (response.ok) {
        // Обновляем данные пользователя
        window.location.reload();
      } else {
        alert('Ошибка при сохранении');
      }
    } catch (error) {
      alert('Ошибка при сохранении');
    } finally {
      setSaving(false);
      setEditingField(null);
    }
  };

  const handleCancel = () => {
    setEditingField(null);
    setEditValue("");
  };

  if (loading) {
    return (
      <main className="relative min-h-screen flex flex-col items-center justify-center bg-black text-white font-[var(--font-unbounded)] px-4">
        <div className="text-white">Загрузка профиля...</div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="relative min-h-screen flex flex-col items-center justify-center bg-black text-white font-[var(--font-unbounded)] px-4">
        <div className="text-white">Пользователь не найден</div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center bg-black text-white font-[var(--font-unbounded)] px-4">
      {/* ===== Background Grid ===== */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.06] pointer-events-none" />

      {/* ===== Title ===== */}
      <div className="absolute top-20 text-center select-none">
        <h2 className="text-5xl font-light  text-right text-white">Ваш</h2>
        <h1 className="text-9xl font-extrabold leading-none tracking-tight">Профиль</h1>
      </div>

      {/* ===== Profile Card ===== */}
      <div className=" flex flex-col md:flex-row mt-20 w-full max-w-[950px] h-auto md:h-[550px] rounded-3xl bg-white/10 border border-white/10 backdrop-blur shadow-[0_0_40px_rgba(255,255,255,0.05)] overflow-hidden">
        {/* Light glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-44 h-10 bg-white/15 blur-2xl rounded-full" />

        {/* Left side */}
        <div className="md:w-1/2 w-full px-10 py-10 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-5">
              <div className="relative w-20 h-20 rounded-full overflow-hidden bg-neutral-700 flex items-center justify-center">
                {user.avatar ? (
                  <Image src={`/avatars/${user.avatar}`} alt="avatar" fill className="object-cover" />
                ) : (
                  // SVG-заглушка, либо иконка
                  <svg width="50" height="50" viewBox="0 0 24 24" fill="none" className="text-white/30" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="8" r="4" fill="currentColor"/>
                    <rect x="4" y="16" width="16" height="4" rx="2" fill="currentColor"/>
                  </svg>
                )}
              </div>
              <div>
                <h2 className="text-2xl font-bold leading-tight">{user.name}</h2>
                <p className="text-white/50 text-sm leading-tight">/{user.username}</p>
              </div>
            </div>

            {/* Description block: только если есть user.bio */}
            {user.bio && (
              <p className="mt-6 text-white/50 text-sm max-w-[90%]">
                {user.bio}
              </p>
            )}

            {/* Music block: только если есть user.music */}
            {user.music && (
              <div className="mt-6">
                <div className="flex justify-between items-center text-xs text-white/50 mb-1">
                  <span>{user.music}</span>
                  {/* Здесь можно вывести длительность, если она есть, или оставить пустым */}
                </div>
                <div className="relative w-full h-[2px] bg-white/15 rounded-full">
                  {/* Здесь progress bar под музыку, если появится real-time data */}
                  <div className="absolute left-0 top-0 h-full w-[50%] bg-pink-600/40 rounded-full" />
                </div>
                {/* также убрать статичные тайминги */}
              </div>
            )}

            {/* Badges row: только если есть user.badges и они не пусты */}
            {(() => {
              let badges: string[] = [];
              try {
                badges = user.badges ? JSON.parse(user.badges) : [];
              } catch { badges = [] }
              if (!badges || badges.length === 0) return null;
              return (
                <div className="flex gap-2 mt-6 text-lg">
                  {badges.map((badge, i) => (
                    <div key={i} className="h-11 w-11 flex justify-center items-center border border-pink-500/20 bg-pink-600/20 rounded-full">
                      <span className="text-xl text-center">{badge}</span>
                    </div>
                  ))}
                </div>
              );
            })()}
          </div>

          <button
            className="text-sm text-white/40 hover:text-white/70 transition select-none cursor-pointer mt-8 bg-pink-600/20 border border-pink-500/20 rounded-md px-4 py-2"
            onClick={() => router.push(`/settings/${user.username}`)}
          >
            Редактировать страницу
          </button>
        </div>

        {/* Divider line */}
        <div className="hidden md:block absolute left-1/2 top-0 h-full w-px bg-white/10" />

        {/* Right side */}
        <div className="md:w-1/2 w-full px-10 py-10 flex flex-col justify-top items-end space-y-6 text-right">
          <ProfileField 
            label="Почта" 
            value={user.email} 
            field="email"
            editingField={editingField}
            editValue={editValue}
            setEditValue={setEditValue}
            onEdit={handleEdit}
            onSave={handleSave}
            onCancel={handleCancel}
            saving={saving}
            editable={true}
          />
          <ProfileField 
            label="Пароль" 
            value="************" 
            field="password"
            editingField={editingField}
            editValue={editValue}
            setEditValue={setEditValue}
            onEdit={handleEdit}
            onSave={handleSave}
            onCancel={handleCancel}
            saving={saving}
            editable={true}
          />
          <ProfileField 
            label="Имя" 
            value={user.name} 
            field="name"
            editingField={editingField}
            editValue={editValue}
            setEditValue={setEditValue}
            onEdit={handleEdit}
            onSave={handleSave}
            onCancel={handleCancel}
            saving={saving}
            editable={true}
          />
          <ProfileField 
            label="Username" 
            value={user.username} 
            field="username"
            editingField={editingField}
            editValue={editValue}
            setEditValue={setEditValue}
            onEdit={handleEdit}
            onSave={handleSave}
            onCancel={handleCancel}
            saving={saving}
            editable={true}
          />
          <ProfileField 
            label="Короткая ссылка" 
            value={`/${user.username}`} 
            field=""
            editingField={editingField}
            editValue={editValue}
            setEditValue={setEditValue}
            onEdit={handleEdit}
            onSave={handleSave}
            onCancel={handleCancel}
            saving={saving}
            editable={false}
          />
          <ProfileField 
            label="Дата регистрации" 
            value={new Date(user.createdAt).toLocaleDateString('ru-RU')} 
            field=""
            editingField={editingField}
            editValue={editValue}
            setEditValue={setEditValue}
            onEdit={handleEdit}
            onSave={handleSave}
            onCancel={handleCancel}
            saving={saving}
            editable={false}
          />
        </div>
      </div>
    </main>
  );
}

/* ===== Component for right fields ===== */
interface ProfileFieldProps {
  label: string;
  value: string;
  field: string;
  editingField: string | null;
  editValue: string;
  setEditValue: (value: string) => void;
  onEdit: (field: string, value: string) => void;
  onSave: () => void;
  onCancel: () => void;
  saving: boolean;
  editable: boolean;
}

function ProfileField({ 
  label, 
  value, 
  field, 
  editingField, 
  editValue, 
  setEditValue, 
  onEdit, 
  onSave, 
  onCancel, 
  saving,
  editable 
}: ProfileFieldProps) {
  const isEditing = editingField === field;

  if (isEditing) {
    return (
      <div className="w-full flex flex-col items-end space-y-2">
        <div className="text-sm text-white/80">
          {label}:
        </div>
        <input
          type={field === 'password' ? 'password' : field === 'email' ? 'email' : 'text'}
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          className="bg-neutral-900 border border-white/10 text-white px-3 py-1 rounded text-sm w-full max-w-[200px]"
          placeholder={`Введите ${label.toLowerCase()}`}
        />
        <div className="flex gap-2">
          <button
            onClick={onSave}
            disabled={saving}
            className="text-[12px] text-green-400 hover:text-green-300 transition disabled:opacity-50"
          >
            {saving ? 'сохранение...' : 'сохранить'}
          </button>
          <button
            onClick={onCancel}
            disabled={saving}
            className="text-[12px] text-red-400 hover:text-red-300 transition disabled:opacity-50"
          >
            отмена
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-end">
      <div className="text-sm text-white/80">
        {label}: <span className="font-semibold text-white">{value}</span>
      </div>
      {editable && (
        <button 
          onClick={() => onEdit(field, value)}
          className="text-[12px] text-white/40 hover:text-white/70 transition"
        >
          изменить
        </button>
      )}
    </div>
  );
}
