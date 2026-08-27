'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import {
  ArrowLeft,
  Loader2,
  ShoppingBag,
  User,
  Mail,
  Phone,
  MapPin,
  Package,
  CalendarDays,
} from 'lucide-react';

import { supabase } from '../../../lib/supabase';

type PurchaseInterest = {
  id: string;

  name?: string | null;
  email?: string | null;
  phone?: string | null;
  company_name?: string | null;

  product_name?: string | null;

  quantity?: number | null;
  quantity_unit?: string | null;

  purchase_type?: string | null;

  city?: string | null;

  notes?: string | null;

  status?: string | null;

  created_at?: string | null;
};

export default function RiwayatMinatPembelianPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [items, setItems] = useState<PurchaseInterest[]>([]);

  const [error, setError] = useState('');

  useEffect(() => {
    async function loadHistory() {
      setLoading(true);
      setError('');

      try {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError || !user) {
          router.replace('/login');
          return;
        }

        const {
          data,
          error: queryError,
        } = await supabase
          .from('purchase_interests')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', {
            ascending: false,
          });

        if (queryError) {
          throw queryError;
        }

        setItems(data || []);
      } catch (err: any) {
        setError(
          err?.message ||
            'Gagal mengambil riwayat minat pembelian.'
        );
      } finally {
        setLoading(false);
      }
    }

    loadHistory();
  }, [router]);

  function formatDate(value?: string | null) {
    if (!value) {
      return '-';
    }

    try {
      return new Date(value).toLocaleString('id-ID', {
        dateStyle: 'medium',
        timeStyle: 'short',
      });
    } catch {
      return value;
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#f6f4ed]">
        <div className="text-center">

          <Loader2 className="mx-auto h-9 w-9 animate-spin text-emerald-700" />

          <p className="mt-4 text-sm text-gray-500">
            Memuat riwayat pembelian...
          </p>

        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f6f4ed] px-4 py-10">

      <div className="mx-auto max-w-5xl">

        <Link
          href="/akun"
          className="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />

          Kembali ke Dashboard
        </Link>

        <div className="mb-8">

          <p className="text-sm font-bold tracking-wider text-emerald-700">
            USER PANEL
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900 md:text-4xl">
            Riwayat Minat Pembelian
          </h1>

          <p className="mt-2 text-gray-500">
            Semua permintaan pembelian yang terhubung dengan akun Anda.
          </p>

        </div>

        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
            {error}
          </div>
        )}

        {!error && items.length === 0 && (
          <div className="rounded-3xl border border-gray-200 bg-white p-10 text-center shadow-sm">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100">

              <ShoppingBag className="h-8 w-8 text-emerald-700" />

            </div>

            <h2 className="mt-5 text-xl font-bold text-gray-900">
              Belum Ada Riwayat
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Anda belum memiliki permintaan pembelian yang terhubung dengan akun ini.
            </p>

            <Link
              href="/minat-pembelian"
              className="mt-6 inline-flex rounded-xl bg-emerald-700 px-5 py-3 font-semibold text-white transition hover:bg-emerald-800"
            >
              Isi Form Minat Pembelian
            </Link>

          </div>
        )}

        {!error && items.length > 0 && (
          <div className="space-y-6">

            {items.map((item) => (
              <article
                key={item.id}
                className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm"
              >

                <div className="p-6 md:p-7">

                  <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">

                    <div>

                      <div className="flex items-start gap-3">

                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100">

                          <Package className="h-5 w-5 text-emerald-700" />

                        </div>

                        <div>

                          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                            Produk
                          </p>

                          <h2 className="mt-1 text-xl font-bold text-gray-900">
                            {item.product_name ||
                              'Produk BerasPatani26'}
                          </h2>

                        </div>

                      </div>

                    </div>

                    <span className="w-fit rounded-full bg-emerald-100 px-4 py-1.5 text-xs font-bold capitalize text-emerald-700">
                      {item.status || 'baru'}
                    </span>

                  </div>

                  <div className="mt-7 grid gap-4 md:grid-cols-2">

                    <div className="rounded-2xl bg-gray-50 p-4">

                      <div className="flex items-center gap-2 text-gray-400">

                        <User className="h-4 w-4" />

                        <p className="text-xs font-semibold uppercase">
                          Nama Pembeli
                        </p>

                      </div>

                      <p className="mt-2 font-semibold text-gray-900">
                        {item.name || '-'}
                      </p>

                    </div>

                    <div className="rounded-2xl bg-gray-50 p-4">

                      <div className="flex items-center gap-2 text-gray-400">

                        <Mail className="h-4 w-4" />

                        <p className="text-xs font-semibold uppercase">
                          Email
                        </p>

                      </div>

                      <p className="mt-2 break-all font-medium text-gray-800">
                        {item.email || '-'}
                      </p>

                    </div>

                    <div className="rounded-2xl bg-gray-50 p-4">

                      <div className="flex items-center gap-2 text-gray-400">

                        <Phone className="h-4 w-4" />

                        <p className="text-xs font-semibold uppercase">
                          Telepon
                        </p>

                      </div>

                      <p className="mt-2 font-medium text-gray-800">
                        {item.phone || '-'}
                      </p>

                    </div>

                    <div className="rounded-2xl bg-gray-50 p-4">

                      <div className="flex items-center gap-2 text-gray-400">

                        <MapPin className="h-4 w-4" />

                        <p className="text-xs font-semibold uppercase">
                          Tujuan Pengiriman
                        </p>

                      </div>

                      <p className="mt-2 font-medium text-gray-800">
                        {item.city || '-'}
                      </p>

                    </div>

                  </div>

                  {item.company_name && (
                    <div className="mt-4 rounded-2xl border border-gray-100 p-4">

                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                        Perusahaan / Usaha
                      </p>

                      <p className="mt-1 font-medium text-gray-800">
                        {item.company_name}
                      </p>

                    </div>
                  )}

                  <div className="mt-6 grid gap-4 sm:grid-cols-3">

                    <div className="rounded-2xl border border-gray-100 p-4">

                      <p className="text-xs font-semibold uppercase text-gray-400">
                        Jumlah
                      </p>

                      <p className="mt-2 text-lg font-bold text-gray-900">
                        {item.quantity ?? '-'}{' '}
                        {item.quantity_unit || ''}
                      </p>

                    </div>

                    <div className="rounded-2xl border border-gray-100 p-4">

                      <p className="text-xs font-semibold uppercase text-gray-400">
                        Jenis Pembelian
                      </p>

                      <p className="mt-2 font-bold text-gray-900">
                        {item.purchase_type || '-'}
                      </p>

                    </div>

                    <div className="rounded-2xl border border-gray-100 p-4">

                      <div className="flex items-center gap-2">

                        <CalendarDays className="h-4 w-4 text-gray-400" />

                        <p className="text-xs font-semibold uppercase text-gray-400">
                          Tanggal
                        </p>

                      </div>

                      <p className="mt-2 text-sm font-medium text-gray-800">
                        {formatDate(item.created_at)}
                      </p>

                    </div>

                  </div>

                  {item.notes && (
                    <div className="mt-6 rounded-2xl bg-[#f8f8f6] p-5">

                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                        Catatan
                      </p>

                      <p className="mt-2 whitespace-pre-line text-sm leading-6 text-gray-700">
                        {item.notes}
                      </p>

                    </div>
                  )}

                </div>

              </article>
            ))}

          </div>
        )}

        {items.length > 0 && (
          <div className="mt-8 text-center">

            <Link
              href="/minat-pembelian"
              className="inline-flex rounded-xl bg-emerald-700 px-6 py-3 font-semibold text-white transition hover:bg-emerald-800"
            >
              Buat Minat Pembelian Baru
            </Link>

          </div>
        )}

      </div>

    </main>
  );
}