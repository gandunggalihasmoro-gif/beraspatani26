'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function RegisterPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  async function handleRegister(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError('');
    setMessage('');

    if (password.length < 6) {
      setError('Password minimal 6 karakter.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Konfirmasi password tidak sama.');
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) {
        throw error;
      }

      if (data.session) {
        router.push('/akun');
        router.refresh();
        return;
      }

      setMessage(
        'Pendaftaran berhasil. Silakan cek email untuk konfirmasi akun.'
      );

      setFullName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      setError(err?.message || 'Pendaftaran gagal.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f8f7f2] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-lg p-8">

        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-bold text-xl">
            BP
          </div>

          <h1 className="text-2xl font-bold text-gray-900">
            Daftar Akun
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Buat akun BerasPatani26
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">

          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Nama Lengkap
            </label>

            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Masukkan nama lengkap"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:border-emerald-600"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Email
            </label>

            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nama@email.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:border-emerald-600"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Password
            </label>

            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimal 6 karakter"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:border-emerald-600"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Konfirmasi Password
            </label>

            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Ulangi password"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:border-emerald-600"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl p-3">
              {error}
            </div>
          )}

          {message && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm rounded-xl p-3">
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-semibold py-3 rounded-xl transition disabled:opacity-60"
          >
            {loading ? 'Mendaftarkan...' : 'Daftar'}
          </button>

        </form>

        <p className="text-center mt-6 text-sm text-gray-500">
          Sudah punya akun?{' '}
          <Link
            href="/login"
            className="text-emerald-700 font-semibold hover:underline"
          >
            Masuk
          </Link>
        </p>

        <Link
          href="/"
          className="block text-center mt-4 text-sm text-gray-500 hover:text-emerald-700"
        >
          ← Kembali ke Beranda
        </Link>

      </div>
    </main>
  );
}