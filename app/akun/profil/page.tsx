'use client';

import { FormEvent, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Loader2, Save } from 'lucide-react';
import { supabase } from '../../../lib/supabase';

export default function ProfilPage() {
  const router = useRouter();

  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    full_name: '',
    phone: '',
    address: '',
    city: '',
    postal_code: '',
  });

  useEffect(() => {
    async function loadProfile() {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        router.replace('/login');
        return;
      }

      setUserId(user.id);

      const { data, error: profileError } = await supabase
        .from('profiles')
        .select('full_name, phone, address, city, postal_code')
        .eq('id', user.id)
        .maybeSingle();

      if (profileError) {
        setError(profileError.message);
      }

      if (data) {
        setForm({
          full_name: data.full_name || '',
          phone: data.phone || '',
          address: data.address || '',
          city: data.city || '',
          postal_code: data.postal_code || '',
        });
      }

      setLoading(false);
    }

    loadProfile();
  }, [router]);

  function handleChange(
    field: keyof typeof form,
    value: string
  ) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  async function handleSave(
    e: FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setSaving(true);
    setMessage('');
    setError('');

    try {
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          full_name: form.full_name.trim(),
          phone: form.phone.trim() || null,
          address: form.address.trim() || null,
          city: form.city.trim() || null,
          postal_code: form.postal_code.trim() || null,
          updated_at: new Date().toISOString(),
        })
        .eq('id', userId);

      if (updateError) {
        throw updateError;
      }

      setMessage('Profil berhasil diperbarui.');
    } catch (err: any) {
      setError(
        err?.message ||
          'Profil gagal diperbarui.'
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#f6f4ed]">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-700" />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f6f4ed] px-4 py-10">
      <div className="mx-auto max-w-2xl">

        <Link
          href="/akun"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Dashboard
        </Link>

        <div className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm">

          <div className="mb-7">
            <p className="text-sm font-bold tracking-wider text-emerald-700">
              USER PANEL
            </p>

            <h1 className="mt-2 text-3xl font-bold text-gray-900">
              Profil Saya
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Lengkapi atau perbarui data profil Anda.
            </p>
          </div>

          <form
            onSubmit={handleSave}
            className="space-y-5"
          >

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Nama Lengkap
              </label>

              <input
                type="text"
                value={form.full_name}
                onChange={(e) =>
                  handleChange(
                    'full_name',
                    e.target.value
                  )
                }
                placeholder="Masukkan nama lengkap"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Nomor Telepon
              </label>

              <input
                type="text"
                value={form.phone}
                onChange={(e) =>
                  handleChange(
                    'phone',
                    e.target.value
                  )
                }
                placeholder="Contoh: 081234567890"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Kota / Kabupaten
              </label>

              <input
                type="text"
                value={form.city}
                onChange={(e) =>
                  handleChange(
                    'city',
                    e.target.value
                  )
                }
                placeholder="Contoh: Garut"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Kode Pos
              </label>

              <input
                type="text"
                value={form.postal_code}
                onChange={(e) =>
                  handleChange(
                    'postal_code',
                    e.target.value
                  )
                }
                placeholder="Masukkan kode pos"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Alamat Lengkap
              </label>

              <textarea
                rows={4}
                value={form.address}
                onChange={(e) =>
                  handleChange(
                    'address',
                    e.target.value
                  )
                }
                placeholder="Masukkan alamat lengkap"
                className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              />
            </div>

            {message && (
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">
                {message}
              </div>
            )}

            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 font-semibold text-white transition hover:bg-emerald-800 disabled:opacity-60"
            >
              {saving ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Save className="h-5 w-5" />
              )}

              {saving
                ? 'Menyimpan...'
                : 'Simpan Profil'}
            </button>

          </form>
        </div>
      </div>
    </main>
  );
}