'use client';

import { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
} from 'lucide-react';

const contactInfo = [
  {
    title: 'Alamat',
    value:
      'Kp. Cikeris Rt. 001 Rw. 016 Ds. Simpen Kidul Kec. BL. Limbangan Kab. Garut, Jawa Barat',
    icon: MapPin,
  },
  {
    title: 'Telepon',
    value: '081572316412',
    icon: Phone,
  },
  {
    title: 'Email',
    value: 'Beraspatani26@gmail.com',
    icon: Mail,
  },
  {
    title: 'Jam Operasional',
    value: '07.00–20.00',
    icon: Clock,
  },
];

export default function KontakPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  function handleChange(
    field: keyof typeof form,
    value: string
  ) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    alert(
      'Pesan berhasil disiapkan. Integrasi pengiriman dapat ditambahkan berikutnya.'
    );
  }

  return (
    <main className="min-h-screen bg-[#f8f7f2] px-4 py-12">
      <div className="mx-auto max-w-6xl">

        <div className="mb-10 text-center">
          <p className="text-sm font-bold tracking-wider text-emerald-700">
            HUBUNGI KAMI
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900 md:text-4xl">
            Kontak BerasPatani26
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-gray-500">
            Hubungi kami untuk informasi produk, pemesanan,
            kemitraan, atau kebutuhan lainnya.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">

          {/* INFORMASI KONTAK */}
          <div className="space-y-4">

            {contactInfo.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-100">
                    <Icon className="h-6 w-6 text-emerald-700" />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-emerald-700">
                      {item.title}
                    </p>

                    <p className="mt-1 leading-6 text-gray-900">
                      {item.value}
                    </p>
                  </div>
                </div>
              );
            })}

            <div className="rounded-2xl border border-gray-200 bg-emerald-900 p-6 text-white">
              <h2 className="text-xl font-bold">
                BerasPatani26
              </h2>

              <p className="mt-2 text-sm leading-6 text-emerald-100">
                Gabah • Beras • Hasil Panen
              </p>

              <p className="mt-5 text-sm leading-6 text-emerald-50">
                Kami melayani kebutuhan pembelian gabah dan beras
                untuk pelanggan pribadi, toko, usaha, restoran,
                grosir, maupun distributor.
              </p>
            </div>

          </div>

          {/* FORM KONTAK */}
          <div className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm">

            <h2 className="text-2xl font-bold text-gray-900">
              Kirim Pesan
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Isi formulir berikut dan sampaikan kebutuhan Anda.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-7 space-y-5"
            >
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Nama Lengkap *
                </label>

                <input
                  required
                  type="text"
                  value={form.name}
                  onChange={(e) =>
                    handleChange('name', e.target.value)
                  }
                  placeholder="Nama Anda"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              <div className="grid gap-5 md:grid-cols-2">

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Email *
                  </label>

                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      handleChange('email', e.target.value)
                    }
                    placeholder="email@anda.com"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    No. Telepon *
                  </label>

                  <input
                    required
                    type="tel"
                    value={form.phone}
                    onChange={(e) =>
                      handleChange('phone', e.target.value)
                    }
                    placeholder="08xxxxxxxxxx"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                  />
                </div>

              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Subjek *
                </label>

                <input
                  required
                  type="text"
                  value={form.subject}
                  onChange={(e) =>
                    handleChange('subject', e.target.value)
                  }
                  placeholder="Topik pesan Anda"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Pesan *
                </label>

                <textarea
                  required
                  rows={6}
                  value={form.message}
                  onChange={(e) =>
                    handleChange('message', e.target.value)
                  }
                  placeholder="Tulis pesan Anda..."
                  className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 font-semibold text-white transition hover:bg-emerald-800"
              >
                <Send className="h-5 w-5" />
                Kirim Pesan
              </button>

            </form>
          </div>

        </div>
      </div>
    </main>
  );
}