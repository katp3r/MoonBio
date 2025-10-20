"use client";

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/auth/log');
    router.refresh();
  };

  return (
    <button
      onClick={handleLogout}
      className="w-full text-center text-sm text-white/60 hover:text-white/80 transition-colors bg-red-600/20 border border-red-500/20 rounded-md px-3 py-2"
    >
      Выйти
    </button>
  );
}
