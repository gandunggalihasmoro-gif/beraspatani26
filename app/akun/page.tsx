'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Home,
  Loader2,
  LogOut,
  ShoppingBag,
  User,
} from 'lucide-react';

import { supabase } from '@/lib/supabase';

type Profile = {
  id?: string;
  full_name?: string | null;
  phone?: string | null;
  role?: string | null;
  email?: string | null;
};

export default function AkunPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    async function loadUser() {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        router.replace('/login');
        return;
      }

      const { data } = await supabase
        .from('profiles')
        .select('id, full_name, phone, role')
        .eq('id', user.id)
        .maybeSingle();

      setProfile({
        ...(data || {}),
        email: user.email,
      });

      setLoading(false);
    }

    loadUser();
  }, [router]);

  async function handleLogout() {
    await supabase.auth.signOut();

    router.push('/');
    router.refresh();
  }

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#f6f4ed]">
        <Loader2 className="h-9 w-9 animate-spin text-emerald-700" />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f6f4ed]">
      <div className="max-w-6xl mx-auto px-4 py-10">

        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-bold tracking-wider text-emerald-700">
              USER PANEL
            </p>

            <h1 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900">
              Halo, {profile?.full_name || 'Pelanggan'}
            </h1>

            <p className="mt-2 text-gray-500">
              Kelola akun dan aktivitas Anda di BerasPatani26.
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-5 py-3 font-semibold text-red-600 transition hover:bg-red-50"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>

        <div className="grid gap-5 md:grid-cols-3">

          <Link
            href="/akun/profil"
            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100">
              <User className="h-6 w-6 text-emerald-700" />
            </div>

            <h2 className="text-xl font-bold text-gray-900">
              Profil Saya
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Kelola nama, nomor telepon dan data profil Anda.
            </p>
          </Link>

          <Link
            href="/akun/minat-pembelian"
            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100">
              <ShoppingBag className="h-6 w-6 text-amber-600" />
            </div>

            <h2 className="text-xl font-bold text-gray-900">
              Riwayat Minat Pembelian
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Lihat permintaan pembelian yang terhubung dengan akun Anda.
            </p>
          </Link>

          <Link
            href="/"
            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
              <Home className="h-6 w-6 text-blue-700" />
            </div>

            <h2 className="text-xl font-bold text-gray-900">
              Kembali ke Website
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Kembali melihat produk dan informasi BerasPatani26.
            </p>
          </Link>

        </div>

        <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900">
            Informasi Akun
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-2">

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                Nama
              </p>
              <p className="mt-1 font-medium text-gray-800">
                {profile?.full_name || '-'}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                Email
              </p>
              <p className="mt-1 font-medium text-gray-800">
                {profile?.email || '-'}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                Nomor Telepon
              </p>
              <p className="mt-1 font-medium text-gray-800">
                {profile?.phone || '-'}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                Role
              </p>
              <p className="mt-1 font-medium capitalize text-gray-800">
                {profile?.role || 'user'}
              </p>
            </div>

          </div>
        </div>

      </div>
    </main>
  );
}