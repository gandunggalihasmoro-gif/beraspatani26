'use client';

import Link from 'next/link';
import { Users, Sprout, TrendingUp, DollarSign, ArrowRight, CheckCircle2, Handshake } from 'lucide-react';
import SiteLayout from '@/components/site/SiteLayout';
import { SectionHeading } from '@/components/site/SectionHeading';
import { partners } from '@/lib/data';
import { useFormSubmit } from '@/hooks/use-form-submit';

const benefits = [
  { icon: DollarSign, title: 'Harga Jaminan', desc: 'Harga pembelian yang adil dan stabil, tidak terpengaruh fluktuasi spekulatif pasar.' },
  { icon: Sprout, title: 'Pendampingan Teknis', desc: 'Penyuluhan pertanian, bibit unggul, dan praktik budidaya modern dari ahli.' },
  { icon: TrendingUp, title: 'Akses Pasar', desc: 'Petani tidak perlu khawatir memasarkan hasil panen — kami yang menyalurkannya.' },
  { icon: Handshake, title: 'Akses Modal', desc: 'Bantuan modal usaha tani dengan skema ringan dan transparan.' },
];

const partnerTypes = [
  { title: 'Petani', desc: 'Petani pemilik atau penggarap sawah yang ingin menjual hasil panen dengan harga jaminan.', icon: Sprout },
  { title: 'Distributor', desc: 'Distributor sembako yang ingin memasarkan beras BerasPatani26 di wilayahnya.', icon: TrendingUp },
  { title: 'Pengepul', desc: 'Pengepul gabah yang ingin menjadi supplier atau mitra pengadaan.', icon: Users },
  { title: 'Toko/Reseller', desc: 'Toko sembako atau reseller yang ingin menjual produk kami secara eceran.', icon: Handshake },
];

export default function KemitraanPage() {
  const { status, message, submit } = useFormSubmit();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    submit(data);
  };

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-hero-gradient text-white py-24">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.pexels.com/photos/35782264/pexels-photo-35782264.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
            alt="Petani"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/20 text-sm font-medium mb-4">
            Program Kemitraan
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-balance">
            Bertumbuh Bersama Petani & Mitra
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
            Bergabunglah dengan ekosistem pertanian BerasPatani26. Kemitraan yang
            saling menguntungkan untuk pertanian Indonesia yang lebih baik.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading center eyebrow="Keuntungan Mitra" title="Apa yang Anda Dapatkan" />
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="rounded-2xl border border-border bg-card p-6 space-y-3 hover:shadow-lg transition-shadow">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <benefit.icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-lg">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Types */}
      <section className="py-20 bg-section-gradient">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading center eyebrow="Jenis Mitra" title="Pilih Peran Anda" description="Kami terbuka untuk berbagai jenis kemitraan." />
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {partnerTypes.map((type) => (
              <div key={type.title} className="rounded-2xl bg-card border border-border p-6 text-center space-y-3 hover:border-primary/30 transition-colors">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/20 text-accent-foreground mx-auto">
                  <type.icon className="h-7 w-7" />
                </div>
                <h3 className="font-semibold text-lg">{type.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{type.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Current Partners */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading center eyebrow="Jaringan Mitra" title="Mitra Aktif Kami" />
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {partners.filter(p => p.status === 'aktif').map((partner) => (
              <div key={partner.id} className="flex items-center gap-4 rounded-xl border border-border bg-card p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
                  <Users className="h-6 w-6" />
                </div>
                <div className="min-w-0">
                  <p className="font-medium truncate">{partner.name}</p>
                  <p className="text-sm text-muted-foreground">{partner.type} • {partner.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Form */}
      <section className="py-20 bg-section-gradient">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            center
            eyebrow="Daftar Kemitraan"
            title="Isi Formulir Pendaftaran"
            description="Tim kami akan menghubungi Anda dalam 2x24 jam untuk diskusi lebih lanjut."
          />

          {status === 'success' ? (
            <div className="mt-8 rounded-2xl bg-card border border-green-200 bg-green-50 p-8 text-center space-y-4 animate-scale-in">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mx-auto">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-green-800">Pendaftaran Berhasil!</h3>
              <p className="text-green-700">{message}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition-colors"
              >
                Daftar lagi
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 space-y-5 rounded-2xl bg-card border border-border p-6 sm:p-8">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Nama Lengkap *</label>
                  <input
                    required
                    name="name"
                    type="text"
                    placeholder="Nama Anda"
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Nama Organisasi/Usaha</label>
                  <input
                    name="organization"
                    type="text"
                    placeholder="Nama kelompok tani / CV / PT"
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium">Jenis Kemitraan *</label>
                <select
                  required
                  name="type"
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  <option value="">Pilih jenis mitra</option>
                  <option value="petani">Petani</option>
                  <option value="distributor">Distributor</option>
                  <option value="pengepul">Pengepul</option>
                  <option value="toko">Toko/Reseller</option>
                  <option value="lainnya">Lainnya</option>
                </select>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">No. Telepon *</label>
                  <input
                    required
                    name="phone"
                    type="tel"
                    placeholder="08xxxxxxxxxx"
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Email *</label>
                  <input
                    required
                    name="email"
                    type="email"
                    placeholder="email@anda.com"
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Wilayah/Daerah *</label>
                  <input
                    required
                    name="region"
                    type="text"
                    placeholder="Kota/Kabupaten, Provinsi"
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Luas Lahan (untuk petani)</label>
                  <input
                    name="landArea"
                    type="text"
                    placeholder="contoh: 5 hektar"
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium">Pesan/Tambahan</label>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Ceritakan tentang usaha/kebutuhan Anda..."
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                />
              </div>

              {status === 'error' && (
                <div className="rounded-lg bg-destructive/10 border border-destructive/20 px-4 py-3 text-sm text-destructive">
                  {message}
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'submitting' ? (
                  <>
                    <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Mengirim...
                  </>
                ) : (
                  <>
                    Kirim Pendaftaran <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
              <p className="text-xs text-center text-muted-foreground">
                * Data dikirim secara simulasi (belum tersimpan ke database)
              </p>
            </form>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}
