'use client';

import { FormEvent, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Loader2, LogIn } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function checkSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        router.replace('/akun');
        return;
      }

      setChecking(false);
    }

    checkSession();
  }, [router]);

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError('');
    setLoading(true);

    try {
      const { error: loginError } =
        await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

      if (loginError) {
        throw loginError;
      }

      router.push('/akun');
      router.refresh();
    } catch (err: any) {
      setError(
        err?.message || 'Email atau password salah.'
      );
    } finally {
      setLoading(false);
    }
  }

  if (checking) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-700" />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f6f4ed] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl border border-gray-200 shadow-xl p-8">

          <div className="text-center mb-8">
            <div className="mx-auto mb-4 h-14 w-14 rounded-2xl bg-emerald-700 flex items-center justify-center">
              <LogIn className="h-7 w-7 text-white" />
            </div>

            <h1 className="text-3xl font-bold text-gray-900">
              Masuk
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Masuk ke akun BerasPatani26 Anda.
            </p>
          </div>

          <form
            onSubmit={handleLogin}
            className="space-y-5"
          >
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Email
              </label>

              <input
                type="email"
                required
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="nama@email.com"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Password
              </label>

              <div className="relative">
                <input
                  type={
                    showPassword
                      ? 'text'
                      : 'password'
                  }
                  required
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  placeholder="Masukkan password"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 pr-12 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((prev) => !prev)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 font-semibold text-white hover:bg-emerald-800 disabled:opacity-60"
            >
              {loading && (
                <Loader2 className="h-5 w-5 animate-spin" />
              )}

              {loading
                ? 'Memproses...'
                : 'Masuk'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Belum punya akun?{' '}
            <Link
              href="/register"
              className="font-semibold text-emerald-700 hover:underline"
            >
              Daftar
            </Link>
          </p>

          <Link
            href="/"
            className="mt-4 block text-center text-sm text-gray-500 hover:text-emerald-700"
          >
            ← Kembali ke Beranda
          </Link>

        </div>
      </div>
    </main>
  );
}